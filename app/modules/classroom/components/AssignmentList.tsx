import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useQuery } from "blitz"
import { Box } from "bumbag"
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
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="28px">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment}></AssignmentCard>
      ))}
    </Box>
  )
}

export default AssignmentList
