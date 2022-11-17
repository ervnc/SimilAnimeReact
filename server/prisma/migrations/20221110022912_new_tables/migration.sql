/*
  Warnings:

  - Made the column `birth_date` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `blood_type` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mbti` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `occupation` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sexuality` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zodiac_sign` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `similarity` to the `Characters` table without a default value. This is not possible if the table is not empty.
  - Made the column `birthday` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `blood_type` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mbti` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `occupation` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sexuality` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `Characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zodiac_sign` on table `Characters` required. This step will fail if there are existing NULL values in that column.

*/
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
CREATE TABLE "new_Characters" (
    "name" TEXT NOT NULL,
    "usersUsername" TEXT NOT NULL,
    "weight" REAL,
    "height" REAL,
    "blood_type" TEXT,
    "gender" TEXT,
    "sexuality" TEXT,
    "birthday" TEXT,
    "zodiac_sign" TEXT,
    "mbti" TEXT,
    "occupation" TEXT,
    "similarity" TEXT,

    PRIMARY KEY ("name", "usersUsername"),
    CONSTRAINT "Characters_usersUsername_fkey" FOREIGN KEY ("usersUsername") REFERENCES "Users" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Characters" ("birthday", "blood_type", "gender", "height", "mbti", "name", "occupation", "sexuality", "usersUsername", "weight", "zodiac_sign") SELECT "birthday", "blood_type", "gender", "height", "mbti", "name", "occupation", "sexuality", "usersUsername", "weight", "zodiac_sign" FROM "Characters";
DROP TABLE "Characters";
ALTER TABLE "new_Characters" RENAME TO "Characters";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
