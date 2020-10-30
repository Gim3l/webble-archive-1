import { SessionContext } from "blitz"
import db, { FindManyClassroomArgs } from "db"

type GetClassroomsInput = {
  where: FindManyClassroomArgs["where"]
  include?: FindManyClassroomArgs["include"]
}

export default function getClassrooms(
  { where, include }: GetClassroomsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize(["student", "teacher"])

  const classRooms = db.classroom.findMany({ where, include })

  return classRooms
}
