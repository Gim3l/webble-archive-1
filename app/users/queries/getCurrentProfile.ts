import { Ctx } from "blitz"
import db from "db"

// type GetTeacherProfileInput = {
//   where: FindOneTeacherProfileArgs["where"]
// }

export default async function getCurrentProfile(_ = null, ctx: Ctx) {
  ctx.session.authorize(["teacher", "student"])
  const teacherProfile = await db.teacherProfile.findOne({ where: { userId: ctx.session.userId } })
  const studentProfile = await db.studentProfile.findOne({ where: { userId: ctx.session.userId } })

  return { teacher: teacherProfile, student: studentProfile }
}
