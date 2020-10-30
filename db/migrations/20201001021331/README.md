# Migration `20201001021331`

This migration has been generated by Gimel Dick at 9/30/2020, 10:13:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GradeOnStudentProfile" (
    "gradeId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,

    FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("gradeId","studentId")
);
INSERT INTO "new_GradeOnStudentProfile" ("gradeId", "studentId", "classroomId") SELECT "gradeId", "studentId", "classroomId" FROM "GradeOnStudentProfile";
DROP TABLE "GradeOnStudentProfile";
ALTER TABLE "new_GradeOnStudentProfile" RENAME TO "GradeOnStudentProfile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201001021306..20201001021331
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
@@ -115,9 +115,9 @@
   gradeId     Int
   student     StudentProfile @relation(fields: [studentId], references: [id])
   studentId   Int
   classroom   Classroom      @relation(fields: [classroomId], references: [id])
-  classroomId Int            @default(1)
+  classroomId Int
   @@id([gradeId, studentId])
 }
```

