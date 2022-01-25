-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS barbies;

CREATE TABLE barbies (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  skin_color TEXT NOT NULL,
  hair_color TEXT NOT NULL, 
  eye_color TEXT NOT NULL, 
  outfit TEXT NOT NULL
);