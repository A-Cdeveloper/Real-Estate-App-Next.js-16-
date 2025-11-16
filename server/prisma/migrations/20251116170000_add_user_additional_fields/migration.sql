-- Add additional fields to user table
ALTER TABLE `user` 
  ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN `lastLogin` DATETIME(3) NULL,
  ADD COLUMN `passwordResetToken` VARCHAR(191) NULL,
  ADD COLUMN `passwordResetTokenExpiry` DATETIME(3) NULL;

