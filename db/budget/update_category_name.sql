update categories
set name = $2
where cat_id = $1;

select * from categories
where group