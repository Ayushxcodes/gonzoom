-- CreateTable
CREATE TABLE "RelatedStory" (
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relationType" TEXT NOT NULL,

    CONSTRAINT "RelatedStory_pkey" PRIMARY KEY ("fromId","toId")
);
