begin;

alter table public.story_builder_student_supports
  add column show_image_labels boolean not null default false;

alter table public.story_builder_student_supports
  alter column target_key drop not null;

alter table public.story_builder_student_supports
  drop constraint story_builder_student_supports_target_key_check,
  drop constraint story_builder_student_supports_keys_check;

alter table public.story_builder_student_supports
  add constraint story_builder_student_supports_target_key_check
    check (
      (target_key is null and cardinality(support_keys) = 0)
      or target_key in ('story_organization', 'connections_cohesion', 'cause_effect', 'sentence_formulation', 'elaboration', 'perspective_internal_state', 'vocabulary_precision')
    ),
  add constraint story_builder_student_supports_nonempty_check
    check (target_key is not null or show_image_labels = true),
  add constraint story_builder_student_supports_keys_check
    check (
      (target_key is null and cardinality(support_keys) = 0)
      or (
        case target_key
          when 'story_organization' then support_keys <@ array['story_reminder', 'question_prompt', 'sentence_starter']::text[]
          when 'connections_cohesion' then support_keys <@ array['connective_words', 'question_prompt', 'sentence_starter']::text[]
          when 'cause_effect' then support_keys <@ array['connective_words', 'question_prompt', 'sentence_starter']::text[]
          when 'sentence_formulation' then support_keys <@ array['story_reminder', 'question_prompt', 'sentence_starter']::text[]
          when 'elaboration' then support_keys <@ array['story_reminder', 'question_prompt', 'sentence_starter']::text[]
          when 'perspective_internal_state' then support_keys <@ array['useful_words', 'question_prompt', 'sentence_starter']::text[]
          when 'vocabulary_precision' then support_keys <@ array['useful_words', 'question_prompt', 'sentence_starter']::text[]
          else false
        end
        and pg_catalog.array_position(support_keys, null) is null
        and coalesce(pg_catalog.cardinality(pg_catalog.array_positions(support_keys, 'question_prompt')), 0) <= 1
        and coalesce(pg_catalog.cardinality(pg_catalog.array_positions(support_keys, 'sentence_starter')), 0) <= 1
        and coalesce(pg_catalog.cardinality(pg_catalog.array_positions(support_keys, 'connective_words')), 0) <= 1
        and coalesce(pg_catalog.cardinality(pg_catalog.array_positions(support_keys, 'story_reminder')), 0) <= 1
        and coalesce(pg_catalog.cardinality(pg_catalog.array_positions(support_keys, 'useful_words')), 0) <= 1
      )
    );

create index story_builder_student_supports_student_owner_idx
  on public.story_builder_student_supports (student_id, owner_user_id);

drop function public.set_story_builder_student_supports(uuid, text, text[]);
drop function public.get_story_builder_student_supports_for_educator(uuid);
drop function public.get_story_builder_student_supports();

create function public.set_story_builder_student_supports(
  p_student_id uuid,
  p_target_key text,
  p_support_keys text[],
  p_show_image_labels boolean default false
)
returns table (target_key text, support_keys text[], show_image_labels boolean)
language plpgsql security definer set search_path = ''
as $$
declare
  v_owner_user_id uuid := (select auth.uid());
  v_is_anonymous boolean := coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false);
begin
  if v_owner_user_id is null or v_is_anonymous then
    raise exception 'not authorized';
  end if;
  if p_student_id is null
     or p_target_key is not null and p_target_key not in ('story_organization', 'connections_cohesion', 'cause_effect', 'sentence_formulation', 'elaboration', 'perspective_internal_state', 'vocabulary_precision')
     or p_support_keys is null
     or p_target_key is null and cardinality(p_support_keys) <> 0
     or p_target_key is not null and (
       case p_target_key
         when 'story_organization' then p_support_keys <@ array['story_reminder', 'question_prompt', 'sentence_starter']::text[]
         when 'connections_cohesion' then p_support_keys <@ array['connective_words', 'question_prompt', 'sentence_starter']::text[]
         when 'cause_effect' then p_support_keys <@ array['connective_words', 'question_prompt', 'sentence_starter']::text[]
         when 'sentence_formulation' then p_support_keys <@ array['story_reminder', 'question_prompt', 'sentence_starter']::text[]
         when 'elaboration' then p_support_keys <@ array['story_reminder', 'question_prompt', 'sentence_starter']::text[]
         when 'perspective_internal_state' then p_support_keys <@ array['useful_words', 'question_prompt', 'sentence_starter']::text[]
         when 'vocabulary_precision' then p_support_keys <@ array['useful_words', 'question_prompt', 'sentence_starter']::text[]
         else false
       end
     ) is not true
     or pg_catalog.array_position(p_support_keys, null) is not null then
    raise exception 'invalid support package';
  end if;
  if pg_catalog.cardinality(p_support_keys) <> (
    select count(distinct support_key) from pg_catalog.unnest(p_support_keys) as support_key
  ) then
    raise exception 'duplicate support key';
  end if;
  if not exists (select 1 from public.students as s where s.id = p_student_id and s.owner_user_id = v_owner_user_id and s.archived_at is null) then
    raise exception 'student not found';
  end if;
  if not exists (select 1 from public.product_entitlements as pe where pe.owner_user_id = v_owner_user_id and pe.product_key = 'first-volo-story-builder' and pe.status = 'active' and pe.starts_at is not null and pe.expires_at is not null and pe.starts_at <= pg_catalog.now() and pe.expires_at > pg_catalog.now()) then
    raise exception 'product access not active';
  end if;

  delete from public.story_builder_student_supports as ss where ss.student_id = p_student_id and ss.owner_user_id = v_owner_user_id;
  if cardinality(p_support_keys) > 0 or coalesce(p_show_image_labels, false) then
    insert into public.story_builder_student_supports (student_id, owner_user_id, target_key, support_keys, show_image_labels, updated_at)
    values (p_student_id, v_owner_user_id, p_target_key, p_support_keys, coalesce(p_show_image_labels, false), pg_catalog.now());
  end if;

  return query select ss.target_key, ss.support_keys, ss.show_image_labels from public.story_builder_student_supports as ss where ss.student_id = p_student_id and ss.owner_user_id = v_owner_user_id;
end;
$$;

create function public.get_story_builder_student_supports_for_educator(p_student_id uuid)
returns table (target_key text, support_keys text[], show_image_labels boolean)
language plpgsql security definer set search_path = ''
as $$
declare
  v_owner_user_id uuid := (select auth.uid());
  v_is_anonymous boolean := coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false);
begin
  if v_owner_user_id is null or v_is_anonymous then raise exception 'not authorized'; end if;
  if not exists (select 1 from public.students as s where s.id = p_student_id and s.owner_user_id = v_owner_user_id and s.archived_at is null) then raise exception 'student not found'; end if;
  return query select ss.target_key, ss.support_keys, ss.show_image_labels from public.story_builder_student_supports as ss where ss.student_id = p_student_id and ss.owner_user_id = v_owner_user_id;
end;
$$;

create function public.get_story_builder_student_supports()
returns table (target_key text, support_keys text[], show_image_labels boolean)
language plpgsql security definer set search_path = ''
as $$
begin
  if (select auth.uid()) is null or not coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) then raise exception 'not authorized'; end if;
  return query
    select ss.target_key, ss.support_keys, ss.show_image_labels
    from public.student_auth_links as sal
    join public.students as s on s.id = sal.student_id and s.owner_user_id = sal.owner_user_id and s.archived_at is null
    join public.classes as c on c.id = sal.class_id and c.owner_user_id = sal.owner_user_id and c.archived_at is null
    join public.class_memberships as cm on cm.class_id = sal.class_id and cm.student_id = sal.student_id and cm.owner_user_id = sal.owner_user_id
    join public.class_product_access as cpa on cpa.class_id = sal.class_id and cpa.owner_user_id = sal.owner_user_id and cpa.product_key = 'first-volo-story-builder'
    join public.product_entitlements as pe on pe.owner_user_id = sal.owner_user_id and pe.product_key = 'first-volo-story-builder' and pe.status = 'active' and pe.starts_at is not null and pe.expires_at is not null and pe.starts_at <= pg_catalog.now() and pe.expires_at > pg_catalog.now()
    join public.story_builder_student_supports as ss on ss.student_id = sal.student_id and ss.owner_user_id = sal.owner_user_id
    where sal.auth_user_id = (select auth.uid()) and sal.revoked_at is null and sal.class_id is not null;
end;
$$;

revoke all on function public.set_story_builder_student_supports(uuid, text, text[], boolean) from public, anon;
revoke all on function public.get_story_builder_student_supports_for_educator(uuid) from public, anon;
revoke all on function public.get_story_builder_student_supports() from public, anon;
grant execute on function public.set_story_builder_student_supports(uuid, text, text[], boolean) to authenticated;
grant execute on function public.get_story_builder_student_supports_for_educator(uuid) to authenticated;
grant execute on function public.get_story_builder_student_supports() to authenticated;

commit;
