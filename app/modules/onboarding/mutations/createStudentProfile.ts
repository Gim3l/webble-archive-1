import { Ctx } from "blitz"
import db, { StudentProfileCreateArgs } from "db"

type CreateStudentProfileInput = {
  data: StudentProfileCreateArgs["data"]
}

export default async function createStudentProfile({ data }: CreateStudentProfileInput, ctx: Ctx) {
  ctx.session.authorize("user")

  const studentProfile = db.studentProfile.create({ data })
  return studentProfile
}
