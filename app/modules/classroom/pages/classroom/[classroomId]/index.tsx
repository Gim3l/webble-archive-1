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
  Columns,
} from "bumbag"
import StatCard from "app/modules/classroom/components/StatCard"
import ClassEventBox from "app/modules/classroom/components/ClassEventBox"
import ClassRecentBox from "app/modules/classroom/components/ClassRecentBox"
import ColouredBox from "app/modules/classroom/components/ColouredBox"
import ClassMemberBox from "app/modules/classroom/components/ClassMemberBox"
import { useQuery } from "blitz"
import gradeAggregate from "app/modules/grades/queries/gradeAggregate"
import SkeletonLoader from "app/components/SkeletonLoader"

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
    <Columns>
      <Columns.Column spread={6} spreadTablet={6}>
        <StatCard title="Mean Grade" value={Math.floor(aggregate?.avg * 100) + "%"}></StatCard>
      </Columns.Column>
      <Columns.Column spread={6} spreadTablet={6}>
        <StatCard title="Median Grade" value={Math.floor(aggregate?.med * 100) + "%"}></StatCard>
      </Columns.Column>
      <Columns.Column spread={6} spreadTablet={6}>
        <StatCard title="Highest Grade" value={Math.floor(aggregate?.max * 100) + "%"}></StatCard>
      </Columns.Column>
      <Columns.Column spread={6} spreadTablet={6}>
        <StatCard title="Unsubmitted Work" value="20"></StatCard>
      </Columns.Column>
    </Columns>
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
      <Columns>
        <Columns.Column spread={8} spreadTablet={7}>
          <Suspense
            fallback={
              <SkeletonLoader width="500" height="300">
                <rect x="101" y="48" rx="0" ry="0" width="9" height="0" />
                <rect x="24" y="5" rx="0" ry="10" width="120" height="76" />
                <rect x="198" y="4" rx="0" ry="110" width="120" height="76" />
                <rect x="24" y="96" rx="0" ry="10" width="120" height="76" />
                <rect x="198" y="99" rx="0" ry="10" width="120" height="76" />
              </SkeletonLoader>
            }
          >
            <TeacherStats></TeacherStats>
          </Suspense>
        </Columns.Column>
        <Columns.Column spread={4} spreadTablet={5}>
          <ClassEventBox></ClassEventBox>
        </Columns.Column>
      </Columns>

      <Divider marginY="minor-10" backgroundColor="#D2D2D2" />

      {/* Recent activities */}
      <Heading use="h4" marginBottom="minor-6">
        Recent
      </Heading>

      <Columns>
        <Columns.Column spread={6} spreadTablet={6}>
          <ClassRecentBox></ClassRecentBox>
        </Columns.Column>
        <Columns.Column spread={6} spreadTablet={6}>
          <Suspense fallback="Loading...">
            <ClassMemberBox></ClassMemberBox>
          </Suspense>
        </Columns.Column>
      </Columns>
    </div>
  )
}

ClassroomDashboardPage.getLayout = (page) => (
  <DashboardLayout heading="Classroom Dashboard" title="Classroom Dashboard">
    {page}
  </DashboardLayout>
)

export default ClassroomDashboardPage
