-- Production migration: Story Builder shared-student instructional cycles, schema version 1.
-- Story Builder shared-student instructional cycles, schema version 1.
-- Historical terminal cycles are retained. Automatic pruning/expiry is deliberately
-- absent; formal retention and deletion remain future product decisions.

begin;

create schema if not exists private;

create or replace function private.story_builder_valid_prompt_provenance(p_value jsonb)
returns boolean
language plpgsql immutable
set search_path = ''
as $$
declare
  v_key text;
  v_selection jsonb;
begin
  if p_value = '{}'::jsonb then return true; end if;
  if jsonb_typeof(p_value) <> 'object' or octet_length(p_value::text) > 8192 then return false; end if;
  if exists (select 1 from jsonb_object_keys(p_value) k where k not in ('version','source','selections')) then return false; end if;
  if not (p_value ?& array['version','source','selections']) then return false; end if;
  if p_value ->> 'version' <> '1'
     or p_value ->> 'source' not in ('story_builder_visual_cards','student_generated','educator_provided','mixed','unspecified')
     or jsonb_typeof(p_value -> 'selections') <> 'object' then return false; end if;
  for v_key, v_selection in select key, value from jsonb_each(p_value -> 'selections') loop
    if v_key not in ('character','setting','problem','feeling','plan','attempt','item','resolution')
       or jsonb_typeof(v_selection) <> 'object'
       or exists (select 1 from jsonb_object_keys(v_selection) k where k <> 'id')
       or not (v_selection ? 'id')
       or jsonb_typeof(v_selection -> 'id') <> 'string'
       or char_length(v_selection ->> 'id') not between 1 and 80
       or (v_selection ->> 'id') !~ '^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$' then return false; end if;
  end loop;
  return true;
exception when others then
  return false;
end;
$$;

create or replace function private.story_builder_valid_support_evidence(p_value jsonb)
returns boolean
language plpgsql immutable
set search_path = ''
as $$
declare
  v_observation jsonb;
begin
  if p_value = '{}'::jsonb then return true; end if;
  if jsonb_typeof(p_value) <> 'object' or octet_length(p_value::text) > 8192 then return false; end if;
  if exists (select 1 from jsonb_object_keys(p_value) k where k not in ('version','recording_method','tell_again_planner','observations')) then return false; end if;
  if not (p_value ?& array['version','recording_method','tell_again_planner','observations']) then return false; end if;
  if p_value ->> 'version' <> '1'
     or p_value ->> 'recording_method' <> 'educator_documented'
     or p_value ->> 'tell_again_planner' not in ('available','not_available','not_documented')
     or jsonb_typeof(p_value -> 'observations') <> 'array'
     or jsonb_array_length(p_value -> 'observations') > 16 then return false; end if;
  for v_observation in select value from jsonb_array_elements(p_value -> 'observations') loop
    if jsonb_typeof(v_observation) <> 'object'
       or exists (select 1 from jsonb_object_keys(v_observation) k where k not in ('story_part','support_key','level','used'))
       or not (v_observation ?& array['story_part','support_key','level','used'])
       or v_observation ->> 'story_part' not in ('character','setting','problem','feeling','plan','attempt','item','resolution')
       or v_observation ->> 'support_key' not in ('look_here','think_about_it','clue','words_to_try','sentence_start','story_reminder','question_prompt','sentence_starter','connective_words','useful_words','planner')
       or jsonb_typeof(v_observation -> 'level') <> 'number'
       or (v_observation ->> 'level')::integer not between 1 and 5
       or jsonb_typeof(v_observation -> 'used') <> 'boolean' then return false; end if;
  end loop;
  return true;
exception when others then
  return false;
end;
$$;

create table public.story_builder_student_cycles (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null,
  owner_user_id uuid not null,
  schema_version integer not null default 1,
  status text not null default 'draft',
  stage_reached text not null default 'cycle_started',
  title text,
  selected_target_key text,
  target_selected_at timestamptz,
  prompt_provenance jsonb not null default '{}'::jsonb,
  first_tell_status text not null default 'pending',
  first_tell_mode text,
  first_tell_text text,
  first_tell_recorded_at timestamptz,
  first_tell_skip_reason text,
  revision_status text not null default 'not_started',
  revision_mode text,
  revision_text text,
  revision_recorded_at timestamptz,
  revision_skip_reason text,
  tell_again_status text not null default 'pending',
  tell_again_mode text,
  tell_again_text text,
  tell_again_recorded_at timestamptz,
  tell_again_skip_reason text,
  support_evidence jsonb not null default '{}'::jsonb,
  student_reflection text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  abandoned_at timestamptz,
  client_updated_at timestamptz,
  record_revision bigint not null default 1,
  constraint story_builder_student_cycles_student_owner_fkey
    foreign key (student_id, owner_user_id) references public.students(id, owner_user_id) on delete cascade,
  constraint story_builder_student_cycles_schema_check check (schema_version = 1),
  constraint story_builder_student_cycles_status_check check (status in ('draft','in_progress','completed','abandoned')),
  constraint story_builder_student_cycles_stage_check check (stage_reached in ('cycle_started','first_tell_resolved','target_selected','revision_resolved','tell_again_resolved')),
  constraint story_builder_student_cycles_target_check check (selected_target_key is null or selected_target_key in ('story_organization','connections_cohesion','cause_effect','sentence_formulation','elaboration','perspective_internal_state','vocabulary_precision')),
  constraint story_builder_student_cycles_target_time_check check ((selected_target_key is null) = (target_selected_at is null)),
  constraint story_builder_student_cycles_reflection_check check (student_reflection is null or student_reflection in ('yes','sometimes','not_yet')),
  constraint story_builder_student_cycles_title_check check (title is null or char_length(title) <= 120),
  constraint story_builder_student_cycles_first_length_check check (first_tell_text is null or char_length(first_tell_text) <= 16000),
  constraint story_builder_student_cycles_revision_length_check check (revision_text is null or char_length(revision_text) <= 16000),
  constraint story_builder_student_cycles_tell_again_length_check check (tell_again_text is null or char_length(tell_again_text) <= 16000),
  constraint story_builder_student_cycles_combined_length_check check (coalesce(char_length(first_tell_text),0) + coalesce(char_length(revision_text),0) + coalesce(char_length(tell_again_text),0) <= 40000),
  constraint story_builder_student_cycles_prompt_check check (private.story_builder_valid_prompt_provenance(prompt_provenance)),
  constraint story_builder_student_cycles_support_check check (private.story_builder_valid_support_evidence(support_evidence)),
  constraint story_builder_student_cycles_revision_positive check (record_revision >= 1),
  constraint story_builder_student_cycles_first_status_check check (first_tell_status in ('pending','captured','skipped')),
  constraint story_builder_student_cycles_revision_status_check check (revision_status in ('not_started','captured','skipped')),
  constraint story_builder_student_cycles_tell_status_check check (tell_again_status in ('pending','captured','skipped')),
  constraint story_builder_student_cycles_first_evidence_check check (
    (first_tell_status = 'pending' and first_tell_mode is null and first_tell_text is null and first_tell_recorded_at is null and first_tell_skip_reason is null)
    or (first_tell_status = 'captured' and first_tell_mode in ('student_typed','educator_scribed') and nullif(btrim(first_tell_text),'') is not null and first_tell_recorded_at is not null and first_tell_skip_reason is null)
    or (first_tell_status = 'captured' and first_tell_mode = 'oral_not_captured' and first_tell_text is null and first_tell_recorded_at is not null and first_tell_skip_reason is null)
    or (first_tell_status = 'skipped' and first_tell_mode is null and first_tell_text is null and first_tell_recorded_at is not null and first_tell_skip_reason in ('target_already_known','not_administered'))
  ),
  constraint story_builder_student_cycles_revision_evidence_check check (
    (revision_status = 'not_started' and revision_mode is null and revision_text is null and revision_recorded_at is null and revision_skip_reason is null)
    or (revision_status = 'captured' and revision_mode in ('student_typed','educator_scribed') and nullif(btrim(revision_text),'') is not null and revision_recorded_at is not null and revision_skip_reason is null)
    or (revision_status = 'captured' and revision_mode = 'oral_not_captured' and revision_text is null and revision_recorded_at is not null and revision_skip_reason is null)
    or (revision_status = 'skipped' and revision_mode is null and revision_text is null and revision_recorded_at is not null and revision_skip_reason in ('not_needed','not_administered','cycle_ended_early'))
  ),
  constraint story_builder_student_cycles_tell_evidence_check check (
    (tell_again_status = 'pending' and tell_again_mode is null and tell_again_text is null and tell_again_recorded_at is null and tell_again_skip_reason is null)
    or (tell_again_status = 'captured' and tell_again_mode in ('student_typed','educator_scribed') and nullif(btrim(tell_again_text),'') is not null and tell_again_recorded_at is not null and tell_again_skip_reason is null)
    or (tell_again_status = 'captured' and tell_again_mode = 'oral_not_captured' and tell_again_text is null and tell_again_recorded_at is not null and tell_again_skip_reason is null)
    or (tell_again_status = 'skipped' and tell_again_mode is null and tell_again_text is null and tell_again_recorded_at is not null and tell_again_skip_reason in ('not_administered','cycle_ended_early'))
  ),
  constraint story_builder_student_cycles_terminal_check check (
    (status in ('draft','in_progress') and completed_at is null and abandoned_at is null)
    or (status = 'completed' and completed_at is not null and abandoned_at is null and selected_target_key is not null and first_tell_status <> 'pending' and tell_again_status <> 'pending')
    or (status = 'abandoned' and abandoned_at is not null and completed_at is null)
  )
);

create unique index story_builder_student_cycles_one_active_idx
  on public.story_builder_student_cycles (student_id)
  where status in ('draft','in_progress');
create index story_builder_student_cycles_student_recent_idx
  on public.story_builder_student_cycles (student_id, created_at desc, id desc);
create index story_builder_student_cycles_owner_student_recent_idx
  on public.story_builder_student_cycles (owner_user_id, student_id, created_at desc, id desc);

alter table public.story_builder_student_cycles enable row level security;
alter table public.story_builder_student_cycles force row level security;
revoke all on table public.story_builder_student_cycles from public, anon, authenticated;
grant all on table public.story_builder_student_cycles to service_role;

create policy story_builder_student_cycles_educator_select
on public.story_builder_student_cycles for select to authenticated
using (
  coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
  and owner_user_id = (select auth.uid())
);

create or replace function private.story_builder_is_anonymous()
returns boolean language sql stable security invoker set search_path = ''
as $$ select coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) $$;

create or replace function private.story_builder_stage_rank(p_stage text)
returns integer language sql immutable security invoker set search_path = ''
as $$
  select case p_stage
    when 'cycle_started' then 0 when 'first_tell_resolved' then 1
    when 'target_selected' then 2 when 'revision_resolved' then 3
    when 'tell_again_resolved' then 4 else -1 end
$$;

create or replace function private.story_builder_owner_has_entitlement(p_owner uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.product_entitlements pe
    where pe.owner_user_id = p_owner and pe.product_key = 'first-volo-story-builder'
      and pe.status = 'active' and pe.starts_at <= pg_catalog.now() and pe.expires_at > pg_catalog.now()
  )
$$;

create or replace function private.story_builder_resolve_student(p_student_id uuid, p_require_current_access boolean default true)
returns table (student_id uuid, owner_user_id uuid)
language plpgsql stable security definer set search_path = ''
as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception using errcode='42501', message='story_builder_not_authorized'; end if;
  if private.story_builder_is_anonymous() then
    return query
      select s.id, s.owner_user_id
      from public.student_auth_links sal
      join public.students s on s.id=sal.student_id and s.owner_user_id=sal.owner_user_id and s.archived_at is null
      join public.classes c on c.id=sal.class_id and c.owner_user_id=sal.owner_user_id and c.archived_at is null
      join public.class_memberships cm on cm.class_id=c.id and cm.student_id=s.id and cm.owner_user_id=s.owner_user_id
      join public.class_product_access cpa on cpa.class_id=c.id and cpa.owner_user_id=s.owner_user_id and cpa.product_key='first-volo-story-builder'
      where sal.auth_user_id=v_uid and sal.revoked_at is null and sal.class_id is not null
        and (p_student_id is null or p_student_id=s.id)
        and private.story_builder_owner_has_entitlement(s.owner_user_id)
      limit 1;
  else
    return query
      select s.id, s.owner_user_id from public.students s
      where s.id=p_student_id and s.owner_user_id=v_uid and (not p_require_current_access or s.archived_at is null)
        and private.story_builder_owner_has_entitlement(v_uid)
        and (not p_require_current_access or exists (
          select 1 from public.class_memberships cm join public.classes c on c.id=cm.class_id and c.owner_user_id=cm.owner_user_id and c.archived_at is null
          join public.class_product_access cpa on cpa.class_id=c.id and cpa.owner_user_id=c.owner_user_id and cpa.product_key='first-volo-story-builder'
          where cm.student_id=s.id and cm.owner_user_id=s.owner_user_id
        )) limit 1;
  end if;
end;
$$;

create or replace function private.story_builder_authorized_cycle(p_cycle_id uuid, p_for_mutation boolean default true)
returns public.story_builder_student_cycles
language plpgsql stable security definer set search_path = ''
as $$
declare v_cycle public.story_builder_student_cycles; v_identity record;
begin
  select * into v_cycle from public.story_builder_student_cycles where id=p_cycle_id;
  if not found then raise exception using errcode='42501', message='story_builder_not_authorized'; end if;
  select * into v_identity from private.story_builder_resolve_student(v_cycle.student_id, p_for_mutation);
  if not found or v_identity.owner_user_id <> v_cycle.owner_user_id then
    raise exception using errcode='42501', message='story_builder_not_authorized';
  end if;
  return v_cycle;
end;
$$;

create or replace function private.story_builder_mutation_result(p_cycle_id uuid, p_expected_revision bigint)
returns table (result_code text, cycle jsonb)
language plpgsql stable security definer set search_path = ''
as $$
declare v_cycle public.story_builder_student_cycles;
begin
  v_cycle := private.story_builder_authorized_cycle(p_cycle_id, true);
  if v_cycle.status in ('completed','abandoned') then
    return query select 'terminal_cycle_immutable', to_jsonb(v_cycle); return;
  end if;
  if p_expected_revision is null or v_cycle.record_revision <> p_expected_revision then
    return query select 'revision_conflict', to_jsonb(v_cycle); return;
  end if;
  return query select 'ok', to_jsonb(v_cycle);
end;
$$;

create or replace function public.start_story_builder_student_cycle(p_student_id uuid default null, p_client_updated_at timestamptz default null)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$
declare v_identity record; v_cycle public.story_builder_student_cycles;
begin
  select * into v_identity from private.story_builder_resolve_student(p_student_id, true);
  if not found then raise exception using errcode='42501', message='story_builder_not_authorized'; end if;
  select * into v_cycle from public.story_builder_student_cycles where student_id=v_identity.student_id and status in ('draft','in_progress');
  if found then return query select 'active_cycle_exists', to_jsonb(v_cycle); return; end if;
  begin
    insert into public.story_builder_student_cycles(student_id,owner_user_id,client_updated_at)
    values(v_identity.student_id,v_identity.owner_user_id,p_client_updated_at) returning * into v_cycle;
  exception when unique_violation then
    select * into v_cycle from public.story_builder_student_cycles where student_id=v_identity.student_id and status in ('draft','in_progress');
    return query select 'active_cycle_exists', to_jsonb(v_cycle); return;
  end;
  return query select 'created', to_jsonb(v_cycle);
end;
$$;

create or replace function public.get_active_story_builder_student_cycle(p_student_id uuid default null)
returns setof public.story_builder_student_cycles
language plpgsql stable security definer set search_path = ''
as $$ declare v_identity record; begin
  select * into v_identity from private.story_builder_resolve_student(p_student_id,true);
  if not found then raise exception using errcode='42501', message='story_builder_not_authorized'; end if;
  return query select * from public.story_builder_student_cycles where student_id=v_identity.student_id and owner_user_id=v_identity.owner_user_id and status in ('draft','in_progress');
end $$;

create or replace function public.get_story_builder_student_cycle(p_cycle_id uuid)
returns setof public.story_builder_student_cycles
language plpgsql stable security definer set search_path = ''
as $$ declare v_cycle public.story_builder_student_cycles; begin
  v_cycle := private.story_builder_authorized_cycle(p_cycle_id,false); return next v_cycle;
end $$;

create or replace function public.save_story_builder_student_cycle_metadata(p_cycle_id uuid,p_expected_revision bigint,p_title text,p_prompt_provenance jsonb,p_client_updated_at timestamptz)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$ declare v_check record; v_cycle public.story_builder_student_cycles; begin
  select * into v_check from private.story_builder_mutation_result(p_cycle_id,p_expected_revision);
  if v_check.result_code <> 'ok' then return query select v_check.result_code,v_check.cycle; return; end if;
  if p_title is not null and char_length(p_title)>120 then raise exception using errcode='22023',message='story_builder_invalid_title'; end if;
  if not private.story_builder_valid_prompt_provenance(coalesce(p_prompt_provenance,'{}')) then raise exception using errcode='22023',message='story_builder_invalid_prompt_provenance'; end if;
  update public.story_builder_student_cycles set title=nullif(btrim(p_title),''),prompt_provenance=coalesce(p_prompt_provenance,'{}'),client_updated_at=p_client_updated_at,updated_at=transaction_timestamp(),record_revision=record_revision+1
  where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  if not found then return query select * from private.story_builder_mutation_result(p_cycle_id,p_expected_revision); return; end if;
  return query select 'updated',to_jsonb(v_cycle);
end $$;

create or replace function public.record_story_builder_evidence(p_cycle_id uuid,p_expected_revision bigint,p_boundary text,p_status text,p_mode text,p_text text,p_skip_reason text,p_client_updated_at timestamptz)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$
declare v_check record; v_cycle public.story_builder_student_cycles; v_now timestamptz:=transaction_timestamp();
begin
  select * into v_check from private.story_builder_mutation_result(p_cycle_id,p_expected_revision);
  if v_check.result_code <> 'ok' then return query select v_check.result_code,v_check.cycle; return; end if;
  v_cycle:=jsonb_populate_record(null::public.story_builder_student_cycles,v_check.cycle);
  if p_boundary is null or p_boundary not in ('first_tell','revision','tell_again') then raise exception using errcode='22023',message='story_builder_invalid_boundary'; end if;
  if p_status is null then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_text is not null and char_length(p_text)>16000 then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_boundary in ('first_tell','tell_again') and p_status not in ('pending','captured','skipped') then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_boundary='revision' and p_status not in ('not_started','captured','skipped') then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_status='captured' and p_mode in ('student_typed','educator_scribed') and nullif(btrim(p_text),'') is null then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_status='captured' and p_mode='oral_not_captured' and p_text is not null then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_status='captured' and (p_mode is null or p_mode not in ('student_typed','educator_scribed','oral_not_captured')) then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_status in ('pending','not_started') and (p_mode is not null or p_text is not null or p_skip_reason is not null) then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_status='skipped' and (p_mode is not null or p_text is not null) then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_boundary='first_tell' and p_status='skipped' and (p_skip_reason is null or p_skip_reason not in ('target_already_known','not_administered')) then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_boundary='revision' and p_status='skipped' and (p_skip_reason is null or p_skip_reason not in ('not_needed','not_administered','cycle_ended_early')) then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_boundary='tell_again' and p_status='skipped' and (p_skip_reason is null or p_skip_reason not in ('not_administered','cycle_ended_early')) then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if p_status<>'skipped' and p_skip_reason is not null then raise exception using errcode='22023',message='story_builder_invalid_evidence'; end if;
  if (
    case p_boundary when 'first_tell' then coalesce(char_length(p_text),0) else coalesce(char_length(v_cycle.first_tell_text),0) end
    + case p_boundary when 'revision' then coalesce(char_length(p_text),0) else coalesce(char_length(v_cycle.revision_text),0) end
    + case p_boundary when 'tell_again' then coalesce(char_length(p_text),0) else coalesce(char_length(v_cycle.tell_again_text),0) end
  ) > 40000 then raise exception using errcode='22023',message='story_builder_combined_evidence_too_large'; end if;

  if p_boundary='first_tell' then
    update public.story_builder_student_cycles set first_tell_status=p_status,first_tell_mode=p_mode,first_tell_text=p_text,first_tell_skip_reason=p_skip_reason,first_tell_recorded_at=case when p_status='pending' then null else v_now end,status=case when status='draft' and p_status<>'pending' then 'in_progress' else status end,stage_reached=case when p_status<>'pending' and private.story_builder_stage_rank(stage_reached)<1 then 'first_tell_resolved' else stage_reached end,client_updated_at=p_client_updated_at,updated_at=v_now,record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  elsif p_boundary='revision' then
    update public.story_builder_student_cycles set revision_status=p_status,revision_mode=p_mode,revision_text=p_text,revision_skip_reason=p_skip_reason,revision_recorded_at=case when p_status='not_started' then null else v_now end,status=case when status='draft' and p_status<>'not_started' then 'in_progress' else status end,stage_reached=case when p_status<>'not_started' and private.story_builder_stage_rank(stage_reached)<3 then 'revision_resolved' else stage_reached end,client_updated_at=p_client_updated_at,updated_at=v_now,record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  else
    update public.story_builder_student_cycles set tell_again_status=p_status,tell_again_mode=p_mode,tell_again_text=p_text,tell_again_skip_reason=p_skip_reason,tell_again_recorded_at=case when p_status='pending' then null else v_now end,status=case when status='draft' and p_status<>'pending' then 'in_progress' else status end,stage_reached=case when p_status<>'pending' and private.story_builder_stage_rank(stage_reached)<4 then 'tell_again_resolved' else stage_reached end,client_updated_at=p_client_updated_at,updated_at=v_now,record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  end if;
  if not found then return query select * from private.story_builder_mutation_result(p_cycle_id,p_expected_revision); return; end if;
  return query select 'updated',to_jsonb(v_cycle);
end $$;

create or replace function public.set_story_builder_cycle_target(p_cycle_id uuid,p_expected_revision bigint,p_target_key text,p_confirm_replace boolean default false)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$ declare v_check record; v_cycle public.story_builder_student_cycles; begin
  select * into v_check from private.story_builder_mutation_result(p_cycle_id,p_expected_revision);
  if v_check.result_code<>'ok' then return query select v_check.result_code,v_check.cycle; return; end if;
  v_cycle:=jsonb_populate_record(null::public.story_builder_student_cycles,v_check.cycle);
  if p_target_key is null or p_target_key not in ('story_organization','connections_cohesion','cause_effect','sentence_formulation','elaboration','perspective_internal_state','vocabulary_precision') then raise exception using errcode='22023',message='story_builder_invalid_target'; end if;
  if v_cycle.selected_target_key is not null and v_cycle.selected_target_key<>p_target_key and (v_cycle.revision_status<>'not_started' or v_cycle.tell_again_status<>'pending') and not coalesce(p_confirm_replace,false) then
    return query select 'target_replace_confirmation_required',to_jsonb(v_cycle); return;
  end if;
  update public.story_builder_student_cycles set selected_target_key=p_target_key,target_selected_at=transaction_timestamp(),status='in_progress',stage_reached=case when private.story_builder_stage_rank(stage_reached)<2 then 'target_selected' else stage_reached end,updated_at=transaction_timestamp(),record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  if not found then return query select * from private.story_builder_mutation_result(p_cycle_id,p_expected_revision); return; end if;
  return query select 'updated',to_jsonb(v_cycle);
end $$;

create or replace function public.set_story_builder_cycle_context(p_cycle_id uuid,p_expected_revision bigint,p_support_evidence jsonb,p_student_reflection text)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$ declare v_check record; v_cycle public.story_builder_student_cycles; begin
  select * into v_check from private.story_builder_mutation_result(p_cycle_id,p_expected_revision);
  if v_check.result_code<>'ok' then return query select v_check.result_code,v_check.cycle; return; end if;
  if not private.story_builder_valid_support_evidence(coalesce(p_support_evidence,'{}')) then raise exception using errcode='22023',message='story_builder_invalid_support_evidence'; end if;
  if p_student_reflection is not null and p_student_reflection not in ('yes','sometimes','not_yet') then raise exception using errcode='22023',message='story_builder_invalid_reflection'; end if;
  update public.story_builder_student_cycles set support_evidence=coalesce(p_support_evidence,'{}'),student_reflection=p_student_reflection,updated_at=transaction_timestamp(),record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  if not found then return query select * from private.story_builder_mutation_result(p_cycle_id,p_expected_revision); return; end if;
  return query select 'updated',to_jsonb(v_cycle);
end $$;

create or replace function public.complete_story_builder_student_cycle(p_cycle_id uuid,p_expected_revision bigint)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$ declare v_check record; v_cycle public.story_builder_student_cycles; begin
  select * into v_check from private.story_builder_mutation_result(p_cycle_id,p_expected_revision);
  if v_check.result_code<>'ok' then return query select v_check.result_code,v_check.cycle; return; end if;
  v_cycle:=jsonb_populate_record(null::public.story_builder_student_cycles,v_check.cycle);
  if v_cycle.selected_target_key is null or v_cycle.first_tell_status='pending' or v_cycle.tell_again_status='pending' then return query select 'completion_requirements_not_met',to_jsonb(v_cycle); return; end if;
  update public.story_builder_student_cycles set status='completed',completed_at=transaction_timestamp(),updated_at=transaction_timestamp(),record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  if not found then return query select * from private.story_builder_mutation_result(p_cycle_id,p_expected_revision); return; end if;
  return query select 'completed',to_jsonb(v_cycle);
end $$;

create or replace function public.abandon_story_builder_student_cycle(p_cycle_id uuid,p_expected_revision bigint)
returns table (result_code text, cycle jsonb)
language plpgsql security definer set search_path = ''
as $$ declare v_check record; v_cycle public.story_builder_student_cycles; begin
  select * into v_check from private.story_builder_mutation_result(p_cycle_id,p_expected_revision);
  if v_check.result_code<>'ok' then return query select v_check.result_code,v_check.cycle; return; end if;
  update public.story_builder_student_cycles set status='abandoned',abandoned_at=transaction_timestamp(),updated_at=transaction_timestamp(),record_revision=record_revision+1 where id=p_cycle_id and record_revision=p_expected_revision returning * into v_cycle;
  if not found then return query select * from private.story_builder_mutation_result(p_cycle_id,p_expected_revision); return; end if;
  return query select 'abandoned',to_jsonb(v_cycle);
end $$;

create or replace function public.list_story_builder_student_cycles_for_educator(p_student_id uuid,p_before_created_at timestamptz default null,p_before_id uuid default null,p_limit integer default 20)
returns table(id uuid,status text,stage_reached text,title text,selected_target_key text,first_tell_status text,revision_status text,tell_again_status text,student_reflection text,created_at timestamptz,updated_at timestamptz,completed_at timestamptz,abandoned_at timestamptz,record_revision bigint)
language plpgsql stable security definer set search_path = ''
as $$ declare v_identity record; v_limit integer; begin
  if private.story_builder_is_anonymous() then raise exception using errcode='42501',message='story_builder_not_authorized'; end if;
  select * into v_identity from private.story_builder_resolve_student(p_student_id,false);
  if not found then raise exception using errcode='42501',message='story_builder_not_authorized'; end if;
  v_limit:=greatest(1,least(coalesce(p_limit,20),50));
  return query select c.id,c.status,c.stage_reached,c.title,c.selected_target_key,c.first_tell_status,c.revision_status,c.tell_again_status,c.student_reflection,c.created_at,c.updated_at,c.completed_at,c.abandoned_at,c.record_revision
  from public.story_builder_student_cycles c where c.student_id=v_identity.student_id and c.owner_user_id=v_identity.owner_user_id
    and (p_before_created_at is null or (c.created_at,c.id)<(p_before_created_at,coalesce(p_before_id,'ffffffff-ffff-ffff-ffff-ffffffffffff'::uuid)))
  order by c.created_at desc,c.id desc limit v_limit;
end $$;

create or replace function public.get_story_builder_student_cycle_for_educator(p_cycle_id uuid)
returns setof public.story_builder_student_cycles
language plpgsql stable security definer set search_path = ''
as $$ declare v_cycle public.story_builder_student_cycles; begin
  if private.story_builder_is_anonymous() then raise exception using errcode='42501',message='story_builder_not_authorized'; end if;
  v_cycle:=private.story_builder_authorized_cycle(p_cycle_id,false); return next v_cycle;
end $$;

revoke all on function private.story_builder_valid_prompt_provenance(jsonb), private.story_builder_valid_support_evidence(jsonb), private.story_builder_is_anonymous(), private.story_builder_stage_rank(text), private.story_builder_owner_has_entitlement(uuid), private.story_builder_resolve_student(uuid,boolean), private.story_builder_authorized_cycle(uuid,boolean), private.story_builder_mutation_result(uuid,bigint) from public,anon,authenticated,service_role;
-- service_role has explicit table administration privileges, so it must be able to
-- execute only the immutable validators invoked by table CHECK constraints.
grant execute on function private.story_builder_valid_prompt_provenance(jsonb), private.story_builder_valid_support_evidence(jsonb) to service_role;

revoke all on function public.start_story_builder_student_cycle(uuid,timestamptz) from public,anon;
revoke all on function public.get_active_story_builder_student_cycle(uuid) from public,anon;
revoke all on function public.get_story_builder_student_cycle(uuid) from public,anon;
revoke all on function public.save_story_builder_student_cycle_metadata(uuid,bigint,text,jsonb,timestamptz) from public,anon;
revoke all on function public.record_story_builder_evidence(uuid,bigint,text,text,text,text,text,timestamptz) from public,anon;
revoke all on function public.set_story_builder_cycle_target(uuid,bigint,text,boolean) from public,anon;
revoke all on function public.set_story_builder_cycle_context(uuid,bigint,jsonb,text) from public,anon;
revoke all on function public.complete_story_builder_student_cycle(uuid,bigint) from public,anon;
revoke all on function public.abandon_story_builder_student_cycle(uuid,bigint) from public,anon;
revoke all on function public.list_story_builder_student_cycles_for_educator(uuid,timestamptz,uuid,integer) from public,anon;
revoke all on function public.get_story_builder_student_cycle_for_educator(uuid) from public,anon;

revoke all on function public.start_story_builder_student_cycle(uuid,timestamptz), public.get_active_story_builder_student_cycle(uuid), public.get_story_builder_student_cycle(uuid), public.save_story_builder_student_cycle_metadata(uuid,bigint,text,jsonb,timestamptz), public.record_story_builder_evidence(uuid,bigint,text,text,text,text,text,timestamptz), public.set_story_builder_cycle_target(uuid,bigint,text,boolean), public.set_story_builder_cycle_context(uuid,bigint,jsonb,text), public.complete_story_builder_student_cycle(uuid,bigint), public.abandon_story_builder_student_cycle(uuid,bigint), public.list_story_builder_student_cycles_for_educator(uuid,timestamptz,uuid,integer), public.get_story_builder_student_cycle_for_educator(uuid) from service_role;
grant execute on function public.start_story_builder_student_cycle(uuid,timestamptz), public.get_active_story_builder_student_cycle(uuid), public.get_story_builder_student_cycle(uuid), public.save_story_builder_student_cycle_metadata(uuid,bigint,text,jsonb,timestamptz), public.record_story_builder_evidence(uuid,bigint,text,text,text,text,text,timestamptz), public.set_story_builder_cycle_target(uuid,bigint,text,boolean), public.set_story_builder_cycle_context(uuid,bigint,jsonb,text), public.complete_story_builder_student_cycle(uuid,bigint), public.abandon_story_builder_student_cycle(uuid,bigint) to authenticated;
grant execute on function public.list_story_builder_student_cycles_for_educator(uuid,timestamptz,uuid,integer), public.get_story_builder_student_cycle_for_educator(uuid) to authenticated;

commit;

-- Immutable runtime-to-storage mapping (runtime changes are outside this review):
-- story-organization -> story_organization
-- connections-cohesion -> connections_cohesion
-- cause-effect -> cause_effect
-- sentence-formulation -> sentence_formulation
-- elaboration -> elaboration
-- perspective-internal-state -> perspective_internal_state
-- vocabulary-precision -> vocabulary_precision
-- off / observe-first -> NULL (workflow states, never targets)
