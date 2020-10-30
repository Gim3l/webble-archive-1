import db from "db"

type AddStudentToClassroomInput = {
  studentProfileId: number
  classroomId: number
}

export default async function addStudentToClassroom({
  studentProfileId,
  classroomId,
}: AddStudentToClassroomInput) {
  const studentProfileOnClassroom = db.studentProfileOnClassroom.create({
    data: {
      studentProfile: { connect: { id: studentProfileId } },
      classroom: { connect: { id: classroomId } },
    },
  })

  return studentProfileOnClassroom
}
