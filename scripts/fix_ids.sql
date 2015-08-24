SELECT setval('members_id_seq', max(id)) FROM members;
SELECT setval('meeting_members_id_seq', max(id)) FROM meeting_members;
SELECT setval('belts_id_seq', max(id)) FROM belts;
SELECT setval('roles_id_seq', max(id)) FROM roles;
SELECT setval('schools_id_seq', max(id)) FROM schools;
SELECT setval('meeting_types_id_seq', max(id)) FROM meeting_types;
SELECT setval('meetings_id_seq', max(id)) FROM meetings;
