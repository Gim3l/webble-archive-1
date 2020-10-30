import db, { AssignmentCreateArgs } from "db"

type CreateClassroomAssignmentInput = {
  data: AssignmentCreateArgs["data"]
}

export default function createClassroomAssignment({ data }: CreateClassroomAssignmentInput) {
  const assignment = db.assignment.create({ data })
  return assignment
}
