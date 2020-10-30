import { Router } from "blitz"
import { Card, Tag, Heading, Button, Box } from "bumbag"
import React from "react"
import ColoredCard from "./ColoredCard"

type ClassroomCardProps = {
  classroom: any
}

function ClassroomCard(props: ClassroomCardProps) {
  return (
    <ColoredCard>
      <Heading marginBottom="minor-4" use="h6">
        {props.classroom.name}
      </Heading>
      {props.classroom.TeacherProfileOnClassroom.map((teacher) => (
        <Tag palette="primary" variant="tint">
          {teacher.teacherProfile.user.firstName + " " + teacher.teacherProfile.user.lastName}
        </Tag>
      ))}
      <Box display="flex" justifyContent="center" marginTop="minor-6">
        <Button onClick={() => Router.push("/classroom/" + props.classroom.id)} size="medium">
          View
        </Button>
      </Box>
    </ColoredCard>
  )
}

export default ClassroomCard
