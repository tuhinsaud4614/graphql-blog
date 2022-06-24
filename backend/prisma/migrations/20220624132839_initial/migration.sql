/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "Profile_avatarId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Profile";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT DEFAULT 'USER',
    "authorStatus" TEXT,
    "slug" TEXT NOT NULL,
    "avatarId" TEXT,
    "about" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("authorStatus", "createdAt", "email", "id", "mobile", "name", "password", "role", "slug", "updatedAt") SELECT "authorStatus", "createdAt", "email", "id", "mobile", "name", "password", "role", "slug", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
