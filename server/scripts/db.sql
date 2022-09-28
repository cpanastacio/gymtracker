CREATE SCHEMA IF NOT EXISTS lifts_schema;

CREATE TABLE IF NOT EXISTS lifts_schema.users (
	user_id serial PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	firstName VARCHAR(25),
	lastName VARCHAR(25),
	height FLOAT,
	gender VARCHAR(8),
	weight FLOAT,
	age INTEGER,
	email VARCHAR(255) UNIQUE NOT NULL,
	created_on timestamp not null default CURRENT_TIMESTAMP, 
	last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lifts_schema.lifts(
	lift_id serial PRIMARY KEY,
	description VARCHAR(125) UNIQUE NOT NULL,
	url VARCHAR(500),
	created_on TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lifts_schema.userlifts(
	userlifts_id serial PRIMARY KEY,
	lift_id INTEGER REFERENCES lifts_schema.lifts (lift_id),
	user_id INTEGER REFERENCES lifts_schema.users (user_id)
)