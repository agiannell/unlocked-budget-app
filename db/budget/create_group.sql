insert into groups (user_id, name)
values ($1, $2)
returning group_id, name;