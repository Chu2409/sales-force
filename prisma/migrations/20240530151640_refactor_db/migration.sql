/*
  Warnings:

  - You are about to drop the column `perso n_id` on the `consumers` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `delegations` table. All the data in the column will be lost.
  - You are about to drop the column `parent_location_id` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `visit_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `visits` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[person_id]` on the table `consumers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `person_id` to the `consumers` table without a default value. This is not possible if the table is not empty.
  - Made the column `employee_id` on table `delegations` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tax` to the `pay_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChanceStatus" AS ENUM ('WON', 'LOST');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('CANCELED', 'COMPLETED', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('VISIT', 'CALL');

-- DropForeignKey
ALTER TABLE "consumers" DROP CONSTRAINT "consumers_perso n_id_fkey";

-- DropForeignKey
ALTER TABLE "delegations" DROP CONSTRAINT "delegations_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "delegations" DROP CONSTRAINT "delegations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_parent_location_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pay_method_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_visit_id_fkey";

-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_delegation_id_fkey";

-- DropIndex
DROP INDEX "consumers_perso n_id_key";

-- AlterTable
ALTER TABLE "consumers" DROP COLUMN "perso n_id",
ADD COLUMN     "person_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "delegations" DROP COLUMN "location_id",
ALTER COLUMN "employee_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "parent_location_id",
ADD COLUMN     "parent_id" INTEGER;

-- AlterTable
ALTER TABLE "pay_methods" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "people" ADD COLUMN     "location_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "visit_id",
ADD COLUMN     "task_id" INTEGER,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "pay_method_id" DROP NOT NULL;

-- DropTable
DROP TABLE "visits";

-- DropEnum
DROP TYPE "VisitStatus";

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "module_id" INTEGER NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotas" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "goal" DOUBLE PRECISION NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "is_achieved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chances" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "ChanceStatus",
    "date" TIMESTAMP(3) NOT NULL,
    "delegation_id" INTEGER NOT NULL,

    CONSTRAINT "chances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TaskStatus",
    "type" "TaskType" NOT NULL,
    "estimated_time" INTEGER,
    "delegation_id" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modules_name_key" ON "modules"("name");

-- CreateIndex
CREATE UNIQUE INDEX "consumers_person_id_key" ON "consumers"("person_id");

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumers" ADD CONSTRAINT "consumers_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delegations" ADD CONSTRAINT "delegations_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chances" ADD CONSTRAINT "chances_delegation_id_fkey" FOREIGN KEY ("delegation_id") REFERENCES "delegations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_delegation_id_fkey" FOREIGN KEY ("delegation_id") REFERENCES "delegations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_pay_method_id_fkey" FOREIGN KEY ("pay_method_id") REFERENCES "pay_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
