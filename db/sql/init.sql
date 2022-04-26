-- Adminer 4.8.1 MySQL 5.5.5-10.6.7-MariaDB-1:10.6.7+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `foodbank`;
CREATE DATABASE `foodbank` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `foodbank`;

CREATE TABLE `User` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserForename` varchar(255) NOT NULL,
  `UserSurname` varchar(255) NOT NULL,
  `UserUsername` varchar(255) UNIQUE NOT NULL,
  `UserPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Client` (
  `ClientId` int(11) NOT NULL,
  `ClientAddressLineOne` varchar(255) NOT NULL,
  `ClientAddressLineTwo` varchar(255) NOT NULL,
  `ClientAddressTown` varchar(255) NOT NULL,
  `ClientAddressPostcode` varchar(255) NOT NULL,
  `ClientPhone` varchar(255) NOT NULL,
  `ClientEmail` varchar(255) NOT NULL,
  PRIMARY KEY (`ClientId`),
  CONSTRAINT FOREIGN KEY (`ClientId`) REFERENCES `User` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Staff` (
  `StaffId` int(11) NOT NULL,
  `Admin` tinyint NOT NULL,
  PRIMARY KEY (`StaffID`),
  CONSTRAINT FOREIGN KEY (`StaffId`) REFERENCES `User` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ReferralCode` (
  `CodeId` int(11) NOT NULL AUTO_INCREMENT,
  `Code` varchar(25) NOT NULL,
  `AssignedName` varchar(255) NOT NULL,
  `ClaimedBy` int(11) DEFAULT NULL,
  `Redeemed` tinyint(1) NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  PRIMARY KEY (`CodeId`),
  KEY `ClaimedBy` (`ClaimedBy`),
  KEY `CreatedBy` (`CreatedBy`),
  CONSTRAINT FOREIGN KEY (`ClaimedBy`) REFERENCES `User` (`UserId`) ON DELETE SET NULL,
  CONSTRAINT FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Organisation` (
  `OrganisationId` int(11) NOT NULL AUTO_INCREMENT,
  `OrganisationName` varchar(255) NOT NULL,
  `OrganisationAddressLineOne` varchar(255) NOT NULL,
  `OrganisationAddressLineTwo` varchar(255) NOT NULL,
  `OrganisationAddressTown` varchar(255) NOT NULL,
  `OrganisationAddressPostcode` varchar(255) NOT NULL,
  `OrganisationDescription` text NOT NULL,
  `OrganisationApproved` tinyint NOT NULL,
  `OrganisationManagerId` int(11),
  `OrganisationType` enum('supplier','support') NOT NULL,
  `OrganisationApplicantForename` varchar(255) NOT NULL,
  `OrganisationApplicantSurname` varchar(255) NOT NULL,
  `OrganisationContactEmail` varchar(255) NOT NULL,
  `OrganisationContactPhone` varchar(255) NOT NULL,
  PRIMARY KEY (`OrganisationId`),
  FOREIGN KEY (`OrganisationManagerId`) REFERENCES `User` (`UserId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `OrganisationStaff` (
  `StaffId` int(11) NOT NULL,
  `OrganisationId` int(11) NOT NULL,
  CONSTRAINT FOREIGN KEY (`StaffId`) REFERENCES `User` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT FOREIGN KEY (`OrganisationId`) REFERENCES `Organisation` (`OrganisationId`) ON DELETE CASCADE,
  PRIMARY KEY (`StaffId`, `OrganisationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `OrganisationDonation` (
  `DonationId` int(11) NOT NULL AUTO_INCREMENT,
  `OrganisationId` int(11) NOT NULL,
  `StaffId` int(11) NOT NULL,
  `DonationText` text NOT NULL,
  `DonationReviewed` tinyint(4) NOT NULL DEFAULT 0,
  `DonationRecieved` datetime NOT NULL,
  PRIMARY KEY (`DonationId`),
  KEY `OrganisationId` (`OrganisationId`),
  KEY `StaffId` (`StaffId`),
  CONSTRAINT `organisationdonation_ibfk_1` FOREIGN KEY (`OrganisationId`) REFERENCES `Organisation` (`OrganisationId`),
  CONSTRAINT `organisationdonation_ibfk_3` FOREIGN KEY (`StaffId`) REFERENCES `OrganisationStaff` (`StaffId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `CashTransaction` (
  `TransactionId` int(11) NOT NULL AUTO_INCREMENT,
  `TransactionFrom` int(11),
  `TransactionValue` decimal(15, 2) NOT NULL,
  `TransactionDateTime` datetime,
  `TransactionStripeRef` varchar(255),
  PRIMARY KEY (`TransactionId`),
  CONSTRAINT FOREIGN KEY (`TransactionFrom`) REFERENCES `User` (`UserId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Feedback` (
  `FeedbackId` int(11) NOT NULL AUTO_INCREMENT,
  `FeedbackText` text NOT NULL,
  `FeedbackReviewed` tinyint(4) NOT NULL,
  `FeedbackReviewedBy` int(11) DEFAULT NULL,
  `FeedbackRecieved` datetime NOT NULL,
  PRIMARY KEY (`FeedbackId`),
  KEY `FeedbackReviewedBy` (`FeedbackReviewedBy`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`FeedbackReviewedBy`) REFERENCES `Staff` (`StaffId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Order` (
  `OrderId` int(11) NOT NULL AUTO_INCREMENT,
  `OrderClient` int(11) NOT NULL,
  `OrderStatus` enum('open','ready','closed') NOT NULL,
  `OrderParcel` int(11) DEFAULT NULL,
  `OrderOpened` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `OrderClosed` datetime DEFAULT NULL,
  PRIMARY KEY (`OrderId`),
  KEY `OrderClient` (`OrderClient`),
  KEY `OrderParcel` (`OrderParcel`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`OrderClient`) REFERENCES `Client` (`ClientId`) ON DELETE CASCADE,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`OrderParcel`) REFERENCES `Parcel` (`ParcelId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Parcel` (
  `ParcelId` int(11) NOT NULL AUTO_INCREMENT,
  `ParcelComplete` tinyint NOT NULL,
  `ParcelDetails` text NOT NULL,
  PRIMARY KEY (`ParcelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ParcelItem` (
  `ParcelId` int(11) NOT NULL,
  `StockId` int(11) NOT NULL,
  CONSTRAINT FOREIGN KEY (`ParcelId`) REFERENCES `Parcel` (`ParcelId`) ON DELETE CASCADE,
  CONSTRAINT FOREIGN KEY (`StockId`) REFERENCES `Stock` (`StockId`) ON DELETE CASCADE,
  PRIMARY KEY (`ParcelId`, `StockId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Stock` (
  `StockId` int(11) NOT NULL AUTO_INCREMENT,
  `UnitId` int(11) NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL,
  `UseBy` datetime NOT NULL,
  PRIMARY KEY (`Stockid`),
  CONSTRAINT FOREIGN KEY (`UnitId`) REFERENCES `StockUnit` (`UnitId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `StockUnit` (
  `UnitId` int(11) NOT NULL AUTO_INCREMENT,
  `UnitName` varchar(255) NOT NULL,
  `UnitSize` varchar(255) NOT NULL,
  PRIMARY KEY (`UnitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create default admin user and test staff
INSERT INTO `User`
VALUES (NULL, 'Admin', 'User', 'admin', '$argon2i$v=19$m=4096,t=3,p=1$5+8s4QLjPhCKY7ObJ+aS1Q$H5aJsO4H+UnU0PXgP4hleY55pAfzS8QA85oTxfrDcPQ');
INSERT INTO `Staff` VALUES (LAST_INSERT_ID(), 1);

INSERT INTO `User`
VALUES (NULL, 'Ross', 'Smith', 'ross.smith', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');
INSERT INTO `Staff` VALUES (LAST_INSERT_ID(), 0);

-- Test clients
INSERT INTO `User`
VALUES (NULL, 'Jamie', 'Roberts', 'jamie.roberts.61', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');
INSERT INTO `Client`
VALUES (LAST_INSERT_ID(), '4 Big House', 'My Road', 'Aberystwyth', 'SY237BC', '07888222111', 'jamie.roberts@example.com');

INSERT INTO `User`
VALUES (NULL, 'Samantha', 'May', 'samantha.may.23', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');
INSERT INTO `Client`
VALUES (LAST_INSERT_ID(), '2 Street', 'Fferm Penglais', 'Aberystwyth', 'SY235DF', '07111222333', 'sam.may@example.com');

INSERT INTO `User`
VALUES (NULL, 'Alex', 'Milan', 'alex.milan.51', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');
INSERT INTO `Client`
VALUES (LAST_INSERT_ID(), '76 Road', 'Fferm Penglais', 'Aberystwyth', 'SY23A42', '07666555444', 'alex.milan@example.com');


-- Supplier Org
INSERT INTO `User`
VALUES (NULL, 'John', 'Doe', 'john.doe.65', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');

INSERT INTO `Organisation`
VALUES (
  NULL,
  'Store Name',
  'Store Building',
  'Store Street',
  'Aberystwyth',
  'SY238PQ',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet justo vitae turpis mattis suscipit. Pellentesque vehicula, ante sit amet elementum sodales, erat urna imperdiet orci, ut efficitur odio tellus ac lorem. Sed in erat vulputate, dapibus sapien at, finibus orci. Nulla dapibus non nunc quis vehicula. Phasellus maximus maximus est non eleifend. Curabitur tortor arcu, consectetur nec finibus at, blandit nec nisi. Duis interdum sodales augue id rutrum. Curabitur fermentum sapien in turpis aliquam, et aliquet purus euismod. Curabitur consectetur urna sit amet tincidunt sollicitudin. Cras faucibus lacinia ante. Curabitur sed neque magna. Praesent mollis tristique augue, eu fermentum magna ultrices eu. Donec mollis odio magna, vel maximus ligula laoreet sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis turpis risus, sed aliquet lorem imperdiet pulvinar. ',
  1,
  LAST_INSERT_ID(),
  'supplier',
  'Manager',
  'Store',
  'manager@store.com',
  '07999333222'
);

INSERT INTO `User`
VALUES (NULL, 'Gary', 'Brown', 'gary.brown.12', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');

INSERT INTO `OrganisationStaff`
VALUES (6, 1);

INSERT INTO `OrganisationStaff`
VALUES (7, 1);

-- Support Org
INSERT INTO `User`
VALUES (NULL, 'Richard', 'Michaels', 'richard.michaels.61', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');

INSERT INTO `Organisation`
VALUES (
  NULL,
  'Social Services',
  'Council Building',
  'Council Street',
  'Aberystwyth',
  'SY238PU',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu posuere nulla, eget sodales nibh. Aliquam erat volutpat. Sed scelerisque neque felis, a congue metus facilisis a. Suspendisse eu molestie ex. Duis iaculis, sem et tincidunt facilisis, leo quam consequat elit, scelerisque posuere nisi ante ac lacus. Aliquam sit amet massa nulla. Maecenas imperdiet sagittis lectus, sit amet sollicitudin lacus. Donec imperdiet dui at molestie iaculis. ',
  1,
  LAST_INSERT_ID(),
  'support',
  'Richard',
  'Michaels',
  'richard@council.com',
  '07888999222'
);

INSERT INTO `User`
VALUES (NULL, 'Peter', 'Parker', 'peter.parker.17', '$argon2i$v=19$m=4096,t=3,p=1$057bmM1aVML1Vnc1ejLrvg$A+tA7M73ydxi7ueYoOIeTHKpJJYcXOgO/+prFU3FnMY');

INSERT INTO `OrganisationStaff`
VALUES (8, 2);

INSERT INTO `OrganisationStaff`
VALUES (9, 2);

INSERT INTO `StockUnit` (`UnitId`, `UnitName`, `UnitSize`) VALUES
(1,	'Bread',	'1 Loaf'),
(2,	'Milk',	'1 Pint'),
(3,	'Eggs',	'6 Eggs'),
(4,	'Chicken',	'1 Chicken'),
(5,	'Tinned Soup',	'1 Tin'),
(6,	'Tinned Baked Beans',	'1 Tin'),
(7,	'Cabbage',	'1 Cabbage'),
(8,	'Carrot',	'1 Carrot'),
(9,	'Apple',	'1 Apple'),
(10,	'Orange',	'1 Orange'),
(11,	'Banana',	'1 Banana'),
(12,	'Peas',	'1 Tin of Peas');

-- 2022-03-09 10:44:48
