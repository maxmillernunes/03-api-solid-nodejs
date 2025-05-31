/*
  Warnings:

  - You are about to alter the column `latitude` on the `gyms` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `longitude` on the `gyms` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "gyms" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(65,30);
