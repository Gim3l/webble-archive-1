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
  return (
    <ColoredCard
      color={dayjs(assignment.dueDate).isAfter(new Date()) ? "#6AF177" : "#FF707A"}
      onClick={() => router.push("/classroom/" + classroom?.id + "/assignment/" + assignment.id)}
    >
      <Heading use="h5">{assignment.name}</Heading>
      <Text.Block use="sub" color="grey">
        Topic Under Assignment
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
