update users
set first_name = $2
where user_id = $1;

update users
set last_name = $3
where user_id = $1;

update users
set email = $4
where user_id = $1;

select user_id, first_name, last_name, email, profile_pic from user
where user_id = $1;