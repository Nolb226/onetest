-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: dy0jhdljqz4f0tqo
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `permissiongroupId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permissiongroupId` (`permissiongroupId`),
  CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`permissiongroupId`) REFERENCES `permissiongroups` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (0,'admin','superadmin',1,'2023-03-26 16:55:28','2023-03-26 16:55:28',NULL),(1,'$2a$10$SJ3qzAXATPiZObNLhVgWreMmyah5MbV/e0C8OAzgkP3hfKh93h4EG','GV',1,'2023-03-18 15:49:49','2023-03-18 15:49:49',NULL),(3,'1','SV',1,'2023-03-27 03:53:55','2023-03-27 03:53:55',NULL),(4,'$2a$10$OwL79QTw8pnjG','GV',0,'2023-03-27 08:42:41','2023-03-27 08:42:41',NULL),(5,'$2a$10$.23l.2fAVbj3/','SV',0,'2023-03-27 08:44:28','2023-03-27 08:44:28',NULL),(6,'$2a$10$3tQkjeX2pcL5F','SV',0,'2023-03-27 09:14:23','2023-03-27 09:14:23',NULL),(7,'$2a$10$ySDshCx0HgXI0','SV',0,'2023-03-27 15:56:03','2023-03-27 15:56:03',NULL),(8,'$2a$10$u2m7Si49IEGcE','SV',0,'2023-03-27 16:03:54','2023-03-27 16:03:54',NULL),(9,'$2a$10$HmFaHl.9STH87','SV',0,'2023-03-27 16:11:03','2023-03-27 16:11:03',NULL),(10,'$2a$10$eE5r6BXNHx/Uh','SV',0,'2023-03-27 16:14:46','2023-03-27 16:14:46',NULL),(11,'$2a$10$PBqWQyeSq/AG3','SV',0,'2023-03-27 16:15:39','2023-03-27 16:15:39',NULL),(12,'$2a$10$D3/3HMP83S7wF','SV',0,'2023-03-27 16:17:42','2023-03-27 16:17:42',NULL),(13,'$2a$10$D4CSkf0zBI8TA','SV',0,'2023-03-27 16:18:53','2023-03-27 16:18:53',NULL),(14,'$2a$10$NPcwnYHwj9eLscRm3BXSouxS7aEVxIjm.DTouHg9D3uKFqaUo3dC2','SV',0,'2023-03-27 16:45:06','2023-03-27 16:45:06',NULL),(15,'$2a$10$typAhmTO51CP/NUVbihtKuEQ0zPCBPnI/TwXqBFGtA83E/AGrqeiC','SV',0,'2023-03-28 07:52:57','2023-03-28 07:52:57',NULL),(16,'$2a$10$040x42NmIWw5nsFvnTzAOuJ61Lmo0hqYzEUh3ib6w.3IEIoQFnI9G','SV',0,'2023-03-28 07:57:30','2023-03-28 07:57:30',NULL),(17,'$2a$10$3og6gdpZgMzKdLKO2kC40epMcdh61O9YreVYSsFxZsgOOvXGYYsP.','SV',0,'2023-03-28 08:00:55','2023-03-28 08:00:55',NULL),(18,'$2a$10$tuAueZwSFUhfmHFyFUHv3OtyJq34X1rSp7aPCPWXAuBJx4YNXmaye','SV',0,'2023-03-28 08:03:54','2023-03-28 08:03:54',NULL),(19,'$2a$10$Os4bnES2jRmo4.S0kX3uM.Hp5Gd7Kb18jMYGn3yLUalNcDEAPJ6zW','SV',1,'2023-04-07 03:38:38','2023-04-07 03:38:38',NULL),(20,'$2a$10$fFHliZIdLPEa9iPqEreWTuGmgrYcKavd74gd7j8RW/8R8lpIdc1S.','SV',1,'2023-04-07 06:38:22','2023-04-07 06:38:22',NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `numberOfQuestions` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `lectureId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `lectureId` (`lectureId`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES ('WEBC1','HTML',41,'2023-03-18 15:49:49','2023-03-18 15:49:49','841109'),('WEBC2','CSS',20,'2023-03-23 09:17:46','2023-03-23 09:17:46','841109');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classdetail`
--

DROP TABLE IF EXISTS `classdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` varchar(10) NOT NULL,
  `classId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `classdetail_classId_studentId_unique` (`studentId`,`classId`),
  KEY `classId` (`classId`),
  CONSTRAINT `classdetail_ibfk_2137` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classdetail_ibfk_2138` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classdetail`
--

LOCK TABLES `classdetail` WRITE;
/*!40000 ALTER TABLE `classdetail` DISABLE KEYS */;
INSERT INTO `classdetail` VALUES (68,'19','a111'),(69,'2','a111');
/*!40000 ALTER TABLE `classdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` varchar(255) NOT NULL,
  `totalStudent` int DEFAULT '0',
  `name` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `year` date NOT NULL,
  `semester` tinyint(1) NOT NULL,
  `isLock` tinyint(1) DEFAULT '0',
  `teacherId` varchar(10) DEFAULT NULL,
  `lectureId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `lectureId` (`lectureId`),
  CONSTRAINT `classes_ibfk_3073` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `classes_ibfk_3074` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES ('222',0,'2','2','2023-03-01',2,0,NULL,'841109'),('841109231-6',0,'123','123','2023-01-01',1,0,'10991','841109'),('841109231-7',0,'123','123','2023-01-01',1,0,'10991','841109'),('841109231-8',0,'123','123','2023-01-01',1,0,'10991','841109'),('a111',24,'dsasd','123','2002-10-30',1,1,'10991','841109'),('a112',0,'Web ứng dụng 1','123','2023-03-01',2,0,'10991','841109'),('a113',0,'Web ứng dụng 1','123','2023-03-01',2,0,'10991','841109'),('a114',0,'Web ứng dụng 1','123','2023-03-01',2,0,'10991','841109');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `headOfDepartment` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `headOfDepartment` (`headOfDepartment`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`headOfDepartment`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('','Khoa chung','2023-03-31 08:21:31','2023-03-31 08:21:31',NULL),('CT','Công Nghệ Thông Tin','2023-03-18 16:50:20','2023-03-18 16:50:20','10991'),('DV','Điện tử viễn thông','2023-03-31 09:57:53','2023-03-31 09:57:53',NULL),('GM','Giáo dục Mầm non','2023-03-31 09:58:38','2023-03-31 09:58:38',NULL),('GT','Giáo dục Tiểu học','2023-03-31 10:39:38','2023-03-31 10:39:38',NULL),('LC',' Giáo dục chính trị','2023-03-31 10:26:22','2023-03-31 10:26:22',NULL),('LU','Luật','2023-03-31 10:36:05','2023-03-31 10:36:05',NULL),('MO','Môi Trường','2023-03-31 09:57:53','2023-03-31 09:57:53',NULL),('NN','Ngoại ngữ','2023-03-31 09:58:38','2023-03-31 09:58:38',NULL),('NT','Nghệ thuật','2023-03-31 10:00:00','2023-03-31 10:00:00',NULL),('QD','Quản trị Kinh doanh','2023-03-31 10:00:00','2023-03-31 10:00:00',NULL),('QG','Giáo dục','2023-03-31 10:00:45','2023-03-31 10:00:45',NULL),('TD','Toán ứng dụng','2023-03-31 10:00:45','2023-03-31 10:00:45',NULL),('TE','Tài chính - Kế toán','2023-03-31 10:01:32','2023-03-31 10:01:32',NULL),('TN','SP Khoa học Tự nhiên','2023-03-31 10:01:32','2023-03-31 10:01:32',NULL),('TT','Thư viện - Văn phòng','2023-03-31 10:29:07','2023-03-31 10:29:07',NULL),('VD','Văn hóa và Du lịch','2023-03-31 10:02:14','2023-03-31 10:02:14',NULL),('XH','SP Khoa học Xã hội','2023-03-31 10:02:14','2023-03-31 10:02:14',NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examchapter`
--

DROP TABLE IF EXISTS `examchapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examchapter` (
  `studentresultId` int NOT NULL,
  `chapterId` varchar(255) NOT NULL,
  PRIMARY KEY (`studentresultId`,`chapterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examchapter`
--

LOCK TABLES `examchapter` WRITE;
/*!40000 ALTER TABLE `examchapter` DISABLE KEYS */;
/*!40000 ALTER TABLE `examchapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examresults`
--

DROP TABLE IF EXISTS `examresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examresults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examresults`
--

LOCK TABLES `examresults` WRITE;
/*!40000 ALTER TABLE `examresults` DISABLE KEYS */;
/*!40000 ALTER TABLE `examresults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `timeStart` datetime DEFAULT NULL,
  `timeEnd` datetime DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `totalQuestions` int NOT NULL,
  `ratioQuestions` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `classId` varchar(255) DEFAULT NULL,
  `type` int NOT NULL,
  `isLock` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES ('EXM001','JavaScript Basics','2023-04-01 09:00:00','2023-04-01 10:00:00',60,10,0.5,'2023-03-18 15:49:49','2023-03-18 15:49:49','a111',0,0);
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functiondetail`
--

DROP TABLE IF EXISTS `functiondetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functiondetail` (
  `permissiongroupId` int NOT NULL,
  `functionId` int NOT NULL,
  PRIMARY KEY (`permissiongroupId`,`functionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functiondetail`
--

LOCK TABLES `functiondetail` WRITE;
/*!40000 ALTER TABLE `functiondetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `functiondetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripton` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `path` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
INSERT INTO `functions` VALUES (1,'ssss','2023-03-27 08:11:55','2023-03-27 08:11:55','classes','GET'),(2,'Thêm lớp','2023-03-28 10:09:47','2023-03-28 10:09:47','classes','POST'),(3,'Sửa lớp','2023-03-28 10:10:26','2023-03-28 10:10:26','classes','PUT'),(4,'Xóa lớp','2023-03-28 10:10:53','2023-03-28 10:10:53','classes','DELETE'),(5,'Lấy chi tiết 1 lớp','2023-03-28 12:34:20','2023-03-28 12:34:20','class','GET'),(6,'Thêm chi tiết 1 lớp','2023-03-30 04:41:52','2023-03-30 04:41:52','class','POST'),(7,'Sửa chi tiết 1 lớp','2023-03-30 04:41:52','2023-03-30 04:41:52','class','PUT');
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturedetail`
--

DROP TABLE IF EXISTS `lecturedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturedetail` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `majorId` varchar(10) NOT NULL,
  `lectureId` varchar(10) NOT NULL,
  PRIMARY KEY (`majorId`,`lectureId`),
  KEY `lectureId` (`lectureId`),
  CONSTRAINT `lecturedetail_ibfk_1` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`),
  CONSTRAINT `lecturedetail_ibfk_2` FOREIGN KEY (`majorId`) REFERENCES `majors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturedetail`
--

LOCK TABLES `lecturedetail` WRITE;
/*!40000 ALTER TABLE `lecturedetail` DISABLE KEYS */;
INSERT INTO `lecturedetail` VALUES ('2023-03-18 17:07:02','2023-03-18 17:07:02','DKP','841109');
/*!40000 ALTER TABLE `lecturedetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` tinyint(1) NOT NULL,
  `totalChapters` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES ('841109','Web1\r\n',4,6,'2023-03-18 15:49:49','2023-03-18 15:49:49');
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majors`
--

DROP TABLE IF EXISTS `majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `majors` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `departmentId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `departmentId` (`departmentId`),
  CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majors`
--

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
INSERT INTO `majors` VALUES ('DAN','Ngôn ngữ Anh','2023-03-31 10:57:34','2023-03-31 10:57:34','NN'),('DCM','Công nghệ Kĩ thuật Môi trường','2023-03-31 10:57:34','2023-03-31 10:57:34','MO'),('DCT','Công Nghệ Thông Tin','2023-03-31 07:19:22','2023-03-31 07:19:22','CT'),('DCV','Công nghệ kỹ thuật điện tử - viễn thông','2023-03-31 10:13:18','2023-03-31 10:13:18','DV'),('DDE','Kỹ thuật điện','2023-03-31 10:13:18','2023-03-31 10:13:18','DV'),('DDI','SP Địa lý','2023-03-31 10:30:14','2023-03-31 10:30:14','XH'),('DDL','Du lịch','2023-03-31 10:57:34','2023-03-31 10:57:34','VD'),('DDV','Kỹ thuật điện tử - viễn thông','2023-03-31 10:13:18','2023-03-31 10:13:18','DV'),('DGD','Giáo dục Chính trị','2023-03-31 10:27:27','2023-03-31 10:27:27','LC'),('DGM','Giáo dục Mầm non','2023-03-31 10:30:14','2023-03-31 10:30:14','GM'),('DGT','Giáo dục Tiểu học','2023-03-31 10:57:34','2023-03-31 10:57:34','GT'),('DHO','SP Hóa','2023-03-31 10:13:18','2023-03-31 10:13:18','TN'),('DKD','Công nghệ Kĩ thuật điện, điện tử','2023-03-31 10:13:18','2023-03-31 10:13:18','DV'),('DKE','Kế toán','2023-03-31 10:12:11','2023-03-31 10:12:11','TE'),('DKH','SP Khoa học tự nhiên','2023-03-31 10:13:18','2023-03-31 10:13:18','TN'),('DKM','Khoa học môi trường','2023-03-31 10:57:34','2023-03-31 10:57:34','MO'),('DKP','Kỹ Thuật Phần Mềm','2023-03-18 16:51:30','2023-03-18 16:51:30','CT'),('DLD','SP Lịch sử - Địa lý','2023-03-31 10:30:14','2023-03-31 10:30:14','XH'),('DLI','SP Vật lí','2023-03-31 10:13:18','2023-03-31 10:13:18','TN'),('DLU','Luật','2023-03-31 10:36:19','2023-03-31 10:36:19','LU'),('DMI','SP Mỹ thuật','2023-03-31 10:13:18','2023-03-31 10:13:18','NT'),('DNA','Thanh nhạc','2023-03-31 10:13:18','2023-03-31 10:13:18','NT'),('DNH','SP Âm nhạc','2023-03-31 10:13:18','2023-03-31 10:13:18','NT'),('DQG','Quản lý Giáo dục','2023-03-31 10:36:19','2023-03-31 10:36:19','QG'),('DQK','Quản trị kinh doanh','2023-03-31 10:57:34','2023-03-31 10:57:34','QD'),('DQT','Quốc tế học','2023-03-31 10:57:34','2023-03-31 10:57:34','VD'),('DQV','Quản trị văn phòng','2023-03-31 10:29:23','2023-03-31 10:29:23','TT'),('DSA','SP Tiếng Anh','2023-03-31 10:57:34','2023-03-31 10:57:34','NN'),('DSI','SP Sinh học','2023-03-31 10:13:18','2023-03-31 10:13:18','TN'),('DSU','SP Lịch sử','2023-03-31 10:30:14','2023-03-31 10:30:14','XH'),('DTL','Tâm lí học','2023-03-31 10:36:19','2023-03-31 10:36:19','QG'),('DTN','Tài chính - Ngân hàng','2023-03-31 10:12:11','2023-03-31 10:12:11','TE'),('DTO','SP Toán','2023-03-31 10:57:34','2023-03-31 10:57:34','TD'),('DTT','Thông tin - Thư viện','2023-03-31 10:29:23','2023-03-31 10:29:23','TT'),('DTU','Toán ứng dụng','2023-03-31 10:09:06','2023-03-31 10:09:06','TD'),('DVA','SP Ngữ văn','2023-03-31 10:30:14','2023-03-31 10:30:14','XH'),('DVI','Việt Nam học','2023-03-31 10:57:34','2023-03-31 10:57:34','VD');
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `classId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissiongroups`
--

DROP TABLE IF EXISTS `permissiongroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissiongroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissiongroups`
--

LOCK TABLES `permissiongroups` WRITE;
/*!40000 ALTER TABLE `permissiongroups` DISABLE KEYS */;
INSERT INTO `permissiongroups` VALUES (1,'GV','2023-03-27 03:18:48','2023-03-27 03:18:48'),(2,'SV','2023-03-28 05:07:33','2023-03-28 05:07:33');
/*!40000 ALTER TABLE `permissiongroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correctAns` varchar(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `answerA` varchar(255) NOT NULL,
  `answerB` varchar(255) NOT NULL,
  `answerC` varchar(255) NOT NULL,
  `answerD` varchar(255) NOT NULL,
  `difficulty` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chapterId` varchar(10) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `chapterId` (`chapterId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`chapterId`) REFERENCES `chapters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11154 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (11111,'A','HTML là gì ?','Ngôn ngữ đánh dấu siêu văn bản','Ngôn ngữ lập trình bậc thấp','Ngôn ngữ đánh dấu văn bản','Ngôn ngữ lập trình bậc cao','Dễ','2023-03-18 15:49:49','2023-03-18 15:49:49','WEBC1',0),(11112,'B','Có bao nhiêu cách liên kết file CSS','4','3','1','2','Dễ','2023-03-18 15:49:49','2023-03-18 15:49:49','WEBC1',0),(11113,'C','Từ HTML là từ viết tắt của từ nào?','Hyperlinks and Text Markup Language','Home Tool Markup Language','Hyper Text Markup Language','Tất cả đều sai','Dễ','2023-03-21 05:49:01','2023-03-21 05:49:01','WEBC1',0),(11114,'A','Ai (tổ chức nào) tạo ra Web standards','The World Wide Web Consortium','Microsoft','Netscape','Tất cả đều sai','Dễ','2023-03-21 05:51:11','2023-03-21 05:51:11','WEBC1',0),(11115,'B','Đâu là tag để xuống dòng trong web?','<lb>','<br>','<break>','<enter>','Dễ','2023-03-21 05:51:11','2023-03-21 05:51:11','WEBC1',0),(11116,'C','Đâu là tag tạo ra ra chữ in nghiêng?','<ii>','<italics>','<i>','<strong>','Dễ','2023-03-21 05:53:41','2023-03-21 05:53:41','WEBC1',0),(11117,'B','Đâu là tag tạo ra tiêu đề web kích cỡ lớn nhất. ','<heading> ','<h1>','<h6>','<head>','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11118,'B','Đâu là tag tạo ra liên kết đến email?','<a href=\"xxx@yyy\">','<a href=\"mailto:xxx@yyy\">','<mail>xxx@yyy</mail> ','<mail href=\"xxx@yyy\"> ','Khó','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11119,'C','Đâu là tag căn lề trái cho nội dung 1 ô trong bảng ','<tdleft>','<td valign=\"left\"> ','<td align=\"left\"> ','<td leftalign>','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11120,'C','Đâu là tag tạo ra 1 danh sách đứng đầu bằng số ','<ul>','<list> ','<ol> ','<dl> ','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11121,'B','Đâu là tag tạo ra 1 danh sách đứng đầu bởi dấu chấm? ','<list> ','<ul>','<ol>','<dl>','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11122,'D','Tag nào tạo ra 1 checkbox? ','<check> ','<input type=\"check\"> ','<checkbox> ','<input type=\"checkbox\"> ','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11123,'C','Tag nào tạo ra 1 text input field?','<textfield> ','<textinput type=\"text\"> ','<input type=\"text\">','<input type=\"textfield\"> ','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11124,'A','Tag nào tạo ra 1 drop-down list? ','<select> ','<list> ','<input type=\"dropdown\">','<input type=\"list\">','Khó','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11125,'C','Tag nào dùng để chèn 1 hình vào web?','<image src=\"image.gif\"> ','<img>image.gif</img>','<img src=\"image.gif\">','<img href=\"image.gif> ','Dễ','2023-03-21 05:53:42','2023-03-21 05:53:42','WEBC1',0),(11126,'A','JavaScript là ngôn ngữ xử lý ở:','Client','Server','Server/client ','Không có dạng nào. ','Khó','2023-03-21 06:10:22','2023-03-21 06:10:22','WEBC1',0),(11127,'B','Javascript là ngôn ngữ thông dịch hay biên dịch ','Thông dịch ','Biên dịch','Cả hai dạng','Không có dạng nào ở trên','Khó','2023-03-21 06:10:22','2023-03-21 06:10:22','WEBC1',0),(11128,'A','JavaScript được bắt đầu bằng? ','<scritp> …</script> ','<Javascript> …<Javascript> ','<java> </java>','Tất cả các dạng trên. ','Dễ','2023-03-21 06:18:49','2023-03-21 06:18:49','WEBC1',0),(11129,'A','Javascript có các dạng biến? ','Number, String, Boolean ','Number, Integer, char ','Number, String, Boolean, Null ','Tất cả các loại trên. ','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11130,'B','Trong Javascript hàm parseInt() dùng để làm gì?','Chuyển một chuỗi thành số ','Chuyển một chuỗi thành số nguyên ','Chuyển một chuỗi thành số thực','Chuyển một số nguyên thành một chuỗi','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11131,'B','Trong Javascript hàm parseFloat() dùng để làm gì?','Chuyển một chuỗi thành số ','Chuyển một chuỗi thành số thực','Chuyển một chuỗi thành số nguyên','Chuyển một số nguyên thành một chuỗi ','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11132,'A','Lệnh prompt trong Javascript để làm gì?','Hiện một thông báo nhập thông tin ','Hiện một thông báo dạng yes, No','Cả hai dạng trên ','Không có lệnh nào đúng ','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11133,'A','Trong Javascript sự kiện Onload thực hiện khi:','Khi bắt đầu chương trình chạy ','Khi click chuột','Khi di chuyển chuột qua. ','Khi kết thúc một chương trình','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11134,'C','Trong Javascript sự kiện OnUnload thực hiện khi nào?','Khi bắt đầu chương trình chạy ','Khi click chuột ','Khi kết thúc một chương trình','Khi di chuyển chuột qua','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11135,'A','Trong Javascript đoạn mã sau cho ra kết quả gì?\r\n<script>\r\nfunction kiemtra(){\r\nwindow.open(\"http://www.vnn.vn\",\"Chao\");\r\n}\r\n</script>\r\n</head>\r\n<body onload =\"kiemtra()\"></body>','Khi chạy thì một trang khác (VNN) được hiện ra .','Không chạy được vì sai ','Khi kết thúc thì một site khác hiện ra ','Hiện một trang vnn duy nhất','Khó ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11136,'C','CSS là viết tắt của? ','Creative Style Sheets ','Computer Style Sheets','Cascading Style Sheets ','Colorful Style Sheets','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11137,'A','Dòng nào thể hiện đúng một comment (lời chú thích) trong CSS? ','/* this is a comment */',' // this is a comment // ','‘ this is a comment ','// this is a comment','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11138,'B','Làm thế nào thêm màu nền cho tất cả các phần tử <h1>','h1.all {background-color:#FFFFFF}','h1 {background-color:#FFFFFF}','all.h1 {background-color:#FFFFFF}','Tất cả các câu trên đều sai. ','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11139,'A','. Làm sao để mỗi từ trong 1 dòng đều viết hoa ở đầu từ','text-transform:capitalize ','text-transform:uppercase','Không thể thực hiện được trong CSS','text-transform:lowercase','Khó','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11140,'C','Làm thế nào để hình ở đầu mỗi dòng của 1 list (danh sách) có hình vuông','type: 2','type: square ','list-type: square ','list-style-type: square ','Khó','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11141,'C','Kiểu định dạng PNG sử dụng tối đa ______bit màu','8','24','48','16','Khó ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11142,'A','Các thành phần cơ bản của Table ','Rows, Columns, Cells ','Rows, Columns, Width','Rows, Columns, Border','Rows, Columns, Cell spacing, Cell padding','Dễ','2023-03-21 06:18:50','2023-03-21 06:18:50','WEBC1',0),(11143,'A','test','1','2','3','4','Dễ','2023-03-24 06:48:43','2023-03-24 06:48:43','WEBC1',0),(11144,'A','test','1','2','3','4','Dễ','2023-03-24 06:54:21','2023-03-24 06:54:21','WEBC1',0),(11145,'A','test','1','2','3','4','Dễ','2023-03-24 06:54:53','2023-03-24 06:54:53','WEBC1',0),(11146,'A','test','1','2','3','4','Dễ','2023-03-24 07:22:31','2023-03-24 07:22:31','WEBC1',0),(11147,'A','test','1','2','3','4','Dễ','2023-03-24 07:24:27','2023-03-24 07:24:27','WEBC1',0),(11148,'A','test','1','2','3','4','Dễ','2023-03-24 07:26:19','2023-03-24 07:26:19','WEBC1',0),(11149,'A','test','1','2','3','4','Dễ','2023-03-24 07:26:45','2023-03-24 07:26:45','WEBC1',0),(11150,'A','test','1','2','3','4','Dễ','2023-03-24 07:32:54','2023-03-24 07:32:54',NULL,0),(11151,'A','test','1','2','3','4','Dễ','2023-03-24 07:32:54','2023-03-24 07:32:54',NULL,0),(11152,'A','test','1','2','3','4','Dễ','2023-03-24 07:34:29','2023-03-24 07:34:29','WEBC1',0),(11153,'A','test','1','2','3','4','Dễ','2023-03-24 07:34:29','2023-03-24 07:34:29','WEBC1',0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentresults`
--

DROP TABLE IF EXISTS `studentresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentresults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` varchar(10) DEFAULT NULL,
  `examId` varchar(10) DEFAULT NULL,
  `grade` int NOT NULL,
  `content` json NOT NULL,
  `isDone` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studentresults_examId_studentId_unique` (`studentId`,`examId`),
  KEY `examId` (`examId`),
  CONSTRAINT `studentresults_ibfk_151` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `studentresults_ibfk_152` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `studentresults_chk_1` CHECK (json_valid(`content`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentresults`
--

LOCK TABLES `studentresults` WRITE;
/*!40000 ALTER TABLE `studentresults` DISABLE KEYS */;
INSERT INTO `studentresults` VALUES (1,'2','EXM001',10,'{\"a\": 2}',0,'2023-04-01 06:22:00','2023-04-01 06:22:00');
/*!40000 ALTER TABLE `studentresults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` varchar(10) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `accountId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `majorId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `accountId` (`accountId`),
  KEY `majorId` (`majorId`),
  CONSTRAINT `students_ibfk_3077` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `students_ibfk_3078` FOREIGN KEY (`majorId`) REFERENCES `majors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('0123456789','Test','2023-03-27',NULL,'2023-04-07 06:38:22','2023-04-07 06:38:22',NULL),('123123','123123','2003-10-30',5,'2023-03-27 08:44:28','2023-03-27 08:44:28','DKP'),('12312344','123123','2003-10-30',6,'2023-03-27 09:14:23','2023-03-27 09:14:23','DKP'),('123123441','123123','2003-10-30',7,'2023-03-27 15:56:03','2023-03-27 15:56:03','DKP'),('1231234411','123123','2003-10-30',8,'2023-03-27 16:03:54','2023-03-27 16:03:54','DKP'),('18','asdasd','2003-10-30',16,'2023-03-28 07:57:30','2023-03-28 07:57:30','DKP'),('19','asdasd','2003-10-30',17,'2023-03-28 08:00:55','2023-03-28 08:00:55','DKP'),('2','123123','2003-10-30',9,'2023-03-27 16:11:03','2023-03-27 16:11:03','DKP'),('20','asdasd','2003-10-30',18,'2023-03-28 08:03:54','2023-03-28 08:03:54','DKP'),('3','123123','2003-10-30',10,'2023-03-27 16:14:46','2023-03-27 16:14:46','DKP'),('3121410146','Nguyen Thanh Phat','2023-04-07',NULL,'2023-04-07 03:38:38','2023-04-07 03:38:38',NULL),('3121560033','Nguyễn Trương Khánh Hoàng','2003-10-30',3,'2023-03-27 03:54:14','2023-03-27 03:54:14','DKP'),('4','123123','2003-10-30',11,'2023-03-27 16:15:40','2023-03-27 16:15:40','DKP'),('5','123123','2003-10-30',12,'2023-03-27 16:17:42','2023-03-27 16:17:42','DKP'),('6','123123','2003-10-30',13,'2023-03-27 16:18:53','2023-03-27 16:18:53','DKP'),('7','123123','2003-10-30',14,'2023-03-27 16:45:06','2023-03-27 16:45:06','DKP'),('8','asdasd','2003-10-30',15,'2023-03-28 07:52:57','2023-03-28 07:52:57','DKP');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teach`
--

DROP TABLE IF EXISTS `teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teach` (
  `teacherId` varchar(10) NOT NULL,
  `lectureId` varchar(10) NOT NULL,
  PRIMARY KEY (`teacherId`,`lectureId`),
  KEY `lectureId` (`lectureId`),
  CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`lectureId`) REFERENCES `lectures` (`id`),
  CONSTRAINT `teach_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teach`
--

LOCK TABLES `teach` WRITE;
/*!40000 ALTER TABLE `teach` DISABLE KEYS */;
INSERT INTO `teach` VALUES ('10991','841109');
/*!40000 ALTER TABLE `teach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `id` varchar(10) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `dob` datetime NOT NULL,
  `accountId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `departmentId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `accountId` (`accountId`),
  KEY `departmentId` (`departmentId`),
  CONSTRAINT `teachers_ibfk_2711` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `teachers_ibfk_2712` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES ('10991','Nguyễn Thanh Sang','2023-03-18 15:49:49',1,'2023-03-18 15:49:49','2023-03-18 15:49:49','CT'),('20766','Huỳnh Minh Trí','2023-03-31 08:35:46',4,'2023-03-31 08:35:46','2023-03-31 08:35:46','CT');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dy0jhdljqz4f0tqo'
--

--
-- Dumping routines for database 'dy0jhdljqz4f0tqo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 14:25:46
