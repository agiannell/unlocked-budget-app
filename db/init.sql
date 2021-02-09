drop table if exists
users, groups, categories, transactions;

create table users (
  user_id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(100) not null,
  password varchar not null,
  profile_pic text
);

create table groups (
  group_id serial primary key,
  user_id int references users(user_id) not null,
  name varchar
);

create table categories (
  cat_id serial primary key,
  group_id int references groups(group_id) not null,
  user_id int references users(user_id) not null,
  name varchar,
  amount numeric default 0
);

create table transactions (
  trans_id serial primary key,
  user_id int references users(user_id),
  cat_id int references categories(cat_id),
  name varchar,
  date date,
  amount numeric default 0,
  notes text
  type varchar(10) not null
);