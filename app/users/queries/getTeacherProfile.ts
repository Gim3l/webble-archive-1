import { SessionContext } from "blitz"
import db from "db"

// type GetTeacherProfileInput = {
//   where: FindOneTeacherProfileArgs["where"]
// }

export default async function getTeacherProfile(_ = null, ctx: { session?: SessionContext } = {}) {
  ctx.session?.authorize("teacher")
  const teacherProfile = await db.teacherProfile.findOne({ where: { userId: ctx.session?.userId } })

  return teacherProfile
}
