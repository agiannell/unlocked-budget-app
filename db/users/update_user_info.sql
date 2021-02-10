update users
set first_name = $2,
    last_name = $3,
    email = $4
where user_id = $1
returning user_id, first_name, last_name, email, profile_pic;