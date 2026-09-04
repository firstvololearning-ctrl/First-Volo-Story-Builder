-- Secure cloud drafts for authenticated Story Builder students.
begin;

create table public.story_builder_student_drafts (
  student_id uuid primary key,
  owner_user_id uuid not null,
  draft jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint story_builder_student_drafts_student_owner_fkey
    foreign key (student_id, owner_user_id)
    references public.students(id, owner_user_id) on delete cascade,
  constraint story_builder_student_drafts_object_check
    check (jsonb_typeof(draft) = 'object'),
  constraint story_builder_student_drafts_size_check
    check (octet_length(draft::text) <= 50000)
);

alter table public.story_builder_student_drafts enable row level security;
alter table public.story_builder_student_drafts force row level security;
revoke all on table public.story_builder_student_drafts from public, anon, authenticated;
grant all on table public.story_builder_student_drafts to service_role;

create or replace function private.story_builder_valid_student_draft(p_draft jsonb)
returns boolean
language plpgsql immutable
set search_path = ''
as $$
declare
  v_key text;
begin
  if jsonb_typeof(p_draft) <> 'object' or octet_length(p_draft::text) > 50000 then return false; end if;
  if exists (
    select 1 from jsonb_object_keys(p_draft) key
    where key not in ('version','selections','planner','title','story','checked')
  ) then return false; end if;
  if coalesce(p_draft ->> 'version','1') <> '1' then return false; end if;
  if p_draft ? 'title' and (jsonb_typeof(p_draft -> 'title') <> 'string' or char_length(p_draft ->> 'title') > 100) then return false; end if;
  if p_draft ? 'story' and (jsonb_typeof(p_draft -> 'story') <> 'string' or char_length(p_draft ->> 'story') > 16000) then return false; end if;
  if p_draft ? 'checked' and jsonb_typeof(p_draft -> 'checked') <> 'boolean' then return false; end if;
  if p_draft ? 'selections' and jsonb_typeof(p_draft -> 'selections') <> 'object' then return false; end if;
  if p_draft ? 'planner' and jsonb_typeof(p_draft -> 'planner') <> 'object' then return false; end if;
  if p_draft ? 'planner' then
    for v_key in select key from jsonb_object_keys(p_draft -> 'planner') key loop
      if v_key not in ('character','setting','problem','feeling','plan','attempt','resolution')
         or jsonb_typeof(p_draft -> 'planner' -> v_key) <> 'string'
         or char_length(p_draft -> 'planner' ->> v_key) > 2000 then return false; end if;
    end loop;
  end if;
  return true;
exception when others then
  return false;
end;
$$;

create or replace function public.get_my_story_builder_student_draft()
returns table (draft jsonb, updated_at timestamptz)
language plpgsql stable security definer
set search_path = ''
as $$
declare v_identity record;
begin
  if not private.story_builder_is_anonymous() then
    raise exception using errcode='42501', message='story_builder_student_required';
  end if;
  select * into v_identity from private.story_builder_resolve_student(null, true);
  if not found then raise exception using errcode='42501', message='story_builder_not_authorized'; end if;
  return query select d.draft, d.updated_at
    from public.story_builder_student_drafts d
    where d.student_id=v_identity.student_id and d.owner_user_id=v_identity.owner_user_id;
end;
$$;

create or replace function public.save_my_story_builder_student_draft(p_draft jsonb)
returns table (draft jsonb, updated_at timestamptz)
language plpgsql volatile security definer
set search_path = ''
as $$
declare v_identity record;
begin
  if not private.story_builder_is_anonymous() then
    raise exception using errcode='42501', message='story_builder_student_required';
  end if;
  if not private.story_builder_valid_student_draft(p_draft) then
    raise exception using errcode='22023', message='story_builder_invalid_draft';
  end if;
  select * into v_identity from private.story_builder_resolve_student(null, true);
  if not found then raise exception using errcode='42501', message='story_builder_not_authorized'; end if;
  insert into public.story_builder_student_drafts(student_id,owner_user_id,draft)
  values(v_identity.student_id,v_identity.owner_user_id,p_draft)
  on conflict(student_id) do update set draft=excluded.draft,updated_at=now()
  where public.story_builder_student_drafts.owner_user_id=excluded.owner_user_id;
  return query select d.draft,d.updated_at from public.story_builder_student_drafts d
    where d.student_id=v_identity.student_id and d.owner_user_id=v_identity.owner_user_id;
end;
$$;

create or replace function public.get_story_builder_student_draft_for_educator(p_student_id uuid)
returns table (draft jsonb, updated_at timestamptz)
language plpgsql stable security definer
set search_path = ''
as $$
declare v_identity record;
begin
  if private.story_builder_is_anonymous() then
    raise exception using errcode='42501', message='story_builder_educator_required';
  end if;
  select * into v_identity from private.story_builder_resolve_student(p_student_id, false);
  if not found or v_identity.owner_user_id <> (select auth.uid()) then
    raise exception using errcode='42501', message='story_builder_not_authorized';
  end if;
  return query select d.draft,d.updated_at from public.story_builder_student_drafts d
    where d.student_id=v_identity.student_id and d.owner_user_id=v_identity.owner_user_id;
end;
$$;

revoke all on function private.story_builder_valid_student_draft(jsonb) from public,anon,authenticated;
grant execute on function private.story_builder_valid_student_draft(jsonb) to service_role;
revoke all on function public.get_my_story_builder_student_draft(), public.save_my_story_builder_student_draft(jsonb), public.get_story_builder_student_draft_for_educator(uuid) from public,anon,service_role;
grant execute on function public.get_my_story_builder_student_draft(), public.save_my_story_builder_student_draft(jsonb), public.get_story_builder_student_draft_for_educator(uuid) to authenticated;

commit;
