import DashboardLayout from "app/layouts/DashboardLayout"
import React, { Suspense } from "react"
import SkeletonLoader from "app/components/SkeletonLoader"
import AssignmentDetail from "app/modules/assignment/components/AssignmentDetail"

const AssignmentDetailPage = () => {
  return (
    <Suspense fallback={<SkeletonLoader></SkeletonLoader>}>
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
