DROP DATABASE IF EXISTS assignment2;
CREATE DATABASE assignment2;
USE assignment2;
CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(255) NOT NULL,
  `rent_start_date` date NOT NULL,
  `rent_end_date` date NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `mobile_number` varchar(10) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
   PRIMARY KEY (`order_id`)
);
COMMIT;


