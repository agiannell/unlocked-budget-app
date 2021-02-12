update categories
set name = $2,
    amount = $3
where cat_id = $1;