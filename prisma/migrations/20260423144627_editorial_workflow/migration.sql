-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'DRAFT';
