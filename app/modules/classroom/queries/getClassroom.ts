import { Ctx } from "blitz"
import db, { FindFirstClassroomArgs } from "db"

type GetClassroomInput = {
  where: FindFirstClassroomArgs["where"]
  include?: FindFirstClassroomArgs["include"]
}

export default function getClassroom({ where, include }: GetClassroomInput, ctx: Ctx) {
  ctx.session.authorize(["student", "teacher"])

  const classRoom = db.classroom.findFirst({ where, include })

  return classRoom
}
