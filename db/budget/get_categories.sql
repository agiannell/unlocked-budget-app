select * from categories
where group_id = $1
order by cat_id;