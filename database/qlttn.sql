-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2023 at 06:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qlttn`
--

-- --------------------------------------------------------

--
-- Table structure for table `cauhoi`
--

CREATE TABLE `cauhoi` (
  `MaCH` varchar(10) NOT NULL,
  `DapAnDung` char(1) NOT NULL,
  `NoiDung` varchar(256) NOT NULL,
  `D` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `A` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `B` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `C` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MucDo` varchar(11) NOT NULL,
  `MaChuong` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cauhoi`
--

INSERT INTO `cauhoi` (`MaCH`, `DapAnDung`, `NoiDung`, `D`, `A`, `B`, `C`, `MucDo`, `MaChuong`) VALUES
('11111', 'A', 'HTML là gì ?', 'Ngôn ngữ lập trình bậc cao', 'Ngôn ngữ đánh dấu siêu văn bản', 'Ngôn ngữ lập trình bậc thấp', 'Ngôn ngữ đánh dấu văn bản', 'Dễ', 'webc1'),
('11112', 'B', 'Có bao nhiêu cách liên kết file css', '2', '4', '3', '1', 'Dễ', 'webc1');

--
-- Triggers `cauhoi`
--
DELIMITER $$
CREATE TRIGGER `delete_cauhoi` AFTER DELETE ON `cauhoi` FOR EACH ROW BEGIN
	UPDATE chuong
    SET chuong.SoCauHoi = chuong.SoCauHoi -1
    WHERE chuong.MaChuong=old.MaChuong;
    DELETE  FROM ketqua WHERE ketqua.MaCH = old.MaCH;
 END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_cauhoi` AFTER INSERT ON `cauhoi` FOR EACH ROW BEGIN
	UPDATE chuong
    SET chuong.SoCauHoi = chuong.SoCauHoi +1 
    WHERE chuong.MaChuong = new.MaChuong ;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chitietmon`
--

CREATE TABLE `chitietmon` (
  `MaNganh` varchar(10) NOT NULL,
  `MaMon` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietmon`
--

INSERT INTO `chitietmon` (`MaNganh`, `MaMon`) VALUES
('DCT', '841109'),
('DCT', '841419'),
('DKP', '841109'),
('DKP', '841419');

-- --------------------------------------------------------

--
-- Table structure for table `chucnang`
--

CREATE TABLE `chucnang` (
  `MaCN` varchar(10) NOT NULL,
  `NoiDung` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucnang`
--

INSERT INTO `chucnang` (`MaCN`, `NoiDung`) VALUES
('CN01', 'Thêm Lớp'),
('CN02', 'Thêm Bài kiểm tra\r\n'),
('CN03', 'Làm bài');

-- --------------------------------------------------------

--
-- Table structure for table `chuong`
--

CREATE TABLE `chuong` (
  `SoCauHoi` int(11) NOT NULL DEFAULT 0,
  `TenChuong` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MaChuong` varchar(10) NOT NULL,
  `MaMon` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chuong`
--

INSERT INTO `chuong` (`SoCauHoi`, `TenChuong`, `MaChuong`, `MaMon`) VALUES
(2, 'HTML', 'webc1', '841419');

--
-- Triggers `chuong`
--
DELIMITER $$
CREATE TRIGGER `delete_chuong` AFTER DELETE ON `chuong` FOR EACH ROW BEGIN
	UPDATE monhoc
    SET monhoc.SoCH = monhoc.SoCH - 1
    WHERE monhoc.MaMon = old.MaMon;
    DELETE  FROM cauhoi WHERE cauhoi.MaChuong = old.MaChuong;
 END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `classlist`
--

CREATE TABLE `classlist` (
  `MaSV` varchar(10) NOT NULL,
  `MaLop` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classlist`
--

INSERT INTO `classlist` (`MaSV`, `MaLop`) VALUES
('3121410146', 'a111'),
('3121410417', 'a111'),
('3121410425', 'a111'),
('3121560033', 'a111');

--
-- Triggers `classlist`
--
DELIMITER $$
CREATE TRIGGER `insert_svinclass` AFTER INSERT ON `classlist` FOR EACH ROW BEGIN
	UPDATE nhom_lop
    SET nhom_lop.SoLuong = nhom_lop.SoLuong +1 
    WHERE nhom_lop.MaLop = new.MaLop ;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ctcn`
--

CREATE TABLE `ctcn` (
  `Nhom` varchar(10) NOT NULL,
  `MaCN` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ctcn`
--

INSERT INTO `ctcn` (`Nhom`, `MaCN`) VALUES
('PQ01', 'CN01'),
('PQ01', 'CN02');

-- --------------------------------------------------------

--
-- Table structure for table `dethi`
--

CREATE TABLE `dethi` (
  `MaDe` varchar(10) NOT NULL,
  `TenDe` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `thoiGianBD` datetime DEFAULT NULL,
  `thoiGianKT` datetime DEFAULT NULL,
  `thoiGianLamBai` int(11) DEFAULT NULL,
  `SoLuongCauHoi` int(11) NOT NULL DEFAULT 0,
  `TLCauhoi` float NOT NULL,
  `MaLop` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dethi`
--

INSERT INTO `dethi` (`MaDe`, `TenDe`, `thoiGianBD`, `thoiGianKT`, `thoiGianLamBai`, `SoLuongCauHoi`, `TLCauhoi`, `MaLop`) VALUES
('KT001', 'KT web_1 l_1', '2023-02-21 15:17:00', '2023-02-21 18:00:00', 60, 0, 50, 'a111');

--
-- Triggers `dethi`
--
DELIMITER $$
CREATE TRIGGER `delete_dethi` AFTER DELETE ON `dethi` FOR EACH ROW BEGIN
    DELETE  FROM ketqua WHERE ketqua.MaDe = old.MaDe;
    DELETE  FROM diem_sv WHERE diem_sv.MaDe = old.MaDe;
 END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `diem_sv`
--

CREATE TABLE `diem_sv` (
  `diem` int(11) NOT NULL,
  `MaSV` varchar(10) NOT NULL,
  `MaDe` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diem_sv`
--

INSERT INTO `diem_sv` (`diem`, `MaSV`, `MaDe`) VALUES
(9, '3121410146', 'KT001'),
(9, '3121410417', 'KT001'),
(10, '3121410425', 'KT001'),
(9, '3121560033', 'KT001');

-- --------------------------------------------------------

--
-- Table structure for table `giangday`
--

CREATE TABLE `giangday` (
  `MaMon` varchar(10) NOT NULL,
  `MaGV` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `giangday`
--

INSERT INTO `giangday` (`MaMon`, `MaGV`) VALUES
('841109', '11384'),
('841419', '10991');

-- --------------------------------------------------------

--
-- Table structure for table `giangvien`
--

CREATE TABLE `giangvien` (
  `MaGV` varchar(10) NOT NULL,
  `MaKhoa` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `giangvien`
--

INSERT INTO `giangvien` (`MaGV`, `MaKhoa`) VALUES
('10991', 'CNTT'),
('11384', 'CNTT');

-- --------------------------------------------------------

--
-- Table structure for table `ketqua`
--

CREATE TABLE `ketqua` (
  `Luachon` char(1) DEFAULT NULL,
  `MaSV` varchar(10) NOT NULL,
  `MaCH` varchar(10) NOT NULL,
  `MaDe` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ketqua`
--

INSERT INTO `ketqua` (`Luachon`, `MaSV`, `MaCH`, `MaDe`) VALUES
('B', '3121410146', '11111', 'KT001'),
('D', '3121410146', '11112', 'KT001'),
('C', '3121410417', '11111', 'KT001'),
('B', '3121410417', '11112', 'KT001'),
('A', '3121410425', '11111', 'KT001'),
('B', '3121410425', '11112', 'KT001'),
('D', '3121560033', '11111', 'KT001'),
('A', '3121560033', '11112', 'KT001');

-- --------------------------------------------------------

--
-- Table structure for table `khoa`
--

CREATE TABLE `khoa` (
  `MaKhoa` varchar(10) NOT NULL,
  `TenKhoa` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khoa`
--

INSERT INTO `khoa` (`MaKhoa`, `TenKhoa`) VALUES
('CNTT', 'Công Nghệ Thông Tin'),
('NNA', 'Ngôn Ngữ Anh');

-- --------------------------------------------------------

--
-- Table structure for table `monhoc`
--

CREATE TABLE `monhoc` (
  `MaMon` varchar(10) NOT NULL,
  `TenMon` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTC` int(11) NOT NULL,
  `SoCH` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monhoc`
--

INSERT INTO `monhoc` (`MaMon`, `TenMon`, `SoTC`, `SoCH`) VALUES
('841109', 'Cơ sở dữ liệu', 4, 6),
('841419', 'Lập trình web và ứng dụng', 4, 7);

-- --------------------------------------------------------

--
-- Table structure for table `nganh`
--

CREATE TABLE `nganh` (
  `MaNganh` varchar(10) NOT NULL,
  `TenNganh` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MaKhoa` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nganh`
--

INSERT INTO `nganh` (`MaNganh`, `TenNganh`, `MaKhoa`) VALUES
('DAN', 'Ngôn Ngữ Anh', 'NNA'),
('DCT', 'Công nghệ thông tin', 'CNTT'),
('DKP', 'Kỹ thuật phần mềm', 'CNTT');

-- --------------------------------------------------------

--
-- Table structure for table `nhom_lop`
--

CREATE TABLE `nhom_lop` (
  `MaLop` varchar(10) NOT NULL,
  `SoLuong` int(11) NOT NULL DEFAULT 0,
  `tenLop` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MaGV` varchar(10) NOT NULL,
  `MaMon` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhom_lop`
--

INSERT INTO `nhom_lop` (`MaLop`, `SoLuong`, `tenLop`, `MaGV`, `MaMon`, `password`) VALUES
('a111', 4, 'web  ứng dụng 1', '10991', '841419', '111111'),
('a112', 0, 'cơ sở dữ liệu nhóm 1', '11384', '841109', '111111');

--
-- Triggers `nhom_lop`
--
DELIMITER $$
CREATE TRIGGER `delete_lop` AFTER DELETE ON `nhom_lop` FOR EACH ROW BEGIN
    DELETE  FROM classlist WHERE  classlist.MaLop = old.MaLop;
    DELETE  FROM dethi WHERE dethi.MaLop = old.MaLop;
 END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `phanquyen`
--

CREATE TABLE `phanquyen` (
  `Nhom` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phanquyen`
--

INSERT INTO `phanquyen` (`Nhom`) VALUES
('PQ01'),
('PQ02');

-- --------------------------------------------------------

--
-- Table structure for table `sinhvien`
--

CREATE TABLE `sinhvien` (
  `MaSV` varchar(10) NOT NULL,
  `MaNganh` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sinhvien`
--

INSERT INTO `sinhvien` (`MaSV`, `MaNganh`) VALUES
('3121410146', 'DCT'),
('3121410417', 'DCT'),
('3121410425', 'DCT'),
('3121560033', 'DKP');

--
-- Triggers `sinhvien`
--
DELIMITER $$
CREATE TRIGGER `delete_sv` AFTER DELETE ON `sinhvien` FOR EACH ROW BEGIN 
DELETE FROM taikhoan WHERE taikhoan.MaSV=OLD.Masv;
DELETE FROM ketqua WHERE ketqua.MaSV=OLD.Masv;
DELETE FROM classlist WHERE classlist.MaSV=OLD.Masv;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `ID` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `loaitk` varchar(10) NOT NULL,
  `HoTen` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgaySinh` date NOT NULL,
  `MaGV` varchar(10) DEFAULT NULL,
  `MaSV` varchar(10) DEFAULT NULL,
  `Nhom` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`ID`, `password`, `loaitk`, `HoTen`, `NgaySinh`, `MaGV`, `MaSV`, `Nhom`) VALUES
('GV1', '123456', 'GV', 'Nguyễn Thanh Sang', '1985-10-02', '10991', NULL, 'PQ01'),
('GV2', '123456', 'GV', 'Trương Tấn Khoa', '1985-02-23', '11384', NULL, 'PQ01'),
('SV01', '123456', 'SV', 'Nguyễn Ngọc Sơn', '2003-05-20', NULL, '3121410425', 'PQ02'),
('SV03', '123456', 'SV', 'Nguyễn Thành Đạt', '2003-05-16', NULL, '3121410146', 'PQ02'),
('SV04', '123456', 'SV', 'Nguyễn Trương Khánh Hoàngho', '2003-10-30', NULL, '3121560033', 'PQ02'),
('SV2', '123456', 'SV', 'Nguyễn Ngọc Sang', '2003-08-21', NULL, '3121410417', 'PQ02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD PRIMARY KEY (`MaCH`),
  ADD KEY `MaChuong` (`MaChuong`);

--
-- Indexes for table `chitietmon`
--
ALTER TABLE `chitietmon`
  ADD PRIMARY KEY (`MaNganh`,`MaMon`),
  ADD KEY `MaMon` (`MaMon`);

--
-- Indexes for table `chucnang`
--
ALTER TABLE `chucnang`
  ADD PRIMARY KEY (`MaCN`);

--
-- Indexes for table `chuong`
--
ALTER TABLE `chuong`
  ADD PRIMARY KEY (`MaChuong`),
  ADD KEY `MaMon` (`MaMon`);

--
-- Indexes for table `classlist`
--
ALTER TABLE `classlist`
  ADD PRIMARY KEY (`MaSV`,`MaLop`),
  ADD KEY `MaLop` (`MaLop`);

--
-- Indexes for table `ctcn`
--
ALTER TABLE `ctcn`
  ADD PRIMARY KEY (`Nhom`,`MaCN`),
  ADD KEY `MaCN` (`MaCN`);

--
-- Indexes for table `dethi`
--
ALTER TABLE `dethi`
  ADD PRIMARY KEY (`MaDe`),
  ADD KEY `MaLop` (`MaLop`);

--
-- Indexes for table `diem_sv`
--
ALTER TABLE `diem_sv`
  ADD PRIMARY KEY (`MaSV`,`MaDe`),
  ADD KEY `MaDe` (`MaDe`);

--
-- Indexes for table `giangday`
--
ALTER TABLE `giangday`
  ADD PRIMARY KEY (`MaMon`,`MaGV`),
  ADD KEY `MaGV` (`MaGV`);

--
-- Indexes for table `giangvien`
--
ALTER TABLE `giangvien`
  ADD PRIMARY KEY (`MaGV`),
  ADD KEY `MaKhoa` (`MaKhoa`);

--
-- Indexes for table `ketqua`
--
ALTER TABLE `ketqua`
  ADD PRIMARY KEY (`MaSV`,`MaCH`,`MaDe`),
  ADD KEY `MaCH` (`MaCH`),
  ADD KEY `MaDe` (`MaDe`);

--
-- Indexes for table `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`MaKhoa`);

--
-- Indexes for table `monhoc`
--
ALTER TABLE `monhoc`
  ADD PRIMARY KEY (`MaMon`);

--
-- Indexes for table `nganh`
--
ALTER TABLE `nganh`
  ADD PRIMARY KEY (`MaNganh`),
  ADD KEY `MaKhoa` (`MaKhoa`);

--
-- Indexes for table `nhom_lop`
--
ALTER TABLE `nhom_lop`
  ADD PRIMARY KEY (`MaLop`),
  ADD KEY `MaGV` (`MaGV`),
  ADD KEY `MaMon` (`MaMon`);

--
-- Indexes for table `phanquyen`
--
ALTER TABLE `phanquyen`
  ADD PRIMARY KEY (`Nhom`);

--
-- Indexes for table `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD PRIMARY KEY (`MaSV`),
  ADD KEY `MaNganh` (`MaNganh`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `MaGV` (`MaGV`),
  ADD KEY `MaSV` (`MaSV`),
  ADD KEY `Nhom` (`Nhom`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD CONSTRAINT `cauhoi_ibfk_1` FOREIGN KEY (`MaChuong`) REFERENCES `chuong` (`MaChuong`);

--
-- Constraints for table `chitietmon`
--
ALTER TABLE `chitietmon`
  ADD CONSTRAINT `chitietmon_ibfk_1` FOREIGN KEY (`MaNganh`) REFERENCES `nganh` (`MaNganh`),
  ADD CONSTRAINT `chitietmon_ibfk_2` FOREIGN KEY (`MaMon`) REFERENCES `monhoc` (`MaMon`);

--
-- Constraints for table `chuong`
--
ALTER TABLE `chuong`
  ADD CONSTRAINT `chuong_ibfk_1` FOREIGN KEY (`MaMon`) REFERENCES `monhoc` (`MaMon`);

--
-- Constraints for table `classlist`
--
ALTER TABLE `classlist`
  ADD CONSTRAINT `classlist_ibfk_1` FOREIGN KEY (`MaSV`) REFERENCES `sinhvien` (`MaSV`),
  ADD CONSTRAINT `classlist_ibfk_2` FOREIGN KEY (`MaLop`) REFERENCES `nhom_lop` (`MaLop`);

--
-- Constraints for table `ctcn`
--
ALTER TABLE `ctcn`
  ADD CONSTRAINT `ctcn_ibfk_1` FOREIGN KEY (`Nhom`) REFERENCES `phanquyen` (`Nhom`),
  ADD CONSTRAINT `ctcn_ibfk_2` FOREIGN KEY (`MaCN`) REFERENCES `chucnang` (`MaCN`);

--
-- Constraints for table `dethi`
--
ALTER TABLE `dethi`
  ADD CONSTRAINT `dethi_ibfk_1` FOREIGN KEY (`MaLop`) REFERENCES `nhom_lop` (`MaLop`);

--
-- Constraints for table `diem_sv`
--
ALTER TABLE `diem_sv`
  ADD CONSTRAINT `diem_sv_ibfk_1` FOREIGN KEY (`MaSV`) REFERENCES `sinhvien` (`MaSV`),
  ADD CONSTRAINT `diem_sv_ibfk_2` FOREIGN KEY (`MaDe`) REFERENCES `dethi` (`MaDe`);

--
-- Constraints for table `giangday`
--
ALTER TABLE `giangday`
  ADD CONSTRAINT `giangday_ibfk_1` FOREIGN KEY (`MaMon`) REFERENCES `monhoc` (`MaMon`),
  ADD CONSTRAINT `giangday_ibfk_2` FOREIGN KEY (`MaGV`) REFERENCES `giangvien` (`MaGV`);

--
-- Constraints for table `giangvien`
--
ALTER TABLE `giangvien`
  ADD CONSTRAINT `giangvien_ibfk_1` FOREIGN KEY (`MaKhoa`) REFERENCES `khoa` (`MaKhoa`);

--
-- Constraints for table `ketqua`
--
ALTER TABLE `ketqua`
  ADD CONSTRAINT `ketqua_ibfk_1` FOREIGN KEY (`MaSV`) REFERENCES `sinhvien` (`MaSV`),
  ADD CONSTRAINT `ketqua_ibfk_2` FOREIGN KEY (`MaCH`) REFERENCES `cauhoi` (`MaCH`),
  ADD CONSTRAINT `ketqua_ibfk_3` FOREIGN KEY (`MaDe`) REFERENCES `dethi` (`MaDe`);

--
-- Constraints for table `nganh`
--
ALTER TABLE `nganh`
  ADD CONSTRAINT `nganh_ibfk_1` FOREIGN KEY (`MaKhoa`) REFERENCES `khoa` (`MaKhoa`);

--
-- Constraints for table `nhom_lop`
--
ALTER TABLE `nhom_lop`
  ADD CONSTRAINT `nhom_lop_ibfk_1` FOREIGN KEY (`MaGV`) REFERENCES `giangvien` (`MaGV`),
  ADD CONSTRAINT `nhom_lop_ibfk_2` FOREIGN KEY (`MaMon`) REFERENCES `monhoc` (`MaMon`);

--
-- Constraints for table `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD CONSTRAINT `sinhvien_ibfk_1` FOREIGN KEY (`MaNganh`) REFERENCES `nganh` (`MaNganh`);

--
-- Constraints for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `taikhoan_ibfk_1` FOREIGN KEY (`MaGV`) REFERENCES `giangvien` (`MaGV`),
  ADD CONSTRAINT `taikhoan_ibfk_2` FOREIGN KEY (`MaSV`) REFERENCES `sinhvien` (`MaSV`),
  ADD CONSTRAINT `taikhoan_ibfk_3` FOREIGN KEY (`Nhom`) REFERENCES `phanquyen` (`Nhom`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
