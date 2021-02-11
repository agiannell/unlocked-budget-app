select * from transactions
where user_id = $1
and cat_id is not null;