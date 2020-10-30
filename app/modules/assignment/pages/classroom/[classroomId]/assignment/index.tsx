import DashboardLayout from "app/layouts/DashboardLayout"
import StatCard from "app/modules/classroom/components/StatCard"
import { Box, Button, Divider, Flex, Heading } from "bumbag"
import React, { Suspense } from "react"
import AssignmentList from "app/modules/classroom/components/AssignmentList"
import { useParam, useRouter } from "blitz"

function AssignmentPage() {
  const router = useRouter()
  const classroomId = useParam("classroomId", "number")
  return (
    <div>
      <Heading use="h4" marginBottom="minor-6">
        Summary
      </Heading>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridColumnGap="24px">
        <StatCard title="Ungraded Work" value="20"></StatCard>
        <StatCard title="New resources this month" value="12"></StatCard>
        <StatCard title="Views this month" value="102"></StatCard>
      </Box>

      <Divider marginY="minor-10" backgroundColor="#D2D2D2" />

      <Flex justifyContent="space-between" alignItems="center" marginBottom="minor-6">
        <Heading use="h4">Browse</Heading>
        <Button onClick={() => router.push(`/classroom/${classroomId}/assignment/new/`)}>
          New
        </Button>
      </Flex>
      <Suspense fallback="Loading...">
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
