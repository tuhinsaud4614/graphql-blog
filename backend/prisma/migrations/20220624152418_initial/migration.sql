-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "authorStatus" TEXT,
    "slug" TEXT NOT NULL,
    "avatarId" TEXT,
    "about" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("about", "authorStatus", "avatarId", "createdAt", "email", "id", "mobile", "name", "password", "role", "slug", "updatedAt") SELECT "about", "authorStatus", "avatarId", "createdAt", "email", "id", "mobile", "name", "password", coalesce("role", 'USER') AS "role", "slug", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
