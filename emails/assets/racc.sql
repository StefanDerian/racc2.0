-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2017 at 12:29 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `racc`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `UserID` int(11) NOT NULL,
  `DisplayName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `UserName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Password` varchar(45) NOT NULL,
  `UserType` varchar(255) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`UserID`, `DisplayName`, `UserName`, `Password`, `UserType`, `Created`) VALUES
(2, 'Admin', 'admin', '202cb962ac59075b964b07152d234b70', 'MANAGER', '2017-06-23 02:23:44'),
(4, 'Micheal Moeidjiantho', 'mmoeidjiantho', '0192023a7bbd73250516f069df18b500', 'AGENT', '2017-06-23 02:23:44'),
(5, 'Cindy', 'cindy', '46f94c8de14fb36680850768ff1b7f2a', 'AGENT', '2017-06-26 01:15:33'),
(6, 'Buddy', 'Buddy', 'd41d8cd98f00b204e9800998ecf8427e', 'AGENT', '2017-07-14 01:16:46'),
(7, '', '', 'd41d8cd98f00b204e9800998ecf8427e', '', '2017-07-14 01:20:21'),
(8, '1231233242faefwef', 'asdfaa1231', '123123123', '', '2017-07-15 03:52:17'),
(9, 'Stefan', 'stefanderian', '81dc9bdb52d04dc20036dbd8313ed055', '', '2017-11-30 05:15:31'),
(10, 'Stefan', 'stefan', 'e10adc3949ba59abbe56e057f20f883e', '', '2017-11-30 05:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `LastName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `PreferName` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `DateofBirth` date NOT NULL,
  `Nationality` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Gender` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Mobile` varchar(11) NOT NULL,
  `Email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `ConsultantID` int(11) NOT NULL,
  `UserType` varchar(225) CHARACTER SET ucs2 NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`UserID`, `FirstName`, `LastName`, `PreferName`, `DateofBirth`, `Nationality`, `Gender`, `Mobile`, `Email`, `ConsultantID`, `UserType`, `Created`) VALUES
(1, 'First', 'name', '', '1999-02-02', 'Aus', 'Male', '413826038', 'awoefjw@gMAIL.COM', 2, '', '2017-06-27 09:05:07'),
(2, 'abc', 'abc', '', '2016-11-30', 'Australia', 'Female', '468638447', 'Email@email.com', 4, '', '2017-06-30 00:13:07');

-- --------------------------------------------------------

--
-- Table structure for table `clientpoint`
--

CREATE TABLE `clientpoint` (
  `pointid` int(11) NOT NULL,
  `current` int(11) NOT NULL,
  `goal` int(11) NOT NULL,
  `clientid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clientpoint`
--

INSERT INTO `clientpoint` (`pointid`, `current`, `goal`, `clientid`) VALUES
(1, 1, 0, 4),
(2, 25, 24, 4),
(3, 43, 33, 4),
(4, 40, 41, 4),
(5, 56, 57, 4),
(6, 60, 62, 4),
(7, 5, 8, 4),
(8, 8, 1, 4),
(9, 9, 88, 4),
(10, 80, 8, 4),
(11, 14, 9, 4),
(0, 343, 34, 5),
(1, 10, 5, 29),
(2, 5, 5, 29),
(3, 5, 5, 29),
(4, 5, 5, 29),
(5, 5, 5, 29),
(6, 5, 5, 29),
(7, 5, 5, 29),
(8, 5, 5, 29),
(9, 5, 5, 29),
(10, 5, 5, 29),
(11, 5, 5, 29),
(1, 4, 0, 1),
(2, 1, 0, 1),
(3, 1, 2, 1),
(4, 55, 5, 1),
(5, 5, 5, 1),
(6, 5, 5, 1),
(7, 5, 5, 1),
(8, 5, 5, 1),
(9, 5, 5, 1),
(10, 5, 5, 1),
(11, 5, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Content` text NOT NULL,
  `Time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`ID`, `UserID`, `Content`, `Time`, `writer`) VALUES
(1, 1, 'Hello, how are you', '2015-08-05 09:00:00', 0),
(2, 1, 'I\'m good, thanks', '2017-06-06 06:00:00', 0),
(3, 0, 'hellp', '2017-07-17 04:02:00', 0),
(4, 8, 'Hellp', '2017-07-17 21:19:00', 0),
(5, 8, 'how are you', '2017-07-16 00:34:00', 0),
(6, 1, 'GREAT', '2017-06-22 06:00:00', 0),
(7, 7, 'TEST', '2017-06-28 00:54:00', 0),
(8, 7, 'TEST2', '2017-07-01 14:07:00', 0),
(9, 29, 'czczczc', '0000-00-00 00:00:00', 2),
(10, 29, 'dfdfdf', '2017-12-07 14:55:51', 2),
(12, 29, 'vxvvxvxv', '2017-12-07 15:02:55', 2),
(13, 29, 'dsdsdsd', '2017-12-07 15:08:54', 2),
(14, 4, 'rererer', '2017-12-12 10:11:20', 2),
(15, 29, 'date:  \r\ncontent:\r\n', '2017-12-12 11:08:58', 2),
(16, 29, 'date:  \r\ncontent:\r\n', '2017-12-12 11:09:13', 2),
(17, 4, '676777777777777777767', '2017-12-12 11:20:15', 2),
(18, 4, 'no contact', '2017-12-12 11:20:22', 2),
(20, 29, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', '2017-12-12 15:20:56', 2),
(21, 4, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', '2017-12-12 15:22:44', 2),
(22, 29, 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss\r\nssssssssssss', '2017-12-12 15:29:33', 2),
(23, 29, 'I am Iron Man I am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron \r\nManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am \r\nIron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI \r\nam Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron \r\nManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am \r\nIron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI \r\nam Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron ManI am Iron \r\nManI am Iron Man', '2017-12-12 15:29:56', 2),
(24, 33, 'sasasas', '2017-12-13 17:51:19', 2),
(25, 1, 'hahahahah', '2017-12-15 02:18:58', 2);

-- --------------------------------------------------------

--
-- Table structure for table `pointtype`
--

CREATE TABLE `pointtype` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `formname` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pointtype`
--

INSERT INTO `pointtype` (`id`, `name`, `note`, `formname`) VALUES
(1, 'Age', '25-32 = 30 points;<br/>18-24 / 33-39 = 25 points;<br/>40-44 = 15 points', 'Age'),
(2, 'English language (IELTS / PTE / OET / TOBBLiBT / CAE)', 'IELTS 6 / PTE 50 = 0 points;<br/>IELTS 7 / PTE 65 = 10 points;<br/>IELTS 8 / PTE 65 = 20 points', 'English'),
(3, 'Work experience', 'Australia: 1 year = 5 points;<br/>Overseas: 3 years = 5 points', 'Work'),
(4, 'Qualification', 'Trade / Diploma = 10 points;<br/>Bachelor / Master = 15 points;<br/>PHD = 20 points', 'qua'),
(5, '2 Years full time study in Australia', '5 points', 'study'),
(6, 'NAATI', '5 points', 'naati'),
(7, 'Partner skills', '', 'partner'),
(8, 'Professional Year (Accounting / IT / Engineering)', '5 points', 'py'),
(9, 'State government sponsorship', '5 points', 'state'),
(10, 'Family sponsorship / regional Australia or Territory sponsorship', '10 points', 'family'),
(11, 'Study 2 years in Regional area', '5 points', 'area');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `LastName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `PreferName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `DateofBirth` date NOT NULL,
  `Nationality` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Gender` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Mobile` varchar(45) NOT NULL,
  `Email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `ConsultantID` int(11) NOT NULL,
  `UserType` varchar(255) NOT NULL,
  `Course` varchar(255) CHARACTER SET latin1 NOT NULL,
  `Uni` varchar(255) CHARACTER SET latin1 NOT NULL,
  `Uni_compl` date NOT NULL,
  `Visa` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Vexpiry` date NOT NULL,
  `Passport` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Pexpiry` date NOT NULL,
  `CurrentAddress` varchar(255) CHARACTER SET latin1 NOT NULL,
  `Csuburb` varchar(255) NOT NULL,
  `Cpostcode` varchar(45) NOT NULL,
  `Cstate` varchar(255) NOT NULL,
  `Ccountry` varchar(255) NOT NULL,
  `HomeAddress` varchar(255) CHARACTER SET latin1 NOT NULL,
  `Hcity` varchar(255) NOT NULL,
  `Hstate` varchar(255) NOT NULL,
  `Hcountry` varchar(255) NOT NULL,
  `Hpostcode` varchar(45) NOT NULL,
  `CurrentPointTest` int(11) NOT NULL,
  `GoalPointTest` int(11) NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `CurrentStatus` varchar(255) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastContacted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `FirstName`, `LastName`, `PreferName`, `DateofBirth`, `Nationality`, `Gender`, `Mobile`, `Email`, `ConsultantID`, `UserType`, `Course`, `Uni`, `Uni_compl`, `Visa`, `Vexpiry`, `Passport`, `Pexpiry`, `CurrentAddress`, `Csuburb`, `Cpostcode`, `Cstate`, `Ccountry`, `HomeAddress`, `Hcity`, `Hstate`, `Hcountry`, `Hpostcode`, `CurrentPointTest`, `GoalPointTest`, `Comment`, `CurrentStatus`, `Created`, `lastContacted`) VALUES
(1, 'Buddy', 'Siu', 'uit', '2017-01-02', 'Australia', 'Male', '123123123', 'email@gmail.com', 6, '', 'MBIS', '', '2017-11-16', '', '0000-00-00', '', '0000-00-00', '', '', '0', '', '', '', '', '', '', '0', 0, 0, '', 'contacted', '2017-06-23 00:52:17', '0000-00-00'),
(4, 'cindy', 'Huo', 'Cindy', '0000-00-00', 'Australia', '', 'a', 'cindy@gmail.com', 2, '', 'BICT', '', '2018-06-07', '', '2017-10-06', '', '0000-00-00', '', '', '0', '', '', '', '', '', '', '0', 2, 2, '', '', '2017-06-24 04:00:41', '2017-12-11'),
(5, 'abc', 'cba', '', '2017-07-10', 'Australia', '', '123123123', 'abc@gmail.com', 5, '', '', '', '0000-00-00', '', '2018-02-01', '', '2018-09-01', '', '', '0', '', '', '', '', '', '', '0', 0, 0, '', '', '2017-06-24 04:08:49', '0000-00-00'),
(7, 'Buddy', 'Siu', '', '2017-01-02', 'Australia', '', '123123123', 'email@gmail.com', 2, '', '', '', '2017-11-16', '', '0000-00-00', '', '2018-08-13', '', '', '0', '', '', '', '', '', '', '0', 0, 0, '', 'contacted', '2017-06-23 00:52:17', '2017-12-11'),
(8, 'asdf', '', '', '0000-00-00', 'Australia', '', '', '', 2, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-06-23 00:52:17', '2017-12-11'),
(9, 'Cindy', 'Huo', 'Cindy', '2017-07-17', 'Australia', 'Female', '0416638250', 'cindy.huo0@gmail.com', 2, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-07-15 04:39:37', '2017-12-11'),
(10, 'erer', 'erere', '', '2017-12-06', 'erer', '', 'erer', '', 0, '', 'MBIS', 'Monash', '2017-12-14', '', '0000-00-00', '', '0000-00-00', 'qwqwq', '', '', '', '', 'QWQWQW', '', '', '', '', 0, 0, '', '', '2017-12-05 06:14:06', '0000-00-00'),
(11, 'ttt', 'ttt', 'tt', '2017-12-12', 'tttt', '', '8746465465464', 'yu@yahoo.com', 0, '', 'sasa', 'Monash', '2017-12-07', '', '0000-00-00', '', '0000-00-00', 'sasas', '', '', '', '', 'tuk', '', '', '', '', 0, 0, '', '', '2017-12-05 06:16:44', '0000-00-00'),
(12, 'SAS', 'Sas', 'ss', '2017-12-06', 'SsS', '', '09453535353', 'DA@YAHOO.COM', 0, '', 'sasa', 'SAS', '2017-12-08', '', '0000-00-00', '', '0000-00-00', 'sasas', '', '', '', '', 'sasasasasasasa', '', '', '', '', 0, 0, '', '', '2017-12-05 06:21:22', '0000-00-00'),
(13, 'rrrr', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-05 13:18:40', '0000-00-00'),
(14, 'rtrtr', 'trtrt', 'rtrtrt', '2017-12-07', 'Indada', 'Male', '089565656565', 'tploek@gmail.com', 5, '', 'MBIS', 'monash', '2017-12-14', '', '0000-00-00', '', '0000-00-00', '6768 North Road Clayton', '', '', '', '', 'yuiajrajr', '', '', '', '', 0, 0, '', '', '2017-12-05 13:51:51', '0000-00-00'),
(15, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-05 23:15:39', '0000-00-00'),
(16, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-05 23:37:39', '0000-00-00'),
(17, 'adad', 'dada', 'ddadad', '2017-12-06', 'dadad', 'Male', 'dadad', 'a@yahoo.com', 5, '', 'MBIS', 'Monash', '2017-12-07', '', '0000-00-00', '', '0000-00-00', 'North Road', '', '', '', '', 'Yogyakarta', '', '', '', '', 0, 0, '', '', '2017-12-05 23:42:03', '0000-00-00'),
(18, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-05 23:54:52', '0000-00-00'),
(19, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-05 23:56:25', '0000-00-00'),
(20, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-06 00:11:21', '0000-00-00'),
(21, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-06 00:59:42', '0000-00-00'),
(22, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-06 01:04:03', '0000-00-00'),
(23, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-06 01:13:41', '0000-00-00'),
(24, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', 'not even in progress', '2017-12-06 01:48:59', '0000-00-00'),
(25, 'yu', 'ffdfdf', 'fdfdfdf', '2017-12-15', 'Indonesia', 'Male', '09453535353', 'tploek@gmail.com', 6, '', 'MBIS', 'Monash', '2017-12-15', '', '0000-00-00', '', '0000-00-00', 'North Road', '', '', '', '', 'Ketandan', '', '', '', '', 0, 0, '', 'not even in progress', '2017-12-06 02:01:45', '0000-00-00'),
(26, '', '', '', '0000-00-00', '', '', '', '', 0, '', '', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2017-12-06 02:02:22', '0000-00-00'),
(27, 'dsssd', 'sdsdsd', 'dsdsd', '2017-12-15', 'Indonesia', 'Male', '0086886868', 'tploek@gmail.com', 6, '', 'MBIS', 'Monash', '2017-12-28', 'Student', '2017-12-07', 'B8349343', '2018-02-28', 'South Road', '', '', '', '', 'Yogyakarta', '', '', '', '', 0, 0, '', 'successfull', '2017-12-06 02:29:06', '0000-00-00'),
(28, 'dsdsd', 'sdddsds', 'Har', '2017-12-14', 'Indonesia', 'Male', '09453535353', 'sa@yahoo.com', 5, '', 'asa', 'SASas', '2017-12-29', 'Student', '2017-12-29', 'B567895', '2017-12-21', 'North Road', '', '', '', '', 'Ketandan', '', '', '', '', 0, 0, '', 'cancelled/failed', '2017-12-06 03:18:51', '0000-00-00'),
(29, 'aaaaaa', 'turat', 'Har', '2017-12-14', 'Indonesia', 'Male', '09453535353', 'sa@yahoo.com', 2, '', 'asa', 'SASas', '2017-12-29', 'Student', '2017-12-29', 'B56789322', '2017-12-12', 'North Road', '', '', '', '', 'Keta', '', '', '', '', 0, 0, '', 'cancelled/failed', '2017-12-06 03:20:17', '2017-12-13'),
(30, 'aaaaaa', 'turat', 'Har', '2017-12-14', 'Indonesia', 'Male', '09453535353', 'sa@yahoo.com', 5, '', 'asa', 'SASas', '2017-12-29', 'Student', '2017-12-29', 'B567895', '2017-12-14', 'North Road', '', '', '', '', 'Ketandan', '', '', '', '', 0, 0, '', 'cancelled/failed', '2017-12-06 03:20:45', '0000-00-00'),
(31, 'sdsds', 'dssds', 'dddd', '2017-12-13', 'aasas', 'Female', 'sasasa', 'sa@yahoo.com', 5, '', 'Gor', 'Queensland', '2017-12-15', 'Student', '2017-12-28', 'r573535353', '2017-12-28', 'North Road', '', '', '', '', 'Ketandan', '', '', '', '', 0, 0, '', 'on progress', '2017-12-06 03:50:36', '0000-00-00'),
(32, 'DADAD', 'DADAD', 'tEPLOL', '2017-12-19', 'Indonesia', 'Male', '0478322424', 'ruka@yahoo.com', 4, '', 'MBIS', 'Monash', '2017-12-20', '', '0000-00-00', '', '0000-00-00', 'North Road', '', '', '', '', 'Ketandan', '', '', '', '', 0, 0, '', 'not even in progress', '2017-12-06 04:01:12', '0000-00-00'),
(33, 'dsdsds', 'dsds', 'dsds', '2017-12-07', 'sddsd', 'Male', '656565656', 'ttttt@YAHOO.COM', 2, '', 'MIT', 'ffff', '2017-12-20', '', '0000-00-00', '', '0000-00-00', 'yui', '', '', '', '', 'ttt', '', '', '', '', 0, 0, '', 'not even in progress', '2017-12-09 14:43:22', '2017-12-11'),
(34, 'aret', 'fsdfsdf', 'fsfsfsf', '2017-12-01', 'Indada', 'Male', '6767676767', 'raccmedia01@gmail.com', 2, '', 'MIT', 'monash', '2017-12-05', 'Student', '2017-11-30', 'FFDFDFDFDF', '2017-12-18', 'fffff', '', '', '', '', 'sdsdsdsd', '', '', '', '', 0, 0, '', 'successfull', '2017-12-09 14:44:45', '2017-12-11'),
(35, 'fdfdfdf', 'dfdfdf', 'dfdfdfdf', '2017-12-07', 'uiuyuyu', 'Male', '0978686767', 'eer@yahoo.com', 2, '', 'MIT', 'Monash', '2017-11-27', 'Student', '2017-11-28', 'ERERERER', '2017-12-12', 'SSSS', '', '', '', '', 'sdsdsdsd', '', '', '', '', 0, 0, '', 'not even in progress', '2017-12-09 14:46:51', '2017-12-11'),
(36, 'sasasas', 'assasa', '', '2017-12-15', 'sasasas', 'Male', '12123232313', 'ruka@yahoo.com', 5, '', 'tuyrtr', 'moka', '2017-12-16', '', '0000-00-00', '', '0000-00-00', 'geelong', '', '', '', '', 'grogol', '', '', '', '', 0, 0, '', 'new client', '2017-12-13 06:25:07', '0000-00-00'),
(37, 'sddsd', 'sdsdsd', '', '2017-12-06', 'sdsdsd', 'Male', '888888888', 'yu@yahoo.com', 0, '', 'etettet', 'tetett', '2017-12-16', 'Student', '2017-12-07', 'B8349343', '2017-12-26', 'fdfdfdf', '', '', '', '', 'retetetet', '', '', '', '', 0, 0, '', 'on progress', '2017-12-13 06:26:40', '0000-00-00'),
(38, 'dsdsdsd', 'sdsds', '', '2017-12-21', 'ddsdsd', 'Male', '086767868', 'roror@yahoo.com', 0, '', 'dsdsd', 'sddsdsdsd', '2017-12-12', 'Student', '2017-12-21', 'B8349343', '2017-12-28', 'sdsdsd', '', '', '', '', 'sdsd', '', '', '', '', 0, 0, '', 'successfull', '2017-12-13 06:31:11', '0000-00-00'),
(39, 'dsdsdsd', 'sdsds', '', '2017-12-21', 'ddsdsd', 'Female', '086767868', 'roror@yahoo.com', 2, '', 'dsdsd', 'sddsdsdsd', '2017-12-12', 'Student', '2017-12-21', 'B8349343', '2017-12-28', 'sdsdsd', '', '', '', '', 'sdsd', '', '', '', '', 0, 0, '', 'successfull', '2017-12-13 06:32:51', '0000-00-00'),
(40, 'dsdsdsd', 'sdsds', '', '2017-12-21', 'ddsdsd', 'Female', '086767868', 'roror@yahoo.com', 2, '', 'dsdsd', 'sddsdsdsd', '2017-12-12', 'Student', '2017-12-21', 'B8349343', '2017-12-28', 'sdsdsd', '', '', '', '', 'sdsd', '', '', '', '', 0, 0, '', 'successfull', '2017-12-13 06:35:05', '0000-00-00'),
(41, 'dsdsdsd', 'sdsds', '', '2017-12-21', 'ddsdsd', 'Female', '086767868', 'roror@yahoo.com', 2, '', 'dsdsd', 'sddsdsdsd', '2017-12-12', 'Student', '2017-12-21', 'B8349343', '2017-12-28', 'sdsdsd', '', '', '', '', 'sdsd', '', '', '', '', 0, 0, '', 'successfull', '2017-12-13 06:38:47', '0000-00-00'),
(42, 'retetdsdsd', 'yuki', '', '2017-12-09', 'sasasas', 'Male', 'ASASAS', 'ruka@yahoo.com', 4, '', 'adadad', 'adad', '2017-12-29', 'Student', '2017-12-29', 'B8349343', '2017-12-29', 'Springvile', '', '', '', '', 'tuk', '', '', '', '', 0, 0, '', 'not even in progress', '2017-12-14 15:03:52', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE `useraccount` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `LastName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `PreferName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `DateofBirth` date NOT NULL,
  `Nationality` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Gender` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Mobile` int(11) NOT NULL,
  `Email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Who` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`UserID`, `FirstName`, `LastName`, `PreferName`, `DateofBirth`, `Nationality`, `Gender`, `Mobile`, `Email`, `Who`, `Created`) VALUES
(1, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-20 07:43:35'),
(2, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-20 07:45:03'),
(3, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-20 07:46:20'),
(4, 'Buddy', 'Siu', 'BuddyPreferred', '1995-08-04', 'Australian', 'Male', 413826038, 'bsiu26@gmail.com', 'Cindy', '2017-06-20 07:47:02'),
(5, 'Buddy', 'Siu', 'BuddyPreferred', '1995-08-04', 'Australian', 'Male', 413826038, 'bsiu26@gmail.com', 'Cindy', '2017-06-20 07:47:43'),
(6, 'Buddy', 'Siu', 'BuddyPreferred', '1995-08-04', 'Australian', 'Male', 413826038, 'bsiu26@gmail.com', 'Cindy', '2017-06-20 07:48:40'),
(7, 'Buddy', 'Siu', 'BuddyPreferred', '1995-08-04', 'Australian', 'Male', 413826038, 'bsiu26@gmail.com', 'Cindy', '2017-06-21 01:31:36'),
(8, 'Buddy', 'Siu', 'BuddyPreferred', '1995-08-04', 'Australian', 'Male', 413826038, 'bsiu26@gmail.com', 'Cindy', '2017-06-21 01:38:51'),
(9, 'First', 'Last', 'Prefer', '0000-00-00', 'nationality', 'Male', 3656, 'Email@email.com', 'Who', '2017-06-21 01:39:19'),
(10, 'First', 'Last', 'Prefer', '1998-07-05', 'nationality', 'Male', 12345678, 'Email@email.com', 'Who', '2017-06-21 01:48:24'),
(11, 'First', 'Last', 'Prefer', '1998-07-05', 'nationality', 'Male', 12345678, 'Email@email.com', 'Who', '2017-06-21 01:48:48'),
(12, 'First', 'Last', 'Prefer', '1998-07-05', 'nationality', 'Male', 12345678, 'Email@email.com', 'Who', '2017-06-21 02:17:00'),
(13, 'First', 'Last', 'Prefer', '1998-07-05', 'nationality', 'Male', 12345678, 'Email@email.com', 'Who', '2017-06-21 02:31:13'),
(14, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 02:31:15'),
(15, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 02:33:04'),
(16, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 06:28:31'),
(17, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 06:29:22'),
(18, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 06:31:20'),
(19, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 06:32:13'),
(20, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 06:32:20'),
(21, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 06:34:46'),
(22, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-21 08:31:04'),
(23, 'C', 'test', '', '0000-00-00', 'china', '', 142323, 'Email@email.com', '', '2017-06-22 08:24:04'),
(24, 'C', 'test', '', '0000-00-00', 'china', '', 142323, 'Email@email.com', '', '2017-06-22 08:24:59'),
(25, 'C', 'test', '', '0000-00-00', 'china', '', 142323, 'Email@email.com', '', '2017-06-22 08:38:27'),
(26, 'C', 'test', 'cindy', '0000-00-00', 'china', '', 142323, 'Email@email.com', '', '2017-06-22 09:01:12'),
(27, 'C', 'test', 'cindy', '0000-00-00', 'china', '', 142323, 'Email@email.com', '', '2017-06-22 09:01:19'),
(28, 'C', 'test', 'cindy', '0000-00-00', 'china', '', 142323, 'Email@email.com', 'michael', '2017-06-22 09:02:31'),
(29, 'C', 'test', 'cindy', '1998-03-12', 'china', 'Female', 142323, 'Email@email.com', 'michael', '2017-06-22 09:03:36'),
(30, 'C', 'test', 'cindy', '1998-03-12', 'china', 'Female', 142323, 'Email@email.com', 'michael', '2017-06-22 09:06:23'),
(31, 'C', 'test', 'cindy', '1998-03-12', 'china', 'Female', 142323, 'Email@email.com', 'michael', '2017-06-22 09:08:57'),
(32, 'C', 'test', 'cindy', '1998-03-12', 'china', 'Female', 142323, 'Email@email.com', 'michael', '2017-06-22 09:13:01'),
(33, 'C', 'test', 'cindy', '1998-03-12', 'china', '', 142323, 'Email@email.com', 'none', '2017-06-22 09:13:05'),
(34, 'C', 'test', 'cindy', '1998-03-12', 'china', '', 142323, 'Email@email.com', 'none', '2017-06-22 11:17:15'),
(35, 'C', '', 'cindy', '1998-03-12', 'china', '', 142323, 'Email@email.com', 'none', '2017-06-22 11:18:13'),
(36, 'C', '', 'cindy', '1998-03-12', 'china', '', 142323, 'Email@email.com', 'none', '2017-06-22 11:19:17'),
(37, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-22 11:19:21'),
(38, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-22 11:19:43'),
(39, 'Cindu', 'Huo', '', '1876-05-04', 'China', '', 1234534, 'Email@email.com', 'michael', '2017-06-22 11:20:18'),
(40, 'Cindu', 'Huo', '', '1876-05-04', 'China', 'Female', 1234534, 'Email@email.com', 'michael', '2017-06-22 11:20:51'),
(41, 'Cindu', 'Huo', '', '1876-05-04', 'China', 'Female', 1234534, 'Email@email.com', 'michael', '2017-06-23 00:04:19'),
(42, 'Cindu', 'Huo', '', '1876-05-04', 'China', 'Female', 1234534, 'Email@email.com', 'michael', '2017-06-23 00:04:50'),
(43, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:04:53'),
(44, 'qwe', 'qwe', 'qwe', '1212-12-12', 'qwe', 'Male', 123, 'qwe@qwe', 'none', '2017-06-23 00:05:37'),
(45, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:06:12'),
(46, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:08:09'),
(47, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:11:33'),
(48, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:11:56'),
(49, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:12:15'),
(50, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:15:33'),
(51, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:15:45'),
(52, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:16:02'),
(53, 'qwe', 'qwe', '', '1212-01-01', 'qwe', 'Male', 123, '123qwe@qwe', 'none', '2017-06-23 00:18:21'),
(54, 'qwe', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:18:26'),
(55, 'qwe', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:19:12'),
(56, 'qwe', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:19:17'),
(57, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:19:58'),
(58, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:20:02'),
(59, 'Cindy', 'Huo', '', '1212-12-12', 'China', 'Female', 123123123, '123@qwe.com', 'michael', '2017-06-23 00:37:30'),
(60, 'Buddy', 'Huo', 'Cindy', '2011-12-30', 'Australia', 'Female', 0, '', 'none', '2017-06-23 00:38:06'),
(61, 'qwe', 'Huo', 'Cindy', '2016-11-30', 'Australia', 'Female', 3343, 'Email@email.com', 'michael', '2017-06-23 00:38:45'),
(62, 'qwe', 'Huo', 'Cindy', '2016-11-30', 'Australia', 'Female', 3343, 'Email@email.com', 'michael', '2017-06-23 00:40:20'),
(63, 'mko', 'mko', '', '0909-09-09', 'mko', 'Male', 123, 'mko@email.com', 'angela', '2017-06-23 00:40:51'),
(64, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-23 00:42:32'),
(65, 'mko', 'mko', '', '0909-09-09', 'mko', 'Male', 123, 'mko@email.com', 'angela', '2017-06-23 00:43:45'),
(66, '', '', '', '0000-00-00', '', '', 0, '', 'none', '2017-06-23 00:43:47'),
(67, 'qwe', 'Huo', 'Cindy', '2013-11-30', 'Australia', 'Female', 4233, 'Email@email.com', 'michael', '2017-06-23 00:44:13'),
(68, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-06-23 02:28:53'),
(69, 'qwe', 'Huo', '', '0000-00-00', '', '', 0, '', '', '2017-06-23 02:29:10'),
(70, 'qwe', 'Huo', 'Cindy', '2015-12-31', 'Australia', 'Female', 5242646, 'Email@email.com', 'Cindy', '2017-06-23 02:29:35'),
(71, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-07-14 01:20:45'),
(72, '', '', '', '0000-00-00', '', '', 0, '', '', '2017-07-14 01:21:14'),
(73, 'h', '', '', '0000-00-00', '', '', 0, '', '', '2017-07-14 01:21:54'),
(74, 'eee', 'eee', 'ee', '2017-12-04', 'eeee', 'Male', 2147483647, 'tploek@gmail.com', 'ganteng', '2017-12-01 02:56:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `pointtype`
--
ALTER TABLE `pointtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `pointtype`
--
ALTER TABLE `pointtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `useraccount`
--
ALTER TABLE `useraccount`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
