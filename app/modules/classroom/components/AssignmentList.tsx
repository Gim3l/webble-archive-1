import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useQuery } from "blitz"
import { Box, Columns } from "bumbag"
import React from "react"
import useCurrentClassroom from "../hooks/useCurrentClassroom"
import getClassroomAssignments from "../queries/getClassroomAssignments"
import AssignmentCard from "./AssignmentCard"

function AssignmentList() {
  const classroom = useCurrentClassroom()
  const user = useCurrentUser()
  const [assignments] = useQuery(getClassroomAssignments, {
    where: { classroomId: classroom?.id },
    include:
      user?.role === "student"
        ? {
            AssignmentSubmission: { where: { student: { userId: { equals: user?.id } } } },
          }
        : null,
  })
  return (
    <Columns>
      {assignments.map((assignment) => (
        <Columns.Column key={assignment.id} spread={4} spreadTablet={6}>
          <AssignmentCard assignment={assignment}></AssignmentCard>
        </Columns.Column>
      ))}
    </Columns>
  )
}

export default AssignmentList
