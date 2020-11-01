import { Ctx } from "blitz"
import db, { AssignmentSubmissionCreateArgs } from "db"

type CreateAssignmentSubmissionInput = {
  data: AssignmentSubmissionCreateArgs["data"]
}

export default function createAssignmentSubmission(
  { data }: CreateAssignmentSubmissionInput,
  ctx: Ctx
) {
  ctx.session.authorize("student")
  return db.assignmentSubmission.create({ data })
}
