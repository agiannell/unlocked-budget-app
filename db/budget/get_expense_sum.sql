select sum(c.amount) from categories c
join groups g
on g.group_id = c.group_id
where g.user_id = $1
and g.name != 'income';