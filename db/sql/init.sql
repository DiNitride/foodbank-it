-- Adminer 4.8.1 MySQL 5.5.5-10.6.7-MariaDB-1:10.6.7+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `foodbank` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `foodbank`;

CREATE TABLE `contacts` (
  `address_line_one` varchar(255) NOT NULL,
  `address_line_two` varchar(255) NOT NULL,
  `address_town` varchar(255) NOT NULL,
  `address_postcode` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `referral_codes` (
  `codeId` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(25) NOT NULL,
  `assigned_name` varchar(255) NOT NULL,
  `claimed_by` int(11) DEFAULT NULL,
  `redeemed` bit(1) NOT NULL,
  PRIMARY KEY (`codeId`),
  KEY `claimed_by` (`claimed_by`),
  CONSTRAINT `referral_codes_ibfk_2` FOREIGN KEY (`claimed_by`) REFERENCES `users` (`userId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `forename` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`forename`, `surname`, `email`, `password`)
VALUES ('James', 'Bale', 'j.ptb.t.ca@gmail.com', 'password123');

INSERT INTO `contacts`
VALUES ('Flat 3, 26 Queens Street', '', 'Aberystwyth', 'SY23 1PU', '07397162256', 1);

-- 2022-03-09 10:44:48
