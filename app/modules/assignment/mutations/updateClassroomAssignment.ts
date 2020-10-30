import { Ctx } from "blitz"
import db, { AssignmentUpdateManyArgs } from "db"

type UpdateClassroomAssignmentInput = {
  data: AssignmentUpdateManyArgs["data"]
  where: AssignmentUpdateManyArgs["where"]
}

export default function updateClassroomAssignment(
  { data, where }: UpdateClassroomAssignmentInput,
  ctx: Ctx
) {
  ctx.session.authorize("teacher")
  return db.assignment.updateMany({
    data,
    where,
  })
}
