import SubmissionBox, { SubmissionBoxType } from "app/modules/assignment/components/SubmissionBox"
import ContentLoader from "react-content-loader"
import getAssignment from "app/modules/assignment/queries/getAssignment"
import getAssignmentSubmissions from "app/modules/assignment/queries/getAssignmentSubmissions"
import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Heading, Text, Paragraph, Tabs, Box, Tag } from "bumbag"
import { useParam, useQuery } from "blitz"
import React, { Suspense } from "react"
import AssignmentActions from "./AssignmentActions"

const AssignmentDetail = () => {
  const assignmentId = useParam("assignmentId", "number")
  const [assignment] = useQuery(getAssignment, { where: { id: assignmentId } })

  const studentProfile = useCurrentProfile()
  const user = useCurrentUser()
  const [studentAssignmentSubmissions] = useQuery(
    getAssignmentSubmissions,
    {
      where: {
        studentProfileId: { equals: studentProfile?.id },
        assignment: { id: assignmentId },
      },
    },
    {
      enabled: studentProfile,
    }
  )

  return (
    <div>
      <Box
        marginBottom="minor-4"
        display={user?.role === "teacher" ? "flex" : "block"}
        justifyContent="space-between"
      >
        <Heading use="h5">{assignment?.name}</Heading>
        {user?.role === "teacher" ? <AssignmentActions></AssignmentActions> : <Box></Box>}
      </Box>
      <Box marginBottom="minor-10">
        <Tag>Assignment Topic</Tag>
      </Box>

      <Heading marginY="minor-4" use="h6">
        Instructions
      </Heading>
      <Paragraph>{assignment?.description}</Paragraph>

      <Suspense fallback={<ContentLoader></ContentLoader>}>
        <SubmissionBox
          assignmentId={assignment!.id}
          type={
            studentAssignmentSubmissions?.length > 0
              ? SubmissionBoxType.SUCCESS
              : SubmissionBoxType.WARNING
          }
        ></SubmissionBox>
      </Suspense>
      {/* Allow teachers to view all the students' submissions, sort and filter */}
      {user?.role === "teacher" && (
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
      )}
    </div>
  )
}

export default AssignmentDetail
