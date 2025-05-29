CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password_hash TEXT,
  profile JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(30),
  topic VARCHAR(100),
  html TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE opportunities (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(30),
  title VARCHAR(100),
  description TEXT,
  location GEOGRAPHY,
  company VARCHAR(100),
  apply_url TEXT,
  posted_at TIMESTAMP DEFAULT now()
);

CREATE TABLE leaderboards (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(30),
  user_id INTEGER REFERENCES users(id),
  score INTEGER,
  updated_at TIMESTAMP DEFAULT now()
);