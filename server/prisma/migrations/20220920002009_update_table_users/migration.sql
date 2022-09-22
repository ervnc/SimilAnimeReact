-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" REAL,
    "height" REAL,
    "blood_type" TEXT,
    "gender" TEXT,
    "sexuality" TEXT,
    "birth_date" TEXT,
    "zodiac_sign" TEXT,
    "mbti" TEXT,
    "occupation" TEXT
);
INSERT INTO "new_Users" ("birth_date", "blood_type", "gender", "height", "mbti", "name", "occupation", "password", "sexuality", "username", "weight", "zodiac_sign") SELECT "birth_date", "blood_type", "gender", "height", "mbti", "name", "occupation", "password", "sexuality", "username", "weight", "zodiac_sign" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
