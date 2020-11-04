import DashboardLayout from "app/layouts/DashboardLayout"
import AssignmentForm from "app/modules/assignment/components/AssignmentForm"
import React, { Suspense } from "react"
import { useMutation, useParam, useQuery } from "blitz"
import { useToasts } from "bumbag"
import getAssignment from "app/modules/assignment/queries/getAssignment"
import updateClassroomAssignment from "app/modules/assignment/mutations/updateClassroomAssignment"
import { useCurrentProfile } from "app/hooks/useCurrentProfile"

const EditAssignmentForm = () => {
  const assignmentId = useParam("assignmentId", "number")

  const [assignment, { setQueryData: setAssignmentQueryData, refetch }] = useQuery(getAssignment, {
    where: { id: assignmentId },
  })

  const [mutate] = useMutation(updateClassroomAssignment)
  const toasts = useToasts()
  const teacherProfile = useCurrentProfile()

  const editAssignment = async (values) => {
    // update assignment where teacher owns the resource
    await mutate(
      {
        data: {
          name: values.name,
          description: values.description,
          dueDate: values.dueDate,
        },
        where: {
          id: { equals: assignmentId },
          classroom: {
            TeacherProfileOnClassroom: {
              every: { teacherProfileId: { equals: teacherProfile?.id } },
            },
          },
        },
      },

      {
        onSuccess: () => {
          setAssignmentQueryData({
            id: assignment!.id,
            classroomId: assignment!.classroomId,
            name: values.name,
            description: values.description,
            dueDate: values.dueDate,
          })
          refetch()
          toasts.success({
            title: "Assignment Created",
            message: "Your assignment was updated.",
          })
        },
      }
    )
  }
  return (
    <AssignmentForm
      submitText="Modify"
      onSubmit={editAssignment}
      initialValues={{
        name: assignment?.name,
        description: assignment?.description,
        dueDate: assignment?.dueDate,
      }}
    ></AssignmentForm>
  )
}

const EditAssignmentPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <EditAssignmentForm></EditAssignmentForm>
      </Suspense>
    </div>
  )
}

EditAssignmentPage.getLayout = (page) => (
  <DashboardLayout title="Edit Assignment" heading="Edit Assignment">
    {page}
  </DashboardLayout>
)

export default EditAssignmentPage
