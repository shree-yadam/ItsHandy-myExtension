DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id  SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
  provider_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT
);