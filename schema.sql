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
  value SMALLINT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);





COPY reviews FROM '/Users/guillermo/Desktop/data/reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/guillermo/Desktop/data/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/Users/guillermo/Desktop/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/guillermo/Desktop/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;







-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Product'
--
-- ---

-- DROP TABLE IF EXISTS Product;

-- CREATE TABLE Product (
--   id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   page INTEGER NULL DEFAULT NULL,
--   count INTEGER NULL DEFAULT NULL,
--   product_id INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY (product_id),
--   UNIQUE KEY (id)
-- );

-- ---
-- Table 'Reviews'
--
-- ---



-- CREATE TABLE IF NOT EXISTS Reviews (
--   index INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   review_id INTEGER NULL DEFAULT NULL,
--   summary MEDIUMTEXT NULL DEFAULT NULL,
--   rating INTEGER NULL DEFAULT NULL,
--   body MEDIUMTEXT NULL DEFAULT NULL,
--   recommend BINARY NULL DEFAULT NULL,
--   response MEDIUMTEXT NULL DEFAULT NULL,
--   date TIMESTAMP NULL DEFAULT NULL,
--   reviewer_name MEDIUMTEXT NULL DEFAULT NULL,
--   helpfulness INTEGER NULL DEFAULT NULL,
--   product_id_Product INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY (review_id),
-- KEY (index)
-- );

-- ALTER TABLE Reviews
--    OWNER to postgres;

-- ---
-- Table 'Photos'
--
-- ---

-- DROP TABLE IF EXISTS `Photos`;

-- CREATE TABLE `Photos` (
--   'id' INTEGER NULL DEFAULT NULL,
--   'url' INTEGER NULL DEFAULT NULL,
--   'review_id_Reviews' INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY ('id')
-- );

-- ---
-- Table 'Characteristics'
--
-- ---

-- DROP TABLE IF EXISTS `Characteristics`;

-- CREATE TABLE `Characteristics` (
--   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   `review_id_Reviews` INTEGER NULL DEFAULT NULL,
--   `name` INTEGER NULL DEFAULT NULL,
--   `value` INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id_Product) REFERENCES `Product` (`product_id`);
-- ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id_Product) REFERENCES `Product` (`product_id`);
-- ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id_Product) REFERENCES `Product` (`product_id`);
-- ALTER TABLE `Photos` ADD FOREIGN KEY (review_id_Reviews) REFERENCES `Reviews` (`review_id`);
-- ALTER TABLE `Characteristics` ADD FOREIGN KEY (review_id_Reviews) REFERENCES `Reviews` (`review_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Product` (`id`,`page`,`count`,`product_id`) VALUES
-- ('','','','');
-- INSERT INTO `Reviews` (`index`,`review_id`,`summary`,`rating`,`body`,`recommend`,`response`,`date`,`reviewer_name`,`helpfulness`,`product_id_Product`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `Photos` (`id`,`url`,`review_id_Reviews`) VALUES
-- ('','','');
-- INSERT INTO `Characteristics` (`id`,`review_id_Reviews`,`name`,`value`) VALUES
-- ('','','','');