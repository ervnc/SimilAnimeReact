-- CreateTable
CREATE TABLE "Characters" (
    "name" TEXT NOT NULL,
    "usersUsername" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "blood_type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sexuality" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "zodiac_sign" TEXT NOT NULL,
    "mbti" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,

    PRIMARY KEY ("name", "usersUsername"),
    CONSTRAINT "Characters_usersUsername_fkey" FOREIGN KEY ("usersUsername") REFERENCES "Users" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
