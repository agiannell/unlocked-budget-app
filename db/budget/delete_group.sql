delete from categories
where group_id = $1;

delete from groups
where group_id = $1;