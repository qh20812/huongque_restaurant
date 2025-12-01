-- CreateTable
CREATE TABLE `SetMenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `price` INTEGER NOT NULL,
    `servesMin` INTEGER NULL,
    `servesMax` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SetMenu_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SetMenuSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setMenuId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SetMenuDish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setMenuSectionId` INTEGER NOT NULL,
    `dishId` INTEGER NOT NULL,
    `notes` TEXT NULL,
    `quantity` INTEGER NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `SetMenuDish_setMenuSectionId_dishId_key`(`setMenuSectionId`, `dishId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SetMenuSection` ADD CONSTRAINT `SetMenuSection_setMenuId_fkey` FOREIGN KEY (`setMenuId`) REFERENCES `SetMenu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SetMenuDish` ADD CONSTRAINT `SetMenuDish_setMenuSectionId_fkey` FOREIGN KEY (`setMenuSectionId`) REFERENCES `SetMenuSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SetMenuDish` ADD CONSTRAINT `SetMenuDish_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
