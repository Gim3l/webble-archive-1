import { Link, useParam } from "blitz"
import { Box, Icon, Stack, Text, useBreakpoint, useTheme } from "bumbag"
import React from "react"

function BottomBar() {
  const isTabletOrBelow = useBreakpoint("max-tablet")
  const classroomId = useParam("classroomId", "number")
  const { theme } = useTheme()

  return (
    <>
      {isTabletOrBelow && (
        <Box
          background={theme.palette.primary}
          color={theme.palette.secondary}
          position="sticky"
          bottom="0"
          height="60px"
          width="100%"
          zIndex={9999999}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Link href={"/classroom/" + classroomId}>
            <Stack spacing="0" textAlign="center">
              <Icon aria-label="Dashboard" icon="solid-house-user" />{" "}
              <Text.Block fontSize="100">Dashboard</Text.Block>
            </Stack>
          </Link>
          <Link href={"/classroom/" + classroomId + "/resources"}>
            <Stack spacing="0" textAlign="center" alignItems="center">
              <Icon textAlign="center" aria-label="Resources" icon="solid-folder" />
              <Text.Block fontSize="100">Resources</Text.Block>
            </Stack>
          </Link>
          <Link href={"/classroom/" + classroomId + "/assignments"}>
            <Stack spacing="0" textAlign="center">
              <Icon aria-label="Assignments" icon="solid-book" />
              <Text.Block fontSize="100">Assignments</Text.Block>
            </Stack>
          </Link>
          <Link href="#">
            <Stack spacing="0" textAlign="center">
              <Icon aria-label="Schedule" icon="solid-calendar-week" />
              <Text.Block fontSize="100">Schedules</Text.Block>
            </Stack>
          </Link>
          <Link href="#">
            <Stack spacing="0" textAlign="center">
              <Icon aria-label="Grades" icon="solid-percentage" />
              <Text.Block fontSize="100">Grades</Text.Block>
            </Stack>
          </Link>
        </Box>
      )}
    </>
  )
}

export default BottomBar
