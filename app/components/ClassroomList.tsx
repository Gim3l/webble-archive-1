import useClassrooms from "app/modules/classroom/hooks/useClassrooms"
import getClassrooms from "app/modules/classroom/queries/getClassrooms"
import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useQuery } from "blitz"
import { Columns } from "bumbag"
import React from "react"
import ClassroomCard from "./ClassroomCard"
import { Column } from "bumbag/ts/Columns/styles"

const ClassroomList = () => {
  const [classrooms] = useClassrooms()

  return (
    <>
      <Columns>
        {classrooms.map((classroom) => (
          <Columns.Column spread={4} spreadTablet={6} key={classroom.id}>
            <ClassroomCard classroom={classroom}></ClassroomCard>
          </Columns.Column>
        ))}
      </Columns>
    </>
  )
}

export default ClassroomList
