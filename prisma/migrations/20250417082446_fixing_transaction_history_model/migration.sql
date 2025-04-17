/*
  Warnings:

  - You are about to drop the column `amount` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `service_code` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `service_name` on the `TransactionHistory` table. All the data in the column will be lost.
  - Added the required column `description` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_number` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "amount",
DROP COLUMN "service_code",
DROP COLUMN "service_name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "invoice_number" TEXT NOT NULL;
