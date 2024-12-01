-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "shorturl" TEXT NOT NULL,
    "redirecturl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitCount" INTEGER DEFAULT 0,
    "visitHistory" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shorturl_key" ON "Url"("shorturl");
