# Migration `20201001020410`

This migration has been generated by Gimel Dick at 9/30/2020, 10:04:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amountReceived" INTEGER NOT NULL,
    "total" INTEGER NOT NULL
)

CREATE TABLE "GradeOnStudentProfile" (
    "gradeId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("gradeId","studentId")
)

CREATE TABLE "Topic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)

CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT
)

CREATE TABLE "GradeOnAssignment" (
    "gradeId" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,

    FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("gradeId","assignmentId")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200930075954..20201001020410
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
@@ -12,9 +12,9 @@
 // --------------------------------------
 model User {
-  id             Int              @default(autoincrement()) @id
+  id             Int              @id @default(autoincrement())
   createdAt      DateTime         @default(now())
   updatedAt      DateTime         @updatedAt
   firstName      String
   lastName       String
@@ -26,9 +26,9 @@
   StudentProfile StudentProfile[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
+  id                 Int       @id @default(autoincrement())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
@@ -40,23 +40,23 @@
   privateData        String?
 }
 model Project {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   name      String
 }
 model Exam {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   name      String
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }
 model Classroom {
-  id                        Int                         @default(autoincrement()) @id
+  id                        Int                         @id @default(autoincrement())
   name                      String
   code                      String                      @unique
   createdAt                 DateTime                    @default(now())
   updatedAt                 DateTime                    @updatedAt
@@ -64,23 +64,24 @@
   StudentProfileOnClassroom StudentProfileOnClassroom[]
 }
 model TeacherProfile {
-  id                        Int                         @default(autoincrement()) @id
+  id                        Int                         @id @default(autoincrement())
   user                      User                        @relation(fields: [userId], references: [id])
   userId                    Int                         @unique
   createdAt                 DateTime                    @default(now())
   updatedAt                 DateTime                    @updatedAt
   TeacherProfileOnClassroom TeacherProfileOnClassroom[]
 }
 model StudentProfile {
-  id                        Int                         @default(autoincrement()) @id
+  id                        Int                         @id @default(autoincrement())
   user                      User                        @relation(fields: [userId], references: [id])
   userId                    Int                         @unique
   createdAt                 DateTime                    @default(now())
   updatedAt                 DateTime                    @updatedAt
   StudentProfileOnClassroom StudentProfileOnClassroom[]
+  GradeOnStudentProfile     GradeOnStudentProfile[]
 }
 model TeacherProfileOnClassroom {
   teacherProfile   TeacherProfile @relation(fields: [teacherProfileId], references: [id])
@@ -98,4 +99,42 @@
   classroomId      Int
   @@id([studentProfileId, classroomId])
 }
+
+model Grade {
+  id                    Int                     @id @default(autoincrement())
+  amountReceived        Int
+  total                 Int
+  GradeOnStudentProfile GradeOnStudentProfile[]
+  GradeOnAssignment     GradeOnAssignment[]
+}
+
+model GradeOnStudentProfile {
+  grade     Grade          @relation(fields: [gradeId], references: [id])
+  gradeId   Int
+  student   StudentProfile @relation(fields: [studentId], references: [id])
+  studentId Int
+
+  @@id([gradeId, studentId])
+}
+
+model Topic {
+  id   Int    @id @default(autoincrement())
+  name String
+}
+
+model Assignment {
+  id                Int                 @id @default(autoincrement())
+  name              String?
+  description       String?
+  GradeOnAssignment GradeOnAssignment[]
+}
+
+model GradeOnAssignment {
+  grade        Grade      @relation(fields: [gradeId], references: [id])
+  gradeId      Int
+  assignment   Assignment @relation(fields: [assignmentId], references: [id])
+  assignmentId Int
+
+  @@id([gradeId, assignmentId])
+}
```


