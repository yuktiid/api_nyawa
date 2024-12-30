-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 29, 2024 at 08:36 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

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
  `gambar` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoris`
--

INSERT INTO `kategoris` (`id_kategori`, `id_akun`, `nama_kategori`, `slug`, `gambar`, `createdAt`, `updatedAt`) VALUES
('1709130863154', '345431232', 'Men\'s Bestsellers', 'mens-bestsellers', 'cat-1709130863151-84037674.webp', '2024-02-28 14:34:23', '2024-02-28 14:34:23');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id_payment` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
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
  `ukuran` varchar(255) NOT NULL,
  `jumlah_barang` varchar(255) NOT NULL,
  `harga_satuan` varchar(255) NOT NULL,
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
('1709131055011', '345431232', '1709130863154', 'AITO MANN - White', 'aito-mann-white', '<p>Detail</p><p>Bagian penting ideal yang disukai semua orang. Kemeja putih berukuran besar dan lucu dengan lengan panjang berpotongan horizontal bersih di bagian depan dan dilengkapi saku lebar untuk tampilan formal.</p><p>Ukurannya besar jadi jika Anda menginginkan potongan yang lebih pas, pilih 1 ukuran lebih kecil dari ukuran normal Anda.</p><p>UKURAN XS<br>Lingkar Dada: 110 cm<br>Panjang Punggung : 74 cm<br>Lebar Bahu: 55 cm<br>Panjang Lengan: 55 cm<br>Bukaan Lengan: 23 cm</p><p>UKURAN S<br>Dada: 114 cm<br>Panjang Punggung : 76 cm<br>Lebar Bahu: 57 cm<br>Panjang Lengan: 56 cm<br>Bukaan Lengan: 24 cm</p><p>UKURAN M<br>Dada: 118 cm<br>Panjang Punggung : 78 cm<br>Lebar Bahu: 59 cm<br>Panjang Lengan: 57 cm<br>Bukaan Lengan: 25 cm</p><p>UKURAN L<br>Dada: 122 cm<br>Panjang Punggung : 80 cm<br>Lebar Bahu: 61 cm<br>Panjang Lengan: 58 cm<br>Bukaan Lengan: 26 cm</p><p>UKURAN XL<br>Dada: 126cm<br>Panjang Punggung : 82 cm<br>Lebar Bahu: 63 cm<br>Panjang Lengan: 59 cm<br>Bukaan Lengan: 27 cm</p><p>UKURAN XXL<br>Lingkar Dada: 130 cm<br>Panjang Punggung : 84 cm<br>Lebar Bahu: 65 cm<br>Panjang Lengan: 60 cm<br>Bukaan Lengan: 28 cm</p><p>&nbsp;</p><p>Bahan: Campuran Poli<br>Tinggi model 185 cm dan memakai size L</p><p>Catatan:</p><p>* Perlu diketahui bahwa produk kami mungkin berbeda 1-2 cm (kedua sisi) dari ukuran kami<br>&nbsp; grafik, karena keahliannya.<br>*Ketebalan kain dapat berbeda per batch</p>', '[{\"xs\":90},{\"s\":89},{\"m\":94},{\"l\":100},{\"xl\":100}]', '#ffffff', '[\"xs\",\"s\",\"m\",\"l\",\"xl\"]', '1', 755000, 0, '[\"foto-1709131055003-959936834.webp\",\"foto-1709131055004-357753006.webp\",\"foto-1709131055005-799622104.webp\",\"foto-1709131055006-800199789.webp\"]', '2024-02-28 14:37:35', '2024-02-29 07:13:16');

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
('20231230084230-create-payments-table.js');

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
