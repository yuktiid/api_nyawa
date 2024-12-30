-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2024 at 11:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_nyawa`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategoris`
--

CREATE TABLE `kategoris` (
  `id_kategori` varchar(255) NOT NULL,
  `id_akun` varchar(255) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `slug` text NOT NULL,
  `deskripsi` text NOT NULL,
  `gambar` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoris`
--

INSERT INTO `kategoris` (`id_kategori`, `id_akun`, `nama_kategori`, `slug`, `deskripsi`, `gambar`, `createdAt`, `updatedAt`) VALUES
('1723724704534', '345431232', 'LAKI-LAKI', 'laki-laki', '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta impedit, culpa praesentium ipsa aliquam dignissimos rerum consectetur quo, suscipit, eaque labore harum quisquam rem ab?</p>', 'cat-1723724704532-451119416.webp', '2024-08-15 12:25:04', '2024-08-15 12:40:55'),
('1723724761931', '345431232', 'PEREMPUAN', 'perempuan', '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta impedit, culpa praesentium ipsa aliquam dignissimos rerum consectetur quo, suscipit, eaque labore harum quisquam rem ab?</p>', 'cat-1723724761929-116072665.webp', '2024-08-15 12:26:01', '2024-08-15 12:40:39');

-- --------------------------------------------------------

--
-- Table structure for table `paymentitems`
--

CREATE TABLE `paymentitems` (
  `id_item` varchar(255) NOT NULL,
  `id_payment` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `ukuran` varchar(255) NOT NULL,
  `jumlah_barang` int(11) NOT NULL,
  `harga_satuan` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id_payment` varchar(255) NOT NULL,
  `noResi` varchar(255) DEFAULT NULL,
  `checkout_link` text NOT NULL,
  `external_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_hp` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `nama_pengiriman` varchar(255) NOT NULL,
  `harga_pengiriman` varchar(255) NOT NULL,
  `berat` varchar(255) NOT NULL,
  `total_harga` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produks`
--

CREATE TABLE `produks` (
  `id_produk` varchar(255) NOT NULL,
  `id_akun` varchar(255) NOT NULL,
  `id_kategori` varchar(255) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `slug` text NOT NULL,
  `deskripsi` text NOT NULL,
  `stok` text NOT NULL,
  `warna` text NOT NULL,
  `ukuran` text NOT NULL,
  `berat` varchar(255) NOT NULL,
  `harga` bigint(20) NOT NULL,
  `diskon` int(11) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produks`
--

INSERT INTO `produks` (`id_produk`, `id_akun`, `id_kategori`, `nama_produk`, `slug`, `deskripsi`, `stok`, `warna`, `ukuran`, `berat`, `harga`, `diskon`, `gambar`, `createdAt`, `updatedAt`) VALUES
('1717618192118', '345431232', '1723724761931', 'MIEKO - Antique White', 'mieko-antique-white', '<p><strong>DETAILS</strong><br>Crop long-sleeved shirt distinguished by patch pocket detailing, side slits, and sleeves designed with a puff effect achieved through strategically placed darts.<br><br>This style is oversized and runs big, so if you desire a more fitted cut, choose 1 size smaller than your normal size.<br><br><strong>SIZE XS</strong><br>Bust: 129 cm<br>Back Length: 63 cm<br>Shoulder Width: 49 cm<br>Armhole: 47 cm<br>Sleeve Length: 42.7 cm<br>Sleeve Opening: 31 cm<br><br><strong>SIZE S</strong><br>Bust: 133 cm<br>Back Length: 65 cm<br>Shoulder Width: 50 cm<br>Armhole: 49 cm<br>Sleeve Length: 44.7 cm<br>Sleeve Opening: 31.5 cm<br><br><strong>SIZE M</strong><br>Bust: 137 cm<br>Back Length: 67 cm<br>Shoulder Width: 51 cm<br>Armhole: 51 cm<br>Sleeve Length: 46.7 cm<br>Sleeve Opening: 32 cm<br><br><strong>SIZE L</strong><br>Bust: 141 cm<br>Back Length: 69 cm<br>Shoulder Width: 52 cm<br>Armhole: 53 cm<br>Sleeve Length: 47.7 cm<br>Sleeve Opening: 32.8 cm<br><br><strong>SIZE XL</strong><br>Bust: 145 cm<br>Back Length: 71 cm<br>Shoulder Width: 53 cm<br>Armhole: 55 cm<br>Sleeve Length: 47.7 cm<br>Sleeve Opening: 33.6 cm<br><br><br>Material: Poly Rayon<br>Color: Antique White<br>Female model\'s height is 175 and wearing size M<br><br>Note:<br><br>* Please be aware that our product may differ 1-2 cm (both sides) from our size chart, due to its craftsmanship.<br>* Fabric thickness can be different per batch</p>', '[{\"m\":98},{\"l\":100},{\"xl\":100},{\"xxl\":98}]', '#ffffff', '[\"m\",\"l\",\"xl\",\"xxl\"]', '1', 1255000, 0, '[\"foto-1723723108820-873519873.webp\",\"foto-1723723108822-86487132.webp\",\"foto-1723723108823-221704833.webp\",\"foto-1723723108823-307539984.webp\"]', '2024-06-05 20:09:52', '2024-09-16 13:15:20'),
('1717618322082', '345431232', '1723724704534', 'SACHI - White', 'sachi-white', '<p><strong>DETAILS</strong><br>Short sleeve knit shirt featuring a regular collar and a center front zipper opening for ease of wear.</p><p>This style features a relaxed fit. If you desire a more fitted cut, choose 1 size smaller than your normal size and if you desire a more oversized cut, choose 1 size bigger than your normal size.</p><p><strong>SIZE XS</strong><br>Chest: 113 cm<br>Back Length: 66 cm<br>Shoulder Width: 47 cm<br>Armhole: 43 cm<br>Sleeve Length: 20.5 cm<br>Sleeve Opening: 42 cm</p><p><strong>SIZE S</strong><br>Chest: 117 cm<br>Back Length: 68 cm<br>Shoulder Width: 48.5 cm<br>Armhole: 45 cm<br>Sleeve Length: 22.5 cm<br>Sleeve Opening: 42.5 cm</p><p><strong>SIZE M</strong><br>Chest: 121 cm<br>Back Length: 70 cm<br>Shoulder Width: 50 cm<br>Armhole: 47 cm<br>Sleeve Length: 24.5 cm<br>Sleeve Opening: 43 cm</p><p><strong>SIZE L</strong><br>Chest: 125 cm<br>Back Length: 71 cm<br>Shoulder Width: 51.5 cm<br>Armhole: 49 cm<br>Sleeve Length: 25.5 cm<br>Sleeve Opening: 43.8 cm&nbsp;</p><p><br><strong>SIZE XL</strong><br>Chest: 129 cm<br>Back Length: 72 cm<br>Shoulder Width: 53 cm<br>Armhole: 51 cm<br>Sleeve Length: 26.5 cm<br>Sleeve Opening: 44.6 cm&nbsp;</p><p><br><strong>SIZE XXL</strong><br>Chest: 133 cm<br>Back Length: 73 cm<br>Shoulder Width: 54.5 cm<br>Armhole: 53 cm<br>Sleeve Length: 26.5 cm<br>Sleeve Opening: 45.4 cm&nbsp;</p><p>Material: Cotton Blend<br>Color: White<br>Male model\'s height is 186 cm and wearing size M</p><p>Note:<br>* Please be aware that our product may differ 1-2 cm (both sides) from our size chart due to its craftsmanship.<br>* Fabric thickness can be different per batch</p>', '[{\"m\":100},{\"l\":98},{\"xl\":100},{\"xxl\":100}]', '#ffffff', '[\"m\",\"l\",\"xl\",\"xxl\"]', '1', 1055000, 0, '[\"foto-1723723261397-536801337.webp\",\"foto-1723723261398-744087156.webp\",\"foto-1723723261399-313286590.webp\",\"foto-1723723261400-306346133.webp\"]', '2024-06-05 20:12:02', '2024-09-21 09:10:19'),
('1723723554476', '345431232', '1723724761931', 'TORI - Petal Pink', 'tori-petal-pink', '<p><strong>DETAILS</strong><br>Short-sleeve shirt distinguished by a double stand collar and two patch pockets featuring rounded openings. The sleeve incorporates a slit. Alongside the side seam hem is a discreetly integrated cord.<br><br>This style is oversized and runs big, so if you desire a more fitted cut, choose 1 size smaller than your normal size.<br><br><strong>SIZE XS</strong><br>Bust: 128 cm<br>Back Length: 50 cm<br>Shoulder Width: 54 cm<br>Armhole: 53 cm<br>Sleeve Length: 17.5 cm<br>Sleeve Opening: 49 cm<br><br><strong>SIZE S</strong><br>Bust: 132 cm<br>Back Length: 52 cm<br>Shoulder Width: 55 cm<br>Armhole: 55 cm<br>Sleeve Length: 19.5 cm<br>Sleeve Opening: 49.5 cm<br><br><strong>SIZE M</strong><br>Bust: 136 cm<br>Back Length: 54 cm<br>Shoulder Width: 56 cm<br>Armhole: 57 cm<br>Sleeve Length: 21.5 cm<br>Sleeve Opening: 50 cm<br><br><strong>SIZE L</strong><br>Bust: 140 cm<br>Back Length: 55 cm<br>Shoulder Width: 57 cm<br>Armhole: 59 cm<br>Sleeve Length: 22.5 cm<br>Sleeve Opening: 50.8 cm<br><br><strong>SIZE XL</strong><br>Bust: 144 cm<br>Back Length: 56 cm<br>Shoulder Width: 58 cm<br>Armhole: 61 cm<br>Sleeve Length: 22.5 cm<br>Sleeve Opening: 51.6 cm<br><br><br>Material: Modal™ Blend<br>Color: Petal Pink<br>Female model\'s height is 175 and wearing size M<br><br>Note:<br><br>* Please be aware that our product may differ 1-2 cm (both sides) from our size chart, due to its craftsmanship.<br>* Fabric thickness can be different per batch</p>', '[{\"m\":99},{\"l\":99},{\"xl\":100},{\"xxl\":100}]', '#dbd6dc', '[\"m\",\"l\",\"xl\",\"xxl\"]', '1', 995000, 12, '[\"foto-1723723554470-148542072.webp\",\"foto-1723723554472-515859237.webp\",\"foto-1723723554473-750769899.webp\",\"foto-1723723554475-597949011.webp\"]', '2024-08-15 12:05:54', '2024-09-21 09:10:19'),
('1723724441423', '345431232', '1723724761931', 'SUMI DRESS - White', 'sumi-dress-white', '<p><strong>DETAILS</strong><br>The knee-length dress showcases an oversized, loose silhouette with distinctive puff sleeve detailing, complemented by a rounded opening patch pocket positioned on the left chest.<br><br>This style is oversized and runs big, so if you desire a more fitted cut, choose 1 size smaller than your normal size.<br><br><strong>SIZE XS</strong><br>Bust: 130 cm<br>Back Length: 98.5 cm<br>Shoulder Width: 48.5 cm<br>Sleeve Length: 37.5 cm<br>Sleeve Opening: 31.6 cm<br><br><strong>SIZE S</strong><br>Bust: 134 cm<br>Back Length: 100.5 cm<br>Shoulder Width: 49.5 cm<br>Sleeve Length: 39.5 cm<br>Sleeve Opening: 32.1 cm<br><br><strong>SIZE M</strong><br>Bust: 138 cm<br>Back Length: 102.5 cm<br>Shoulder Width: 50.5 cm<br>Sleeve Length: 41.5 cm<br>Sleeve Opening: 32.6 cm<br><br><strong>SIZE L</strong><br>Bust: 142 cm<br>Back Length: 103.5 cm<br>Shoulder Width: 51.5 cm<br>Sleeve Length: 42.5 cm<br>Sleeve Opening: 33.4 cm<br><br><strong>SIZE XL</strong><br>Bust: 146 cm<br>Back Length: 104.5 cm<br>Shoulder Width: 52.5 cm<br>Sleeve Length: 42.5 cm<br>Sleeve Opening: 34.2 cm<br><br><br>Material: Poly Rayon<br>Color: White<br>Female model\'s height is 175 and wearing size M<br><br>Note:<br><br>* Please be aware that our product may differ 1-2 cm (both sides) from our size chart, due to its craftsmanship.<br>* Fabric thickness can be different per batch</p>', '[{\"m\":98},{\"l\":98},{\"xl\":98},{\"xxl\":100}]', '#ffffff', '[\"m\",\"l\",\"xl\",\"xxl\"]', '1', 1675000, 10, '[\"foto-1723724441420-237028526.webp\",\"foto-1723724441421-969547196.webp\",\"foto-1723724441422-473507492.webp\"]', '2024-08-15 12:20:41', '2024-09-21 09:10:19');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20231213043001-create-users-table.js'),
('20231213043239-create-produks-table.js'),
('20231213043304-create-kategoris-table.js'),
('20231230084230-create-payments-table.js'),
('20240816151716-create-carts-table.js'),
('20240915054522-create-paymentitems-table.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_akun` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_akun`, `nama`, `email`, `password`, `salt`, `status`, `foto`, `createdAt`, `updatedAt`) VALUES
('345431232', 'admin', 'admin@gmail.com', '88b0a7b71f3bfec23389a7da766ee859477c671ac6a3ca37cc310f60729c1526b6067e2c7927d2b6160bc986d9be99cb062a861ca33becdf17060fe2b408a10b', 'aadd4e2f71c4b57928910bb952b1aeda', 1, 'foto-1703268210375-86223357.webp', '2023-12-14 07:52:50', '2023-12-22 18:05:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategoris`
--
ALTER TABLE `kategoris`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `paymentitems`
--
ALTER TABLE `paymentitems`
  ADD PRIMARY KEY (`id_item`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id_payment`);

--
-- Indexes for table `produks`
--
ALTER TABLE `produks`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_akun`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
