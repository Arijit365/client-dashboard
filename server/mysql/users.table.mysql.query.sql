-- mysql query for create users table

CREATE TABLE `test`.`users` (`id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NULL , `mobile` BIGINT(20) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `advanced_password` TEXT NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;
