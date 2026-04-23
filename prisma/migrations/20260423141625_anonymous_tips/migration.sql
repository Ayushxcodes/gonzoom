-- CreateTable
CREATE TABLE "AnonymousTip" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "encrypted" BOOLEAN NOT NULL DEFAULT true,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonymousTip_pkey" PRIMARY KEY ("id")
);
