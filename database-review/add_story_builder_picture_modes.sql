begin;
alter table public.story_builder_student_supports add column picture_idea_mode text not null default 'both' check (picture_idea_mode in ('own','pictures','both'));
alter table public.story_builder_student_supports drop constraint story_builder_student_supports_nonempty_check;
alter table public.story_builder_student_supports add constraint story_builder_student_supports_nonempty_check check (target_key is not null or show_image_labels or picture_idea_mode <> 'both');
CREATE OR REPLACE FUNCTION public.get_story_builder_student_supports_v2()
 RETURNS TABLE(target_key text, support_keys text[], show_image_labels boolean, picture_idea_mode text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if (select auth.uid()) is null or not coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) then raise exception 'not authorized'; end if;
  return query
    select ss.target_key, ss.support_keys, ss.show_image_labels, ss.picture_idea_mode
    from public.student_auth_links as sal
    join public.students as s on s.id = sal.student_id and s.owner_user_id = sal.owner_user_id and s.archived_at is null
    join public.classes as c on c.id = sal.class_id and c.owner_user_id = sal.owner_user_id and c.archived_at is null
    join public.class_memberships as cm on cm.class_id = sal.class_id and cm.student_id = sal.student_id and cm.owner_user_id = sal.owner_user_id
    join public.class_product_access as cpa on cpa.class_id = sal.class_id and cpa.owner_user_id = sal.owner_user_id and cpa.product_key = 'first-volo-story-builder'
    join public.product_entitlements as pe on pe.owner_user_id = sal.owner_user_id and pe.product_key = 'first-volo-story-builder' and pe.status = 'active' and pe.starts_at is not null and pe.expires_at is not null and pe.starts_at <= pg_catalog.now() and pe.expires_at > pg_catalog.now()
    join public.story_builder_student_supports as ss on ss.student_id = sal.student_id and ss.owner_user_id = sal.owner_user_id
    where sal.auth_user_id = (select auth.uid()) and sal.revoked_at is null and private.parent_permission_allows(sal.owner_user_id,sal.student_id,'first-volo-story-builder') and sal.class_id is not null;
end;
$function$
;
revoke all on function public.get_story_builder_student_supports_v2() from public, anon;
grant execute on function public.get_story_builder_student_supports_v2() to authenticated;
CREATE OR REPLACE FUNCTION public.get_story_builder_student_supports_for_educator_v2(p_student_id uuid)
 RETURNS TABLE(target_key text, support_keys text[], show_image_labels boolean, picture_idea_mode text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_owner_user_id uuid := (select auth.uid());
  v_is_anonymous boolean := coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false);
begin
  if v_owner_user_id is null or v_is_anonymous then raise exception 'not authorized'; end if;
  if not exists (select 1 from public.students as s where s.id = p_student_id and s.owner_user_id = v_owner_user_id and s.archived_at is null) then raise exception 'student not found'; end if;
  return query select ss.target_key, ss.support_keys, ss.show_image_labels, ss.picture_idea_mode from public.story_builder_student_supports as ss where ss.student_id = p_student_id and ss.owner_user_id = v_owner_user_id;
end;
$function$
;
revoke all on function public.get_story_builder_student_supports_for_educator_v2(uuid) from public, anon;
grant execute on function public.get_story_builder_student_supports_for_educator_v2(uuid) to authenticated;
CREATE OR REPLACE FUNCTION public.set_story_builder_student_supports_v2(p_student_id uuid, p_target_key text, p_support_keys text[], p_show_image_labels boolean DEFAULT false, p_picture_idea_mode text DEFAULT 'both')
 RETURNS TABLE(target_key text, support_keys text[], show_image_labels boolean, picture_idea_mode text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_owner_user_id uuid := (select auth.uid());
  v_is_anonymous boolean := coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false);
begin
  if v_owner_user_id is null or v_is_anonymous then
    raise exception 'not authorized';
  end if;
  if p_picture_idea_mode is null or p_picture_idea_mode not in ('own','pictures','both') then raise exception 'invalid picture mode'; end if;
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
  if p_target_key is not null or cardinality(p_support_keys) > 0 or coalesce(p_show_image_labels, false) or p_picture_idea_mode <> 'both' then
    insert into public.story_builder_student_supports (student_id, owner_user_id, target_key, support_keys, show_image_labels, picture_idea_mode, updated_at)
    values (p_student_id, v_owner_user_id, p_target_key, p_support_keys, coalesce(p_show_image_labels, false) and p_picture_idea_mode <> 'own', p_picture_idea_mode, pg_catalog.now());
  end if;

  return query select ss.target_key, ss.support_keys, ss.show_image_labels, ss.picture_idea_mode from public.story_builder_student_supports as ss where ss.student_id = p_student_id and ss.owner_user_id = v_owner_user_id;
end;
$function$
;
revoke all on function public.set_story_builder_student_supports_v2(uuid,text,text[],boolean,text) from public, anon;
grant execute on function public.set_story_builder_student_supports_v2(uuid,text,text[],boolean,text) to authenticated;
notify pgrst, 'reload schema';
commit;
