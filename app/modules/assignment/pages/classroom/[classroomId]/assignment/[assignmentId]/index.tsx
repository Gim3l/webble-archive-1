import DashboardLayout from "app/layouts/DashboardLayout"
import deleteClassroomAssignment from "app/modules/assignment/mutations/deleteClassroomAssignment"
import getAssignment from "app/modules/assignment/queries/getAssignment"
import { useParam, useQuery, Link, useMutation, useRouter } from "blitz"
import { Heading, Text, Paragraph, Tabs, Box, DropdownMenu, Button } from "bumbag"
import React, { Suspense } from "react"

const AssignmentActions = () => {
  const router = useRouter()
  const classroomId = useParam("classroomId", "number")
  const assignmentId = useParam("assignmentId", "number")
  const [deleteAssignment] = useMutation(deleteClassroomAssignment, {
    onSuccess: () => {
      router.push(
        {
          pathname: "/classroom/[classroomId]/assignment/",
          query: { classroomId },
        },
        "/classroom/[classroomId]/assignment/"
      )
    },
  })
  return (
    <DropdownMenu
      menu={
        <>
          <Link href={{ pathname: `[assignmentId]/edit/`, query: { classroomId, assignmentId } }}>
            <DropdownMenu.Item iconBefore="solid-pen">Edit</DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-file-signature">Rename</DropdownMenu.Item>
          <DropdownMenu.Item
            iconBefore="solid-trash-alt"
            color="danger"
            onClick={() => {
              deleteAssignment({ id: assignmentId })
            }}
          >
            Delete
          </DropdownMenu.Item>
        </>
      }
    >
      <Button size="small" iconAfter="chevron-down">
        Actions
      </Button>
    </DropdownMenu>
  )
}

const AssignmentDetail = () => {
  const assignmentId = useParam("assignmentId", "number")
  const [assignment] = useQuery(getAssignment, { where: { id: assignmentId } })

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Heading use="h5">{assignment?.name}</Heading>
        <AssignmentActions></AssignmentActions>
      </Box>
      <Text.Block marginBottom="minor-10" use="sub" color="grey">
        Assignment Topic
      </Text.Block>

      <Heading marginY="minor-4" use="h6">
        Instructions
      </Heading>
      <Paragraph>{assignment?.description}</Paragraph>

      <Tabs isFitted selectedId="tab1">
        <Tabs.List>
          <Tabs.Tab tabId="tab1">Ungraded</Tabs.Tab>
          <Tabs.Tab tabId="tab2">Graded</Tabs.Tab>
          <Tabs.Tab tabId="tab3">Unsubmitted</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel tabId="tab1" padding="major-2">
          <Text.Block marginBottom="minor-10" use="sub" color="grey">
            Submissions yet to be graded.
          </Text.Block>
        </Tabs.Panel>
        <Tabs.Panel tabId="tab2" padding="major-2">
          <Text.Block marginBottom="minor-10" use="sub" color="grey">
            Submissions that were graded.
          </Text.Block>
        </Tabs.Panel>
        <Tabs.Panel tabId="tab3" padding="major-2">
          <Text.Block marginBottom="minor-10" use="sub" color="grey">
            Students who haven't submitted their work.
          </Text.Block>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

const AssignmentDetailPage = () => {
  return (
    <Suspense fallback="Loading...">
      <AssignmentDetail></AssignmentDetail>
    </Suspense>
  )
}

AssignmentDetailPage.getLayout = (page) => (
  <DashboardLayout title="Assignment Information" heading="Assignment Detail">
    {page}
  </DashboardLayout>
)

export default AssignmentDetailPage
