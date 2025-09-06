/*
  Warnings:

  - You are about to drop the `Cycle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cycle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PomodoroSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studyTime" INTEGER NOT NULL,
    "breakTime" INTEGER NOT NULL,
    "cycles" INTEGER NOT NULL,
    "currentCycle" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
