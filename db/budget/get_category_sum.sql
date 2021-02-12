select sum(c.amount) from categories c
inner join groups g
on c.group_id = g.group_id
where g.user_id = $1
and g.name = $2;

-- select sum(c.amount) from categories c
-- left join groups g
-- on c.group_id = g.group_id
-- and g.user_id = $1
-- and g.name = $2;