update transactions
set cat_id = null
where cat_id = $1;

delete from categories
where cat_id = $1;