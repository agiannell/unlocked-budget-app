update transactions
set name = $2,
    date = $3,
    amount = $4,
    notes = $5,
    type = $6
where trans_id = $1
returning trans_id, group_id, user_id, name, date, amount, notes, type;