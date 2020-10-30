import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import DashboardLayout from "app/layouts/DashboardLayout"
// import { GetServerSideProps } from "blitz"
import React, { Suspense, useState } from "react"
// import { getSessionContext } from "@blitzjs/server"
import {
  Divider,
  Text,
  Box,
  Heading,
  Card,
  Stack,
  Icon,
  Flex,
  Button,
  Modal,
  InputField,
} from "bumbag"
import StatCard from "app/modules/classroom/components/StatCard"
import ClassEventBox from "app/modules/classroom/components/ClassEventBox"
import ClassRecentBox from "app/modules/classroom/components/ClassRecentBox"
import ColouredBox from "app/modules/classroom/components/ColouredBox"
import ClassMemberBox from "app/modules/classroom/components/ClassMemberBox"
import { useQuery } from "blitz"
import gradeAggregate from "app/modules/grades/queries/gradeAggregate"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSessionContext(context.req, context.res)

//   session!.authorize(["teacher", "student"])

//   return {
//     props: {},
//   }
// }

const InviteModal = () => {
  const classroom = useCurrentClassroom()
  const [isCopied, setIsCopied] = useState(false)

  return (
    <Modal.State animated>
      <Modal.Disclosure use={Button}>Invite</Modal.Disclosure>
      <Modal fade expand>
        <Card>
          <InputField
            value={classroom?.code}
            // @ts-ignore
            state={(isCopied && "success") || "primary"}
            addonAfter={
              <Button
                onClick={() => {
                  if (classroom) {
                    navigator.clipboard
                      .writeText(classroom?.code)
                      .then((clipText) => console.log(clipText + " copied"))
                    setIsCopied(true)
                  }
                }}
              >
                Copy
              </Button>
            }
          ></InputField>
          {isCopied && <Text color="success">Classroom code copied!</Text>}
          <Divider></Divider>
          <Modal.Disclosure marginY="minor-4" use={Button} onClick={() => setIsCopied(false)}>
            Close
          </Modal.Disclosure>
        </Card>
      </Modal>
    </Modal.State>
  )
}

const TeacherStats = () => {
  const classroom = useCurrentClassroom()
  const [aggregate] = useQuery(
    gradeAggregate,
    // @ts-ignore
    { classroomId: classroom?.id },
    { enabled: classroom }
  )

  return (
    <>
      <StatCard title="Mean Grade" value={Math.floor(aggregate?.avg * 100) + "%"}></StatCard>
      <StatCard title="Median Grade" value={Math.floor(aggregate?.med * 100) + "%"}></StatCard>
      <StatCard title="Highest Grade" value={Math.floor(aggregate?.max * 100) + "%"}></StatCard>
      <StatCard title="Unsubmitted Work" value="20"></StatCard>
    </>
  )
}

function ClassroomDashboardPage() {
  return (
    <div>
      {/* Summary and upcoming events */}
      <Box display="flex" marginBottom="minor-6" alignItems="center" justifyContent="space-between">
        <Heading use="h4">Summary</Heading>
        <Suspense fallback="Loading...">
          <InviteModal></InviteModal>
        </Suspense>
      </Box>
      <Box display="grid" gridTemplateColumns="1.5fr 1fr" gridColumnGap="24px">
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap="24px" gridRowGap="24px">
          <Suspense fallback="Loading...">
            <TeacherStats></TeacherStats>
          </Suspense>
        </Box>
        <ClassEventBox></ClassEventBox>
      </Box>

      <Divider marginY="minor-10" backgroundColor="#D2D2D2" />

      {/* Recent activities */}
      <Heading use="h4" marginBottom="minor-6">
        Recent
      </Heading>

      <Box display="grid" gridTemplateColumns="1.5fr 1fr" gridColumnGap="24px">
        <ClassRecentBox></ClassRecentBox>
        <Suspense fallback="Loading...">
          <ClassMemberBox></ClassMemberBox>
        </Suspense>
      </Box>
    </div>
  )
}

ClassroomDashboardPage.getLayout = (page) => (
  <DashboardLayout heading="Classroom Dashboard" title="Classroom Dashboard">
    {page}
  </DashboardLayout>
)

export default ClassroomDashboardPage
