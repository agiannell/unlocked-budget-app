select sum(amount) from transactions
where cat_id = $1;