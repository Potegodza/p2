-- AlterTable
ALTER TABLE `carrental` ADD COLUMN `freeDays` INTEGER NULL,
    ADD COLUMN `originalPrice` DOUBLE NULL,
    ADD COLUMN `promotionApplied` BOOLEAN NOT NULL DEFAULT false;
