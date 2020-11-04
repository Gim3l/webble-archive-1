import SkeletonLoader from "app/components/SkeletonLoader"
import DashboardLayout from "app/layouts/DashboardLayout"
import getAssignmentSubmission from "app/modules/assignment/queries/getAssignmentSubmission"
import { useParam, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"

const DocumentViewer = ({ path }) => {
  const docs = [{ uri: path }]
  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}></DocViewer>
}

const AssignmentSubmissionDetail = ({
  submissionId,
  assignmentId,
}: {
  submissionId: number
  assignmentId: number
}) => {
  const [assignmentSubmission] = useQuery(getAssignmentSubmission, { where: { id: submissionId } })

  return (
    <>
      {JSON.stringify(assignmentSubmission)}
      {assignmentSubmission && (
        <DocumentViewer
          path={`${
            process.env.NODE_ENV === "production" ? "https://webble.co" : "http://localhost:3000"
          }/api/download/${assignmentSubmission.path}`}
        ></DocumentViewer>
      )}
    </>
  )
}

function ViewAssignmentPage() {
  const submissionId = useParam("submissionId", "number")
  const assignmentId = useParam("assignmentId", "number")

  return (
    <>
      {submissionId && assignmentId && (
        <Suspense fallback={<SkeletonLoader></SkeletonLoader>}>
          <AssignmentSubmissionDetail
            assignmentId={assignmentId}
            submissionId={submissionId}
          ></AssignmentSubmissionDetail>
        </Suspense>
      )}
    </>
  )
}

ViewAssignmentPage.getLayout = (page) => (
  <DashboardLayout title="Assignment Submission" heading="Assignment Submission">
    {page}
  </DashboardLayout>
)
export default ViewAssignmentPage
