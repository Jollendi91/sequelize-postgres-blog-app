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
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    author_id INTEGER REFERENCES authors NOT NULL
);

CREATE TABLE comments (
    id serial PRIMARY KEY, 
    comment_text TEXT,
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL,
    author_id INTEGER REFERENCES authors ON DELETE CASCADE NOT NULL,
    post_id INTEGER REFERENCES posts ON DELETE CASCADE NOT NULL
)

COMMIT;