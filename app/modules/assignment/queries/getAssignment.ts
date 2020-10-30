import { SessionContext } from "blitz"
import db, { FindOneAssignmentArgs } from "db"

type GetAssignmentInput = {
  where: FindOneAssignmentArgs["where"]
}

export default function getAssignment(
  { where }: GetAssignmentInput,
  ctx: { session?: SessionContext } = {}
) {
  const assignment = db.assignment.findOne({ where })
  return assignment
}
