import DashboardLayout from "app/layouts/DashboardLayout"
import AssignmentForm from "app/modules/assignment/components/AssignmentForm"
import React, { Suspense } from "react"
import createClassroomAssignment from "app/modules/assignment/mutations/createClassroomAssignment"
import { useMutation } from "blitz"
import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import { useToasts } from "bumbag"

const CreateAssignmentForm = () => {
  const classroom = useCurrentClassroom()
  const [mutate] = useMutation(createClassroomAssignment)
  const toasts = useToasts()
  const createAssignment = async (values) => {
    await mutate(
      {
        data: {
          classroom: { connect: { id: classroom?.id } },
          name: values.name,
          description: values.description,
          dueDate: values.dueDate,
        },
      },
      {
        onSuccess: () => {
          toasts.success({
            title: "Assignment Created",
            message: "Your assignment was sucessfully created.",
          })
        },
      }
    )
  }
  return (
    <AssignmentForm
      submitText="Assign"
      onSubmit={createAssignment}
      initialValues={{ name: "", description: "", dueDate: new Date() }}
    ></AssignmentForm>
  )
}

const CreateAssignmentPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <CreateAssignmentForm></CreateAssignmentForm>
      </Suspense>
    </div>
  )
}

CreateAssignmentPage.getLayout = (page) => (
  <DashboardLayout title="New Assignment" heading="New Assignment">
    {page}
  </DashboardLayout>
)

export default CreateAssignmentPage
