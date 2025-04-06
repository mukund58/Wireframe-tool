/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: wireframedb
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES
(1,32,NULL,NULL),
(2,34,NULL,NULL),
(3,35,NULL,NULL),
(4,38,NULL,NULL),
(5,39,NULL,NULL),
(6,40,NULL,NULL),
(7,41,NULL,NULL),
(8,42,NULL,NULL),
(9,43,NULL,NULL);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `email_verified` tinyint(1) DEFAULT 0,
  `token` varchar(64) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(2,'mukund58','ss@ee.c','$2y$12$nMipk4Ycy8s2P00uAFZ8n.gpvRJmp4O92A2p/BS64T7Sydx/2ynWa','2025-04-05 11:16:52',0,NULL,NULL),
(3,'nick10','nick2uv@gmail.com','$2y$12$Wardwtr06PW3u7ip27AuPePTmPbMLBRYUX5hRIcU0VemA8ZzR7Ogq','2025-04-05 11:16:52',0,NULL,NULL),
(4,'bun','bun@gmail.com','$2y$12$EOpdO111qVu8b9N733zKNeFqEUNkim6cmK98Z5Rg99mVjnhkICVRG','2025-04-05 11:16:52',0,NULL,NULL),
(5,'mukund','hi@mukund.xyz','$2y$12$sV48UeYyEeJyg3oeYrRQ0O2IlzSkVdyWfEMMfFeLRTqmBbYzB9ZP6','2025-04-05 11:16:52',0,NULL,NULL),
(11,'mss','cur@gmail.com','$2y$12$ATvF0Z3pRqUuWcNslHxlh.ajZSvVUx9X9VDHCtICb3scxGpYZIeK2','2025-04-05 11:16:52',0,NULL,NULL),
(12,'hss12','bun12@gmail.com','$2y$12$2DMUMohrB.S.0w7rwT9rLuMRjLpD9rJSmB27ckchZK.bj4s.AbUXC','2025-04-05 11:16:52',0,NULL,NULL),
(13,'nick123','nick123@gmail.com','$2y$12$eQp1Ejvw7R9PcoLpDEWSI.UE1/iCTD1jjHvXRfR4655wxxMTqiP66','2025-04-05 11:16:52',0,NULL,NULL),
(15,'nick12333','nick12345@gmail.com','$2y$12$S1OF073W848gx3RZ1SMUcu0thOdYZvKCH603CLe8ZlxW1L7Y.w2Ny','2025-04-05 11:16:52',0,NULL,NULL),
(16,'rok','rok@gmail.com','$2y$12$4vQfhLuT8odErY5vNdh81ObIBydDgV4IPSNrYx2s2v0yMRXMAAFzK','2025-04-05 11:16:52',0,NULL,NULL),
(17,'rok11','rok1@gmail.com','$2y$12$BTYXlniJhCQzgYxUMR13D.tWgL.a8FKO/rnp37ppkl/xrq5UI0nQS','2025-04-05 11:16:52',0,NULL,NULL),
(18,'rokeee','roke@gmail>in','$2y$12$V9yzQ5BzFgQ4.O3PfrklLekhcpkpLFMJaFkJaasVYwXqRKHAaJsMu','2025-04-05 11:16:52',0,'c7b1a093ab95c21f5a174d834026948b',NULL),
(19,'roke1234','roke@gmail.in','$2y$12$J1bg6W8ElVOYFN1x3fj94uAcYwJRZKJuGxRcvqgbgsfOdRJrhn37W','2025-04-05 11:16:52',0,NULL,NULL),
(20,'roke123dd','nick12fd3@gmail.com','$2y$12$ZNoNv2nBK6Y/q9wq67qpauDNv139KvPPuWuRrwvVIP.FRU4T/v.Cq','2025-04-05 11:16:52',0,NULL,NULL),
(21,'roke123jj','hi@mukund.xyzj','$2y$12$9vqg6OEYxsHYy08hXkUoGO9NfhwwbYCqamXUKQ3uOg6awltgQt2R2','2025-04-05 11:16:52',0,NULL,NULL),
(23,'roke12389','parmarmukund20089@gmail.com','$2y$12$e0t4prFPTj4.E1F6c.d1bOaKbj69QM2Z3654Dj.1CMlzAQmayv7zy','2025-04-05 11:16:52',0,NULL,NULL),
(24,'wwroke123','bunww@gmail.com','$2y$12$Ugv9/ZhQF6Bln0ggxupqbuE7iHs0DnR2/eTBeGGmzUHG2TqjVHsm.','2025-04-05 11:16:52',0,NULL,NULL),
(25,'himp12','hi@mp.in','$2y$12$izdmztcrHDsoNHgPKqZ5Xeg7e5lY6o2zge0YU4slP05ez9OzlmdYm','2025-04-05 11:16:52',0,NULL,NULL),
(28,'narayan','narayan@gmail.com','$2y$12$2dnN5rrNEZnuSpHSUJswMut0cqUklvtWY4JEuK.AkJAdJHYEOPbyi','2025-04-05 11:16:52',0,NULL,NULL),
(29,'narayan1','narayan1@gmail.com','$2y$12$UesUHsnvmJw8z8f/O4gfxeH4UW6LKjh2BhiGvkQV9qGOrHn2QLNWu','2025-04-05 11:16:52',0,NULL,NULL),
(30,'niru123','niru@gmail.com','$2y$12$.Fdpx0QJuHCzy22b6ajst.VAz1uCQsNAbn/kHSRKSa68vhzYtIS.O','2025-04-05 11:16:52',0,NULL,NULL),
(31,'hitu1','hitu@gmail.com','$2y$12$HSGE/BjGwjPUXDT0KaTE/u56jHTYlGtEso0oe/mznF5Yj4sHZhHbS','2025-04-05 11:16:52',0,NULL,NULL),
(32,'goli12','goli@gmail.com','$2y$12$.l8mYBTZOX8dFs0W6bVRAu.BM00rE14Fzed2/b.2JyxkO/tGT4ISm','2025-04-05 12:16:02',0,NULL,NULL),
(34,'fika1','fikaha1524@inveitro.com','$2y$12$LtQ2tfBL9vfKIqCA/L68n.dmvBxkmlbTB1LDPNGQhRnrYDd9nMtU2','2025-04-05 16:08:56',0,NULL,NULL),
(35,'freefire1','parmarnarayan2008@gmail.com','$2y$12$4AJ5Wf/Y4E5hSh8If0HiOOHlA6EjwxrE.KgTTvFfjY4GTH4fsF2Di','2025-04-05 16:10:25',0,NULL,NULL),
(38,'','','$2y$12$.m16OsCSWO0Pep1h6qEhZ.Ve1owP5CaGZr2pdlpAXDzCwoAEB5kAa','2025-04-05 16:36:11',0,'df48dd9d174e72d4ead9b02d2a212552',NULL),
(39,'byte22x','tareruki@cyclelove.inw','$2y$12$8RG2MQUK/im/4wqOuYB/8e3PnqqB071BvXU6kk7j9TWFR96nY8SdS','2025-04-05 16:54:45',0,NULL,NULL),
(40,'byte1w','eew@dd.h','$2y$12$OiXxnXHXVQkHBhUuABOhtOUYfyfJ4ClSQvBaSjJQq9EyQ08pq2rRK','2025-04-05 17:10:47',0,'8786b311a4e73a8e008d8ae2313fa8ad',NULL),
(41,'byte3','zezuga@asciibinder.net','$2y$12$dYMIkNS3XYAM4nJIPCCKgeF9P6oHch1zdYOdEMKhirDIiUMn707N2','2025-04-05 17:11:35',0,NULL,NULL),
(42,'byte45','gipovamo@dreamclarify.org','$2y$12$7TwJhkVJawuPJzub9/uFbOLpyJdQ.wtfPrGcLTU5313qbiae1coBS','2025-04-05 17:17:13',1,'dd98bbdd2763da79c0a872fbe0623db7','../pic/67f2295f42cb3_pic-full-250219-0003-11.png'),
(43,'byte5','soxybuny@azuretechtalk.net','$2y$12$qW3Mha2t73Iq1OUQr3O/uOn8o8t6FuJY6dYGA7lfEFsHQaXGE/2cm','2025-04-05 17:45:48',1,'04620796947518ffb93412b7e63256d7',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-04-06 12:44:05
