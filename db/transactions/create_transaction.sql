insert into transactions (user_id, cat_id, type, name, date, amount, notes)
values ($1, $2, $3, $4, $5, $6, $7);

select * from transactions
where user_id = $1;