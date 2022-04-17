-- Adminer 4.8.1 MySQL 5.5.5-10.6.7-MariaDB-1:10.6.7+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `mock-sms`;
CREATE DATABASE `mock-sms` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `mock-sms`;

DROP TABLE IF EXISTS `Message`;
CREATE TABLE `Message` (
  `MessageId` int(11) NOT NULL AUTO_INCREMENT,
  `NumberId` int(11) NOT NULL,
  `MessageValue` text NOT NULL,
  PRIMARY KEY (`MessageId`),
  KEY `NumberId` (`NumberId`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`NumberId`) REFERENCES `Number` (`NumberId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Number`;
CREATE TABLE `Number` (
  `NumberId` int(11) NOT NULL AUTO_INCREMENT,
  `NumberPin` varchar(5) NOT NULL,
  `NumberValue` varchar(100) NOT NULL,
  PRIMARY KEY (`NumberId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2022-04-17 13:57:51
