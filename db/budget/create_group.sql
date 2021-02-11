insert into groups (user_id, name)
values ($1, $2);

select * from groups
where user_id = $1;