import { Router } from "blitz"
import { Card, Tag, Heading, Button, Box } from "bumbag"
import React from "react"

type ClassroomCardProps = {
  classroom: any
}

function ClassroomCard(props: ClassroomCardProps) {
  return (
    <Card
      borderColor={props.classroom.color || "primary"}
      borderWidth="2px"
      variant="bordered"
      cursor="pointer"
      transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
      _hover={{ boxShadow: " 0 1px 3px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.24)" }}
    >
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
    </Card>
  )
}

export default ClassroomCard
