SELECT setval('members_id_seq', max(id)) FROM members;
SELECT setval('meeting_members_id_seq', max(id)) FROM meeting_members;
SELECT setval('belts_id_seq', max(id)) FROM belts;
