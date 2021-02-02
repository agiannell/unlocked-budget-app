create table users (
  user_id serial primary key,
  first_name varchar(50),
  last_name varchar(50),
  email varchar(100),
  password varchar,
  profile_pic text
);

create table groups (
  group_id serial primary key,
  user_id int references users(user_id),
  name varchar
);

create table categories (
  cat_id serial primary key,
  group_id int references groups(group_id),
  user_id int references users(user_id),
  name varchar,
  amount numeric
);

create table transactions (
  trans_id serial primary key,
  user_id int references users(user_id),
  cat_id int references categories(cat_id),
  name varchar,
  date date,
  amount numeric,
  notes text
);