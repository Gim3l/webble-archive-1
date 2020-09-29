import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneClassroomArgs } from "db"

type GetClassroomInput = {
  where: FindOneClassroomArgs["where"]
  include?: FindOneClassroomArgs["include"]
}

export default function getClassroom(
  { where, include }: GetClassroomInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize(["student", "teacher"])

  const classRoom = db.classroom.findOne({
    where,
  })

  console.log(classRoom.StudentProfileOnClassroom.length)

  if (
    classRoom.StudentProfileOnClassroom.length === 0 &&
    classRoom.TeacherProfileOnClassroom.length === 0
  ) {
    throw new NotFoundError()
  }

  return classRoom
}
