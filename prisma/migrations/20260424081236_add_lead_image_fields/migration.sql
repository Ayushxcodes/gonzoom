-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "clipEndSec" INTEGER,
ADD COLUMN     "clipStartSec" INTEGER,
ADD COLUMN     "clipTitle" TEXT;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "distributionReady" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "leadImageAssetId" TEXT,
ADD COLUMN     "newsletterSnippet" TEXT,
ADD COLUMN     "quoteText" TEXT,
ADD COLUMN     "socialCaption" TEXT;
