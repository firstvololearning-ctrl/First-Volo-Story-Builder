-- Extend the existing context payload. Existing authorization and revision checks continue to apply.
create or replace function private.story_builder_valid_support_evidence(p_value jsonb)
returns boolean
language plpgsql immutable
set search_path = ''
as $$
declare
  v_observation jsonb;
  v_snapshot jsonb;
  v_tell jsonb;
  v_prompt jsonb;
begin
  if p_value = '{}'::jsonb then return true; end if;
  if p_value ->> 'version' = '2' then
    if jsonb_typeof(p_value) <> 'object' or octet_length(p_value::text) > 32768 then return false; end if;
    if exists(select 1 from jsonb_object_keys(p_value) k where k not in ('version','recording_method','tell_again_planner','observations','skill_snapshot')) then return false; end if;
    v_snapshot := p_value -> 'skill_snapshot';
    if jsonb_typeof(v_snapshot) is distinct from 'object' then return false; end if;
    if not (v_snapshot ?& array['skill','first-tell','tell-again','given','followup']) then return false; end if;
    if exists(select 1 from jsonb_object_keys(v_snapshot) k where k not in ('skill','first-tell','tell-again','given','followup')) then return false; end if;
    if jsonb_typeof(v_snapshot->'skill') is distinct from 'string' or length(v_snapshot->>'skill') > 240 then return false; end if;
    foreach v_observation in array array[v_snapshot->'first-tell', v_snapshot->'tell-again'] loop
      if jsonb_typeof(v_observation) is distinct from 'object'
        or not (v_observation ?& array['rating','note'])
        or exists(select 1 from jsonb_object_keys(v_observation) k where k not in ('rating','note'))
        or coalesce(v_observation->>'rating','!') not in ('','Independent','With support','Not yet','Not observed')
        or jsonb_typeof(v_observation->'note') is distinct from 'string'
        or length(v_observation->>'note') > 500 then return false; end if;
    end loop;
    if jsonb_typeof(v_snapshot->'given') is distinct from 'array' or jsonb_array_length(v_snapshot->'given') > 64 then return false; end if;
    for v_prompt in select value from jsonb_array_elements(v_snapshot->'given') loop
      if jsonb_typeof(v_prompt) <> 'string' or length(v_prompt#>>'{}') > 180 then return false; end if;
    end loop;
    v_tell := v_snapshot->'followup';
    if jsonb_typeof(v_tell) is distinct from 'object'
      or not (v_tell ?& array['rating','note','story'])
      or exists(select 1 from jsonb_object_keys(v_tell) k where k not in ('rating','note','story'))
      or coalesce(v_tell->>'rating','!') not in ('','Independent','With support','Not yet','Not observed')
      or jsonb_typeof(v_tell->'note') is distinct from 'string' or length(v_tell->>'note') > 500
      or jsonb_typeof(v_tell->'story') is distinct from 'string' or length(v_tell->>'story') > 1500 then return false; end if;
    p_value := (p_value - 'skill_snapshot') || '{"version":1}'::jsonb;
  end if;

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
