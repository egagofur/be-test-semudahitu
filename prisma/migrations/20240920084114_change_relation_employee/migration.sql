/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - The `id` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `birthPlace` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `citizenIdAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `homePhoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nationalIdNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passportExpiryDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passportNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `residenceAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `usesResidence` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nik]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passportNumber]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `approvalLine` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentStatus` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobLevel` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobPosition` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobilePhone` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sbu` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropIndex
DROP INDEX "Employee_userId_key";

-- DropIndex
DROP INDEX "User_homePhoneNumber_key";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "userId",
ADD COLUMN     "approvalLine" TEXT NOT NULL,
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "citizenIdAddress" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "employmentStatus" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "jobLevel" TEXT NOT NULL,
ADD COLUMN     "jobPosition" TEXT NOT NULL,
ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "manager" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "mobilePhone" TEXT NOT NULL,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "passportExpiry" TIMESTAMP(3),
ADD COLUMN     "passportNumber" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "placeOfBirth" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "residentialAddress" TEXT,
ADD COLUMN     "sbu" TEXT NOT NULL,
ADD COLUMN     "schedule" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "barcode" DROP NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
DROP COLUMN "birthPlace",
DROP COLUMN "bloodType",
DROP COLUMN "citizenIdAddress",
DROP COLUMN "gender",
DROP COLUMN "homePhoneNumber",
DROP COLUMN "maritalStatus",
DROP COLUMN "nationalIdNumber",
DROP COLUMN "passportExpiryDate",
DROP COLUMN "passportNumber",
DROP COLUMN "postalCode",
DROP COLUMN "religion",
DROP COLUMN "residenceAddress",
DROP COLUMN "usesResidence";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nik_key" ON "Employee"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_passportNumber_key" ON "Employee"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");
