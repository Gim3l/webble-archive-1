# Migration `20200926192511`

This migration has been generated by Gimel Dick at 9/26/2020, 3:25:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Subject" ("id", "name", "createdAt", "updatedAt") SELECT "id", "name", "createdAt", "updatedAt" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200926034224..20200926192511
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
@@ -57,9 +57,8 @@
   id                    Int                     @default(autoincrement()) @id
   name                  String
   createdAt             DateTime                @default(now())
   updatedAt             DateTime                @updatedAt
-  tutorProfileId        Int?
   TutorProfileOnSubject TutorProfileOnSubject[]
 }
 model TutorProfile {
```


