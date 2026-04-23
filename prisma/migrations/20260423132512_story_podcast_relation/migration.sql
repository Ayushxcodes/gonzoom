-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "podcastId" TEXT;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE SET NULL ON UPDATE CASCADE;
