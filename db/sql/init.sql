-- Adminer 4.8.1 MySQL 5.5.5-10.7.3-MariaDB-1:10.7.3+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `foodbank` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `foodbank`;

CREATE TABLE `client_data` (
  `forename` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `address_line_one` varchar(255) NOT NULL,
  `address_line_two` varchar(255) NOT NULL,
  `address_line_town` varchar(255) NOT NULL,
  `address_line_postcode` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `loginId` int(10) unsigned NOT NULL,
  KEY `loginId` (`loginId`),
  CONSTRAINT `client_data_ibfk_1` FOREIGN KEY (`loginId`) REFERENCES `logins` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `logins` (
  `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2022-03-08 11:17:39