import { Ctx } from "blitz"
import db, { FindManyAssignmentSubmissionArgs } from "db"

type GetAssignmentSubmissionsInput = {
  where: FindManyAssignmentSubmissionArgs["where"]
  orderBy?: FindManyAssignmentSubmissionArgs["orderBy"]
  skip?: FindManyAssignmentSubmissionArgs["skip"]
  take?: FindManyAssignmentSubmissionArgs["take"]
}

export default function getAssignmentSubmissions(
  { where, orderBy, skip, take }: GetAssignmentSubmissionsInput,
  ctx: Ctx
) {
  ctx.session.authorize(["teacher", "student"])
  return db.assignmentSubmission.findMany({ where, orderBy, skip, take })
}
