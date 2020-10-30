import { SessionContext } from "blitz"
import db from "db"

// type GetTeacherProfileInput = {
//   where: FindOneTeacherProfileArgs["where"]
// }

export default async function getCurrentProfile(_ = null, ctx: { session?: SessionContext } = {}) {
  ctx.session?.authorize(["teacher", "student"])
  const teacherProfile = await db.teacherProfile.findOne({ where: { userId: ctx.session?.userId } })
  const studentProfile = await db.studentProfile.findOne({ where: { userId: ctx.session?.userId } })

  return { teacher: teacherProfile, student: studentProfile }
}
