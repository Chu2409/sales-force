/*
  Warnings:

  - You are about to drop the column `parent_id` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `locations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `locations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_parent_id_fkey";

-- AlterTable
ALTER TABLE "delegations" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "parent_id",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "LocationType";

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");
