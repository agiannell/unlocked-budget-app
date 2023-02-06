DROP TABLE IF EXISTS
users, groups, categories, transactions;

CREATE TABLE users (
  user_id uuid PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  profile_pic text
);

CREATE TABLE groups (
  group_id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(user_id) NOT NULL,
  name text
);

CREATE TABLE categories (
  cat_id uuid PRIMARY KEY,
  group_id uuid REFERENCES groups(group_id) NOT NULL,
  user_id uuid REFERENCES users(user_id) NOT NULL,
  name text,
  amount decimal DEFAULT 0
);

CREATE TABLE transactions (
  trans_id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(user_id),
  cat_id uuid REFERENCES categories(cat_id),
  name text,
  date timestamp without time zone,
  amount decimal DEFAULT 0,
  notes text,
  type text NOT NULL
);