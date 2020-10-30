import { SessionContext } from "blitz"
import db, { FindManyAssignmentArgs } from "db"

type GetClassroomAssignmentsInput = {
  where: FindManyAssignmentArgs["where"]
}

export default function getClassroomAssignments(
  { where }: GetClassroomAssignmentsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize(["teacher", "student"])
  const assignments = db.assignment.findMany({ where })
  return assignments
}
