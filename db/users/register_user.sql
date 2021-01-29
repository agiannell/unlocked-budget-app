insert into users (
    first_name,
    last_name,
    email,
    password,
    profile_pic
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)
returning user_id, first_name, last_name, email, profile_pic;