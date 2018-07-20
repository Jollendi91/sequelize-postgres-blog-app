BEGIN;

CREATE TABLE authors (
    id serial PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    username TEXT NOT NULL
);

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL, 
    create_at TIMESTAMP NOT NULL,
    author_id INTEGER REFERENCES authors NOT NULL
)

COMMIT;