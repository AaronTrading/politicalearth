-- CreateTable
CREATE TABLE "military_rankings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rank" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "power" REAL NOT NULL,
    "budget" TEXT NOT NULL,
    "forces" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "economic_rankings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rank" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "gdp" TEXT NOT NULL,
    "growth" TEXT NOT NULL,
    "trade" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "news" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "game_date" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "military_rankings_rank_key" ON "military_rankings"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "economic_rankings_rank_key" ON "economic_rankings"("rank");
