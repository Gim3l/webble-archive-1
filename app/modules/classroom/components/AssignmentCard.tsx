import { Assignment, PromiseReturnType } from "@prisma/client"
import getClassroomAssignments from "app/modules/classroom/queries/getClassroomAssignments"
import { useRouter } from "blitz"
import { Card, Divider, Heading, Text, Paragraph } from "bumbag"
import React from "react"
import useCurrentClassroom from "../hooks/useCurrentClassroom"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import ColoredCard from "app/components/ColoredCard"

dayjs.extend(localizedFormat)

export default function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const router = useRouter()
  const classroom = useCurrentClassroom()
  const getColor = (assignment) => {
    if (assignment.AssignmentSubmission?.length > 0) {
      // green if assignment is submitted
      return "#6AF177"
    } else if (dayjs(assignment.dueDate).isAfter(new Date())) {
      // yellow if assignment is due and unsubmitted
      return "yellow"
    } else if (!dayjs(assignment.dueDate).isAfter(new Date())) {
      // red if due date passed
      return "#FF707A"
    } else {
      return "primary"
    }
  }
  return (
    <ColoredCard
      color={getColor(assignment)}
      onClick={() => router.push("/classroom/" + classroom?.id + "/assignments/" + assignment.id)}
    >
      <Heading use="h5">{assignment.name}</Heading>
      <Text.Block use="sub" color="grey">
        Topic Under Assignment
        {/* {JSON.stringify(assignment)} */}
      </Text.Block>
      <Divider marginY="minor-3"></Divider>
      <Paragraph>{assignment.description}</Paragraph>
      <Divider marginY="minor-3"></Divider>
      <Text.Block marginY="minor-3" use="sub">
        <Text use="strong">Due:</Text>{" "}
        <Text color="grey">{dayjs(assignment.dueDate).format("LLL")}</Text>
      </Text.Block>
    </ColoredCard>
  )
}
