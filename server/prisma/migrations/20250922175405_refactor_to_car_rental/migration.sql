/*
  Warnings:

  - You are about to drop the column `productId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productoncart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productonorder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `carId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_orderedById_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_orderedById_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productonorder` DROP FOREIGN KEY `ProductOnOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `productonorder` DROP FOREIGN KEY `ProductOnOrder_productId_fkey`;

-- DropIndex
DROP INDEX `Image_productId_fkey` ON `image`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `productId`,
    ADD COLUMN `carId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `address`,
    DROP COLUMN `picture`,
    ADD COLUMN `telephone` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `cart`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `productoncart`;

-- DropTable
DROP TABLE `productonorder`;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `licensePlate` VARCHAR(191) NOT NULL,
    `pricePerDay` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'available',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Car_licensePlate_key`(`licensePlate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarRental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `renterId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarRental` ADD CONSTRAINT `CarRental_renterId_fkey` FOREIGN KEY (`renterId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarRental` ADD CONSTRAINT `CarRental_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
