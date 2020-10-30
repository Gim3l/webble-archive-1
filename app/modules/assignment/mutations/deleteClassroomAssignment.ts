import { Ctx } from "blitz"
import db from "db"

export default function deleteClassroomAssignment({ id }: { id: number }, ctx: Ctx) {
  ctx.session.authorize("teacher")
  return db.assignment.deleteMany({
    where: {
      id: { equals: id },
      classroom: {
        TeacherProfileOnClassroom: { every: { teacherProfile: { userId: ctx.session.userId } } },
      },
    },
  })
}
