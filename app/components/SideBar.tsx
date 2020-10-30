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
import React from "react"
import { Menu } from "bumbag"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Heading } from "bumbag/Heading"
import { Link } from "blitz"
import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import Image from "next/image"

function SideBar() {
  const user = useCurrentUser()
  const classroom = useCurrentClassroom()

  return (
    <Box backgroundColor="tertiary" height="100vh" paddingY="major-5" overflow="hidden">
      <Divider background="#D2D2D2" />
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
          use="h5"
          marginBottom="0"
          textAlign="center"
        >{`${user?.firstName} ${user?.lastName}`}</Heading>
        <Box display="flex" justifyContent="center" marginTop="minor-2">
          <DropdownMenu
            maxHeight="200px"
            menu={
              <>
                <DropdownMenu.Item iconBefore="solid-pen">
                  Some largeass classroom name
                </DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
                <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
              </>
            }
          >
            <Button iconAfter="chevron-down" palette="default">
              {classroom?.name}
            </Button>
          </DropdownMenu>
        </Box>
      </Box>

      <Divider background="#D2D2D2" />
      <SideNav defaultSelectedId="list" paddingY="major-5">
        <SideNav.Level>
          <Link href={"/classroom/" + classroom?.id}>
            <SideNav.Item href="/dashboard" navId="dashboard">
              <Icon aria-label="Dashboard" icon="solid-house-user" marginRight="minor-3" />{" "}
              Dashboard
            </SideNav.Item>
          </Link>
          <Link href={"/classroom/" + classroom?.id + "/resources"}>
            <SideNav.Item href="#" navId="resources">
              <Icon aria-label="Resources" icon="solid-folder" marginRight="minor-3" /> Resources
            </SideNav.Item>
          </Link>
          <Link href={"/classroom/" + classroom?.id + "/assignment"}>
            <SideNav.Item navId="assignment">
              <Icon aria-label="Assignment" icon="solid-book" marginRight="minor-3" /> Assignments
            </SideNav.Item>
          </Link>
          <SideNav.Item href="#" navId="schedule">
            <Icon aria-label="Schedule" icon="solid-calendar-week" marginRight="minor-3" /> Schedule
          </SideNav.Item>
          <SideNav.Item href="#" navId="grades">
            <Icon aria-label="Grades" icon="solid-percentage" marginRight="minor-3" /> Grades
          </SideNav.Item>
        </SideNav.Level>
      </SideNav>
    </Box>
  )
}

export default SideBar
