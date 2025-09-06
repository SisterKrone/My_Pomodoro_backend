-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PomodoroSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studyTime" INTEGER NOT NULL,
    "breakTime" INTEGER NOT NULL,
    "cycles" INTEGER NOT NULL,
    "currentCycle" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "periodEndsAt" DATETIME,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PomodoroSession" ("breakTime", "createdAt", "currentCycle", "cycles", "id", "periodEndsAt", "status", "studyTime", "updatedAt") SELECT "breakTime", "createdAt", "currentCycle", "cycles", "id", "periodEndsAt", "status", "studyTime", "updatedAt" FROM "PomodoroSession";
DROP TABLE "PomodoroSession";
ALTER TABLE "new_PomodoroSession" RENAME TO "PomodoroSession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
