update users
set profile_pic = $2
where user_id = $1;

select user_id, first_name, last_name, email, profile_pic from users
where user_id = $1;