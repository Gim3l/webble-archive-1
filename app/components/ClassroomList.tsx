import useClassrooms from "app/modules/classroom/hooks/useClassrooms"
import getClassrooms from "app/modules/classroom/queries/getClassrooms"
import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useQuery } from "blitz"
import { Box } from "bumbag"
import React from "react"
import ClassroomCard from "./ClassroomCard"

const ClassroomList = () => {
  const [classrooms] = useClassrooms()

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
