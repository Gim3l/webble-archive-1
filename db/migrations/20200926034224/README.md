# Migration `20200926034224`

This migration has been generated by Gimel Dick at 9/25/2020, 11:42:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
)

CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tutorProfileId" INTEGER
)

CREATE TABLE "TutorProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "TutorProfileOnSubject" (
    "tutorProfileId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("tutorProfileId","subjectId")
)

PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user'
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "email", "hashedPassword", "role", "firstName", "lastName") SELECT "id", "createdAt", "updatedAt", "email", "hashedPassword", "role", "firstName", "lastName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON

CREATE UNIQUE INDEX "TutorProfile_userId_unique" ON "TutorProfile"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200926015719..20200926034224
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,18 +12,18 @@
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
-  createdAt      DateTime  @default(now())
-  updatedAt      DateTime  @updatedAt
-  name           String?
+  id             Int           @default(autoincrement()) @id
+  createdAt      DateTime      @default(now())
+  updatedAt      DateTime      @updatedAt
   firstName      String
   lastName       String
-  email          String    @unique
+  email          String        @unique
   hashedPassword String?
-  role           String    @default("user")
+  role           String        @default("user")
   sessions       Session[]
+  TutorProfile   TutorProfile?
 }
 model Session {
   id                 Int       @default(autoincrement()) @id
@@ -44,4 +44,38 @@
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   name      String
 }
+
+model Exam {
+  id        Int      @default(autoincrement()) @id
+  name      String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+model Subject {
+  id                    Int                     @default(autoincrement()) @id
+  name                  String
+  createdAt             DateTime                @default(now())
+  updatedAt             DateTime                @updatedAt
+  tutorProfileId        Int?
+  TutorProfileOnSubject TutorProfileOnSubject[]
+}
+
+model TutorProfile {
+  id                    Int                     @default(autoincrement()) @id
+  user                  User                    @relation(fields: [userId], references: [id])
+  userId                Int
+  createdAt             DateTime                @default(now())
+  updatedAt             DateTime                @updatedAt
+  TutorProfileOnSubject TutorProfileOnSubject[]
+}
+
+model TutorProfileOnSubject {
+  tutorProfile   TutorProfile @relation(fields: [tutorProfileId], references: [id])
+  tutorProfileId Int
+  subject        Subject      @relation(fields: [subjectId], references: [id])
+  subjectId      Int
+
+  @@id([tutorProfileId, subjectId])
+}
```

