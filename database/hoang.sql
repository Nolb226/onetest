-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Mar 20, 2023 at 07:48 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hoang`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `password`, `type`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, '123', 'GV', 0, '2023-03-18 15:49:49', '2023-03-18 15:49:49'),
(2, '123123', 'SV', 0, '2023-03-18 17:03:41', '2023-03-18 17:03:41'),
(8, '', 'SV', 0, '2023-03-19 06:43:50', '2023-03-19 06:43:50');

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `numberOfQuestions` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `lectureId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `name`, `numberOfQuestions`, `createdAt`, `updatedAt`, `lectureId`) VALUES
('WEBC1', 'HTML', 2, '2023-03-18 15:49:49', '2023-03-18 15:49:49', '841109');

-- --------------------------------------------------------

--
-- Table structure for table `classdetail`
--

CREATE TABLE `classdetail` (
  `studentId` varchar(10) NOT NULL,
  `classId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classdetail`
--

INSERT INTO `classdetail` (`studentId`, `classId`) VALUES
('3121560033', 'a111');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` varchar(255) NOT NULL,
  `totalStudent` int(11) DEFAULT 0,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `year` datetime NOT NULL,
  `semester` tinyint(1) NOT NULL,
  `isLock` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacherId` varchar(10) DEFAULT NULL,
  `lectureId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `totalStudent`, `name`, `password`, `year`, `semester`, `isLock`, `createdAt`, `updatedAt`, `teacherId`, `lectureId`) VALUES
('a111', 0, 'Web ứng dụng 1', '123', '1970-01-01 00:00:02', 2, 0, '2023-03-18 15:49:49', '2023-03-19 06:56:04', '10991', '841109');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `headOfDepartment` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `createdAt`, `updatedAt`, `headOfDepartment`) VALUES
('CNTT', 'Công Nghệ Thông Tin', '2023-03-18 16:50:20', '2023-03-18 16:50:20', '10991');

-- --------------------------------------------------------

--
-- Table structure for table `examresults`
--

CREATE TABLE `examresults` (
  `id` int(11) NOT NULL,
  `studentId` varchar(10) DEFAULT NULL,
  `examId` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `questionId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `examresults`
--

INSERT INTO `examresults` (`id`, `studentId`, `examId`, `createdAt`, `updatedAt`, `questionId`) VALUES
(1, '3121560033', 'EXM001', '2023-03-18 17:11:15', '2023-03-18 17:11:15', '11111');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `timeStart` datetime DEFAULT NULL,
  `timeEnd` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `totalQuestions` int(11) NOT NULL,
  `ratioQuestions` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `classId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `name`, `timeStart`, `timeEnd`, `duration`, `totalQuestions`, `ratioQuestions`, `createdAt`, `updatedAt`, `classId`) VALUES
('EXM001', 'JavaScript Basics', '2023-04-01 09:00:00', '2023-04-01 10:00:00', 60, 10, 0.5, '2023-03-18 15:49:49', '2023-03-18 15:49:49', 'a111');

-- --------------------------------------------------------

--
-- Table structure for table `functiondetail`
--

CREATE TABLE `functiondetail` (
  `permissionGroupId` int(11) NOT NULL,
  `FunctionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE `functions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `descripton` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groupdetail`
--

CREATE TABLE `groupdetail` (
  `accountId` int(11) NOT NULL,
  `permissionGroupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lecturedetail`
--

CREATE TABLE `lecturedetail` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `majorId` varchar(10) NOT NULL,
  `lectureId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecturedetail`
--

INSERT INTO `lecturedetail` (`createdAt`, `updatedAt`, `majorId`, `lectureId`) VALUES
('2023-03-18 17:07:02', '2023-03-18 17:07:02', 'DKP', '841109');

-- --------------------------------------------------------

--
-- Table structure for table `lectures`
--

CREATE TABLE `lectures` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` tinyint(1) NOT NULL,
  `totalChapters` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `headOfLecture` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lectures`
--

INSERT INTO `lectures` (`id`, `name`, `credits`, `totalChapters`, `createdAt`, `updatedAt`, `headOfLecture`) VALUES
('841109', 'Cơ sở dữ liệu', 4, 6, '2023-03-18 15:49:49', '2023-03-18 15:49:49', '10991');

-- --------------------------------------------------------

--
-- Table structure for table `majors`
--

CREATE TABLE `majors` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `departmentId` varchar(10) DEFAULT NULL,
  `headOfMajor` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `majors`
--

INSERT INTO `majors` (`id`, `name`, `createdAt`, `updatedAt`, `departmentId`, `headOfMajor`) VALUES
('DKP', 'Kỹ Thuật Phần Mềm', '2023-03-18 16:51:30', '2023-03-18 16:51:30', 'CNTT', '10991');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `classId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `permissiongroups`
--

CREATE TABLE `permissiongroups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` varchar(255) NOT NULL,
  `correctAns` varchar(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `answerA` varchar(255) NOT NULL,
  `answerB` varchar(255) NOT NULL,
  `answerC` varchar(255) NOT NULL,
  `answerD` varchar(255) NOT NULL,
  `difficulty` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chapterId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `correctAns`, `description`, `answerA`, `answerB`, `answerC`, `answerD`, `difficulty`, `createdAt`, `updatedAt`, `chapterId`) VALUES
('11111', 'A', 'HTML là gì ?', 'Ngôn ngữ đánh dấu siêu văn bản', 'Ngôn ngữ lập trình bậc thấp', 'Ngôn ngữ đánh dấu văn bản', 'Ngôn ngữ lập trình bậc cao', 'Dễ', '2023-03-18 15:49:49', '2023-03-18 15:49:49', 'WEBC1'),
('11112', 'B', 'Có bao nhiêu cách liên kết file CSS', '4', '3', '1', '2', 'Dễ', '2023-03-18 15:49:49', '2023-03-18 15:49:49', 'WEBC1');

-- --------------------------------------------------------

--
-- Table structure for table `studentresults`
--

CREATE TABLE `studentresults` (
  `studentId` varchar(10) NOT NULL,
  `examId` varchar(10) NOT NULL,
  `grade` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentresults`
--

INSERT INTO `studentresults` (`studentId`, `examId`, `grade`, `createdAt`, `updatedAt`) VALUES
('3121560033', 'EXM001', 9, '2023-03-18 15:49:49', '2023-03-18 15:49:49');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` varchar(10) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `dob` datetime NOT NULL,
  `accountId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `majorId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `fullname`, `dob`, `accountId`, `createdAt`, `updatedAt`, `majorId`) VALUES
('3121560033', 'Nguyễn Trương Khánh Hoàng', '1995-10-02 00:00:00', 2, '2023-03-18 15:49:49', '2023-03-18 15:49:49', 'DKP'),
('32312312', 'dd', '2003-02-28 17:00:00', 8, '2023-03-19 06:43:50', '2023-03-19 06:43:50', 'DKP');

-- --------------------------------------------------------

--
-- Table structure for table `teach`
--

CREATE TABLE `teach` (
  `teacherId` varchar(10) NOT NULL,
  `lectureId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teach`
--

INSERT INTO `teach` (`teacherId`, `lectureId`) VALUES
('10991', '841109');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` varchar(10) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `dob` datetime NOT NULL,
  `accountId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `departmentId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `fullname`, `dob`, `accountId`, `createdAt`, `updatedAt`, `departmentId`) VALUES
('10991', 'Nguyễn Thanh Sang', '2023-03-18 15:49:49', 1, '2023-03-18 15:49:49', '2023-03-18 15:49:49', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `lectureId` (`lectureId`);

--
-- Indexes for table `classdetail`
--
ALTER TABLE `classdetail`
  ADD PRIMARY KEY (`studentId`,`classId`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `teacherId` (`teacherId`),
  ADD KEY `lectureId` (`lectureId`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `headOfDepartment` (`headOfDepartment`);

--
-- Indexes for table `examresults`
--
ALTER TABLE `examresults`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `examResults_questionId_examId_unique` (`examId`,`questionId`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `functiondetail`
--
ALTER TABLE `functiondetail`
  ADD PRIMARY KEY (`permissionGroupId`,`FunctionId`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupdetail`
--
ALTER TABLE `groupdetail`
  ADD PRIMARY KEY (`accountId`,`permissionGroupId`);

--
-- Indexes for table `lecturedetail`
--
ALTER TABLE `lecturedetail`
  ADD PRIMARY KEY (`majorId`,`lectureId`),
  ADD KEY `lectureId` (`lectureId`);

--
-- Indexes for table `lectures`
--
ALTER TABLE `lectures`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `headOfLecture` (`headOfLecture`);

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `headOfMajor` (`headOfMajor`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `permissiongroups`
--
ALTER TABLE `permissiongroups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `chapterId` (`chapterId`);

--
-- Indexes for table `studentresults`
--
ALTER TABLE `studentresults`
  ADD PRIMARY KEY (`studentId`,`examId`),
  ADD UNIQUE KEY `studentResults_examId_studentId_unique` (`studentId`,`examId`),
  ADD KEY `examId` (`examId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `accountId` (`accountId`),
  ADD KEY `majorId` (`majorId`);

--
-- Indexes for table `teach`
--
ALTER TABLE `teach`
  ADD PRIMARY KEY (`teacherId`,`lectureId`),
  ADD KEY `lectureId` (`lectureId`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `accountId` (`accountId`),
  ADD KEY `departmentId` (`departmentId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `examresults`
--
ALTER TABLE `examresults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissiongroups`
--
ALTER TABLE `permissiongroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `classdetail`
--
ALTER TABLE `classdetail`
  ADD CONSTRAINT `classdetail_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `classdetail_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`);

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_117` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `classes_ibfk_118` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`headOfDepartment`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `examresults`
--
ALTER TABLE `examresults`
  ADD CONSTRAINT `examresults_ibfk_118` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examresults_ibfk_119` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examresults_ibfk_9` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`);

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lecturedetail`
--
ALTER TABLE `lecturedetail`
  ADD CONSTRAINT `lecturedetail_ibfk_1` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`),
  ADD CONSTRAINT `lecturedetail_ibfk_2` FOREIGN KEY (`majorId`) REFERENCES `majors` (`id`);

--
-- Constraints for table `lectures`
--
ALTER TABLE `lectures`
  ADD CONSTRAINT `lectures_ibfk_1` FOREIGN KEY (`headOfLecture`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `majors`
--
ALTER TABLE `majors`
  ADD CONSTRAINT `majors_ibfk_111` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `majors_ibfk_112` FOREIGN KEY (`headOfMajor`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`chapterId`) REFERENCES `chapters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `studentresults`
--
ALTER TABLE `studentresults`
  ADD CONSTRAINT `studentresults_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `studentresults_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_111` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_112` FOREIGN KEY (`majorId`) REFERENCES `majors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `teach`
--
ALTER TABLE `teach`
  ADD CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`),
  ADD CONSTRAINT `teach_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_117` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teachers_ibfk_118` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
