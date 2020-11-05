import { Link, useParam } from "blitz"
import { Box, Columns, Hide, Text, useBreakpoint } from "bumbag"
import React from "react"

function BottomBar() {
  const isTabletOrBelow = useBreakpoint("max-tablet")
  const classroomId = useParam("classroomId", "number")

  return (
    <>
      {isTabletOrBelow && (
        <Box
          position="sticky"
          bottom="0"
          background="#fff"
          height="60px"
          width="100%"
          zIndex={9999999}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Link href={"/classroom/" + classroomId}>
            <Text fontSize="100">Dashboard</Text>
          </Link>
          <Link href={"/classroom/" + classroomId + "/resources"}>
            <Text fontSize="100">Resources</Text>
          </Link>
          <Link href={"/classroom/" + classroomId + "/assignments"}>
            <Text fontSize="100">Assignments</Text>
          </Link>
          <Link href="#">
            <Text fontSize="100">Schedule</Text>
          </Link>
          <Link href="#">
            <Text fontSize="100">Grades</Text>
          </Link>
        </Box>
      )}
    </>
  )
}

export default BottomBar
