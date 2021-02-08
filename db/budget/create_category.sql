insert into categories (group_id, user_id, name, amount)
values ($1, $2, $3, $4);

select * from categories
where group_id = $1;