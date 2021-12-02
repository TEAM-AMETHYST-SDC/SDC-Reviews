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

CREATE INDEX r_id_idx ON reviews(product_id);

CREATE INDEX c_id_idx ON characteristic_reviews(review_id);

CREATE INDEX p_id_idx ON photos(review_id);




COPY reviews FROM '/home/ubuntu/SDC-Reviews/data/reviews.csv'  DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/home/ubuntu/SDC-Reviews/data/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/home/ubuntu/SDC-Reviews/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/home/ubuntu/SDC-Reviews/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

