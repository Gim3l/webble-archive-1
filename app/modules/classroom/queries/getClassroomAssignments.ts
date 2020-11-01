import { SessionContext } from "blitz"
import db, { FindManyAssignmentArgs } from "db"

type GetClassroomAssignmentsInput = {
  where: FindManyAssignmentArgs["where"]
  include: FindManyAssignmentArgs["include"]
}

export default function getClassroomAssignments(
  { where, include }: GetClassroomAssignmentsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize(["teacher", "student"])
  const assignments = db.assignment.findMany({ where, include })
  return assignments
}
