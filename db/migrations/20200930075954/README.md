# Migration `20200930075954`

This migration has been generated by Gimel Dick at 9/30/2020, 3:59:54 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "StudentProfile.userId_unique" ON "StudentProfile"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200930071210..20200930075954
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
@@ -75,9 +75,9 @@
 model StudentProfile {
   id                        Int                         @default(autoincrement()) @id
   user                      User                        @relation(fields: [userId], references: [id])
-  userId                    Int
+  userId                    Int                         @unique
   createdAt                 DateTime                    @default(now())
   updatedAt                 DateTime                    @updatedAt
   StudentProfileOnClassroom StudentProfileOnClassroom[]
 }
```


