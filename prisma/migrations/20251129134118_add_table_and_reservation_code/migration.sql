/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `code` VARCHAR(191) NULL,
  ADD COLUMN `tableId` INTEGER NULL;

-- Generate codes for existing reservations
UPDATE `Reservation` SET `code` = CONCAT('HQ', LPAD(id, 5, '0')) WHERE `code` IS NULL;

-- Make code NOT NULL after populating
ALTER TABLE `Reservation` MODIFY COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `positionTop` VARCHAR(191) NULL,
    `positionBottom` VARCHAR(191) NULL,
    `positionLeft` VARCHAR(191) NOT NULL,
    `shape` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Table_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_code_key` ON `Reservation`(`code`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
