import getClassrooms from "app/classroom/queries/getClassrooms"
import { useTeacherProfile } from "app/hooks/useTeacherProfile"
import { useQuery } from "blitz"
import { Box } from "bumbag"
import React from "react"
import ClassroomCard from "./ClassroomCard"

const ClassroomList = () => {
  const teacherProfile = useTeacherProfile()

  const [classrooms] = useQuery(getClassrooms, {
    where: { TeacherProfileOnClassroom: { some: { teacherProfileId: teacherProfile?.id } } },
    include: {
      TeacherProfileOnClassroom: {
        select: {
          teacherProfile: { select: { user: { select: { firstName: true, lastName: true } } } },
        },
      },
    },
  })

  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridColumnGap="24px" gridRowGap="24px">
        {classrooms.map((classroom) => (
          <>
            <ClassroomCard key={classroom.id} classroom={classroom}></ClassroomCard>
          </>
        ))}
      </Box>
    </>
  )
}

export default ClassroomList
