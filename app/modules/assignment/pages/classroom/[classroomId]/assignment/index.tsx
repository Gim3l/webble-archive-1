import DashboardLayout from "app/layouts/DashboardLayout"
import StatCard from "app/modules/classroom/components/StatCard"
import { Box, Button, Columns, Divider, Flex, Heading } from "bumbag"
import React, { Suspense } from "react"
import AssignmentList from "app/modules/classroom/components/AssignmentList"
import { useParam, useRouter, useSession } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import SkeletonLoader from "app/components/SkeletonLoader"

function AssignmentPage() {
  const router = useRouter()
  const classroomId = useParam("classroomId", "number")
  const session = useSession()
  return (
    <div>
      <Heading use="h4" marginBottom="minor-6">
        Summary
      </Heading>
      <Columns>
        <Columns.Column spread={6} spreadTablet={6} spreadMobile={6}>
          <StatCard title="Ungraded Work" value="20"></StatCard>
        </Columns.Column>
        <Columns.Column spread={6} spreadTablet={6} spreadMobile={6}>
          <StatCard title="Submitted Today" value="12"></StatCard>
        </Columns.Column>
      </Columns>

      <Divider marginY="minor-10" backgroundColor="#D2D2D2" />

      <Flex justifyContent="space-between" alignItems="center" marginBottom="minor-6">
        <Heading use="h4">Browse</Heading>
        {session.roles.includes("teacher") && (
          <Button onClick={() => router.push(`/classroom/${classroomId}/assignment/new/`)}>
            New
          </Button>
        )}
      </Flex>
      <Suspense fallback={<SkeletonLoader></SkeletonLoader>}>
        <AssignmentList></AssignmentList>
      </Suspense>
    </div>
  )
}

AssignmentPage.getLayout = (page) => (
  <DashboardLayout title="Assignments" heading="Assignments">
    {page}
  </DashboardLayout>
)

export default AssignmentPage
