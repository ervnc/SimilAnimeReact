-- CreateTable
CREATE TABLE "Users" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "name" TEXT,
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

-- CreateTable
CREATE TABLE "Characters" (
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

    PRIMARY KEY ("name", "usersUsername"),
    CONSTRAINT "Characters_usersUsername_fkey" FOREIGN KEY ("usersUsername") REFERENCES "Users" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
