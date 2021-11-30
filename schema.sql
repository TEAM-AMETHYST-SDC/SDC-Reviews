DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;

\c reviewsdb;

CREATE TABLE IF NOT EXISTS reviews
(
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating SMALLINT,
  date DATE,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT
);




CREATE TABLE IF NOT EXISTS characteristics
(
  id SERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS characteristic_reviews
(
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value SMALLINT
);

CREATE TABLE IF NOT EXISTS photos
(
  id SERIAL PRIMARY KEY,
  review_id INT,
  url TEXT
);


COPY reviews FROM '/Users/guillermo/Desktop/data/reviews.csv'  DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/guillermo/Desktop/data/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/Users/guillermo/Desktop/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/guillermo/Desktop/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

