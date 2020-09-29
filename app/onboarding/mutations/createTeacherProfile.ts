import { SessionContext } from "blitz"
import db, { TeacherProfileCreateArgs } from "db"

type CreateTeacherProfileInput = {
  data: TeacherProfileCreateArgs["data"]
}

export default async function createTeacherProfile(
  { data }: CreateTeacherProfileInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("user")

  const teacherProfile = db.teacherProfile.create({ data })
  return teacherProfile
}
