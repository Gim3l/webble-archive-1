import {
  Avatar,
  Divider,
  Flex,
  SideNav,
  Icon,
  Text,
  Card,
  useTheme,
  DropdownMenu,
  Button,
} from "bumbag"
import { Box } from "bumbag/Box"
import React, { Suspense } from "react"
import { Menu } from "bumbag"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Heading } from "bumbag/Heading"
import { Link, useParam, useRouter } from "blitz"
import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import Image from "next/image"
import useClassrooms from "app/modules/classroom/hooks/useClassrooms"

const SideBarHeader = () => {
  const [classrooms] = useClassrooms()
  const user = useCurrentUser()
  const router = useRouter()
  const classroom = useCurrentClassroom()

  return (
    <Box marginY="minor-2" marginLeft="minor-3">
      <Flex justifyContent="center" alignItems="center" marginBottom="minor-2">
        <Avatar
          variant="circle"
          size="60px"
          src="/bean.jpg"
          alt="Photo of Mr. Bean"
          marginRight="minor-3"
        />
      </Flex>
      <Heading
        color="secondary"
        use="h5"
        marginBottom="0"
        textAlign="center"
      >{`${user?.firstName} ${user?.lastName}`}</Heading>
      <Box display="flex" justifyContent="center" marginTop="minor-2">
        <DropdownMenu
          maxHeight="200px"
          menu={
            <>
              {classrooms
                .filter((cr) => cr.id !== classroom?.id)
                .map((cr) => (
                  <DropdownMenu.Item
                    key={cr.id}
                    fontSize="0.8em"
                    textAlign="left"
                    onClick={() => router.push(`/classroom/${cr.id}`)}
                  >
                    {cr.name}
                  </DropdownMenu.Item>
                ))}
            </>
          }
        >
          <Button variant="outlined" size="small" iconAfter="chevron-down" palette="primary">
            {classroom?.name}
          </Button>
        </DropdownMenu>
      </Box>
    </Box>
  )
}

function SideBar() {
  const classroomId = useParam("classroomId", "number")
  const router = useRouter()
  return (
    <Box
      backgroundColor="primary"
      color="secondary"
      height="100vh"
      paddingY="major-5"
      overflow="hidden"
    >
      <Box border="2px solid #EBDD94" borderRight="none" borderLeft="none">
        <Suspense fallback="Loading...">
          <SideBarHeader></SideBarHeader>
        </Suspense>
      </Box>

      <SideNav defaultSelectedId="list" paddingY="major-5">
        <SideNav.Level>
          <Link href={"/classroom/" + classroomId}>
            <SideNav.Item
              width="85%"
              borderRadius="4"
              margin="5px auto"
              _active={{ background: "#1B2036" }}
              navId="dashboard"
              color="secondary"
              _hover={{ background: "#1B2036" }}
            >
              <Icon
                color="secondary"
                aria-label="Dashboard"
                icon="solid-house-user"
                marginRight="minor-3"
              />{" "}
              <Text color="secondary">Dashboard</Text>
            </SideNav.Item>
          </Link>
          <Link href={"/classroom/" + classroomId + "/resources"}>
            <SideNav.Item
              width="85%"
              borderRadius="4"
              margin="5px auto"
              _active={{ background: "#1B2036" }}
              _hover={{ background: "#1B2036" }}
              _focus={{ background: "#1B2036" }}
              navId="resources"
              color="secondary"
            >
              <Icon
                color="secondary"
                aria-label="Resources"
                icon="solid-folder"
                marginRight="minor-3"
              />{" "}
              <Text color="secondary">Resources</Text>
            </SideNav.Item>
          </Link>
          <Link href={"/classroom/" + classroomId + "/assignments"}>
            <SideNav.Item
              width="85%"
              borderRadius="4"
              margin="5px auto"
              _active={{ background: "#1B2036" }}
              navId="assignments"
              color="secondary"
              _hover={{ background: "#1B2036" }}
            >
              <Icon
                color="secondary"
                aria-label="Assignments"
                icon="solid-book"
                marginRight="minor-3"
              />{" "}
              <Text color="secondary">Assignments</Text>
            </SideNav.Item>
          </Link>
          <SideNav.Item
            width="85%"
            borderRadius="4"
            margin="5px auto"
            _active={{ background: "#1B2036" }}
            navId="schedule"
            color="secondary"
            _hover={{ background: "#1B2036" }}
          >
            <Icon
              color="secondary"
              aria-label="Schedule"
              icon="solid-calendar-week"
              marginRight="minor-3"
            />
            <Text color="secondary">Schedule</Text>
          </SideNav.Item>
          <SideNav.Item
            width="85%"
            borderRadius="4"
            margin="5px auto"
            _active={{ background: "#1B2036" }}
            navId="grades"
            color="secondary"
            _hover={{ background: "#1B2036" }}
          >
            <Icon
              color="secondary"
              aria-label="Grades"
              icon="solid-percentage"
              marginRight="minor-3"
            />
            <Text color="secondary">Grades</Text>
          </SideNav.Item>
        </SideNav.Level>
      </SideNav>
    </Box>
  )
}

export default SideBar
