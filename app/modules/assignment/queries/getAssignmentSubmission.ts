import { Ctx } from "blitz"
import db, { FindFirstAssignmentSubmissionArgs } from "db"

type GetAssignmentSubmissionType = {
  where: FindFirstAssignmentSubmissionArgs["where"]
}

export default function getAssignmentSubmission({ where }: GetAssignmentSubmissionType, ctx: Ctx) {
  const assignment = db.assignmentSubmission.findFirst({
    where,
    include: { student: { include: { user: { select: { id: true } } } } },
  })

  return assignment
}
