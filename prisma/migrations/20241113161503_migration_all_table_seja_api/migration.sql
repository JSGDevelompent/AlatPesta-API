-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NULL,
    `limitToken` DATETIME(3) NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `icon` TEXT NULL,
    `aboutUs` TEXT NULL,
    `termsAndConditions` TEXT NULL,
    `linkGMap` TEXT NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `facebook` VARCHAR(255) NULL,
    `twitter` VARCHAR(255) NULL,
    `instagram` VARCHAR(255) NULL,
    `linkedIn` VARCHAR(255) NULL,
    `youtube` VARCHAR(255) NULL,
    `shopee` VARCHAR(255) NULL,
    `lazada` VARCHAR(255) NULL,
    `tokoPedia` VARCHAR(255) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `QuestionsAndAnswers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `ShippingPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PriceDistance', 'FixedPrice') NOT NULL DEFAULT 'FixedPrice',
    `price` INTEGER NOT NULL DEFAULT 0,
    `distance` FLOAT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `Promo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `type` ENUM('Discount', 'FreeShipping', 'DayRentDiscount') NOT NULL,
    `image` TEXT NOT NULL,
    `promoEndDate` DATETIME(0) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `Discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discountModel` ENUM('FixedPrice', 'RateDiscount') NOT NULL DEFAULT 'RateDiscount',
    `maximumDiscount` INTEGER NULL,
    `minPrice` INTEGER NOT NULL DEFAULT 0,
    `discount` INTEGER NOT NULL DEFAULT 0,
    `promoId` INTEGER NOT NULL,

    UNIQUE INDEX `Discount_promoId_key`(`promoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `DayRentDiscount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `minDay` INTEGER NOT NULL DEFAULT 0,
    `minPrice` INTEGER NOT NULL DEFAULT 0,
    `discountModel` ENUM('FixedPrice', 'RateDiscount') NOT NULL DEFAULT 'RateDiscount',
    `discount` INTEGER NOT NULL DEFAULT 0,
    `maximumDiscount` INTEGER NOT NULL DEFAULT 0,
    `promoId` INTEGER NOT NULL,

    UNIQUE INDEX `DayRentDiscount_promoId_key`(`promoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `FreeShipping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maximumDiscount` INTEGER NULL,
    `discountModel` ENUM('FixedPrice', 'RateDiscount') NOT NULL DEFAULT 'RateDiscount',
    `discount` INTEGER NOT NULL DEFAULT 0,
    `minDay` INTEGER NOT NULL DEFAULT 0,
    `minPrice` INTEGER NOT NULL DEFAULT 0,
    `maxDistance` FLOAT NOT NULL DEFAULT 0,
    `promoId` INTEGER NOT NULL,

    UNIQUE INDEX `FreeShipping_promoId_key`(`promoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `news` TEXT NULL,
    `image` TEXT NULL,
    `show` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `TypeTools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TypeTools_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `ModelTools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ModelTools_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `Tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` TEXT NOT NULL,
    `description` TEXT NULL,
    `price` INTEGER NOT NULL,
    `modelId` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,
    `colorsId` INTEGER NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `SubTools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `toolsId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `SubToolsImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` TEXT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `subToolsId` INTEGER NOT NULL,
    `colors` JSON NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `ColorTools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `colors` JSON NOT NULL,
    `options` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ColorTools_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `Visitors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page` VARCHAR(255) NOT NULL,
    `visitCount` INTEGER NOT NULL DEFAULT 0,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_promoId_fkey` FOREIGN KEY (`promoId`) REFERENCES `Promo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DayRentDiscount` ADD CONSTRAINT `DayRentDiscount_promoId_fkey` FOREIGN KEY (`promoId`) REFERENCES `Promo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FreeShipping` ADD CONSTRAINT `FreeShipping_promoId_fkey` FOREIGN KEY (`promoId`) REFERENCES `Promo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tools` ADD CONSTRAINT `Tools_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `TypeTools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tools` ADD CONSTRAINT `Tools_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ModelTools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tools` ADD CONSTRAINT `Tools_colorsId_fkey` FOREIGN KEY (`colorsId`) REFERENCES `ColorTools`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubTools` ADD CONSTRAINT `SubTools_toolsId_fkey` FOREIGN KEY (`toolsId`) REFERENCES `Tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubToolsImage` ADD CONSTRAINT `SubToolsImage_subToolsId_fkey` FOREIGN KEY (`subToolsId`) REFERENCES `SubTools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
