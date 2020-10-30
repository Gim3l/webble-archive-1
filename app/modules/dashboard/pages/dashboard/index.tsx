import DashboardLayout from "app/layouts/DashboardLayout"
import React, { Suspense } from "react"
import { getSessionContext } from "@blitzjs/server"
import { AuthorizationError, BlitzPage, GetServerSideProps, useQuery, useSession } from "blitz"
import ClassroomList from "app/components/ClassroomList"
import { Heading } from "bumbag/Heading/"
import { Box } from "bumbag/Box"
import { Text } from "bumbag/Text"
import { Button, Popover, InputField, useToasts } from "bumbag"
import { useCurrentProfile } from "app/hooks/useCurrentProfile"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Form, FORM_ERROR } from "app/components/Form"
import getClassroom from "app/modules/classroom/queries/getClassroom"
import { CreateClassroomSchema, JoinClassroomSchema } from "app/modules/dashboard/validations"
import { Field } from "formik"
import addStudentToClassroom from "app/modules/classroom/mutations/addStudentToClassroom"
import useClassrooms from "app/modules/classroom/hooks/useClassrooms"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSessionContext(context.req, context.res)

//   // if (!(session.roles.includes("tutor") || session.roles.includes("student"))) {
//   try {
//     session!.authorize(["teacher", "student"])
//   } catch (err) {
//     if (err instanceof AuthorizationError) {
//       context.res.writeHead(302, { Location: "/onboarding" })
//       context.res.end()
//     }
//   }

//   return {
//     props: {},
//   }
// }

const ClassroomHeaderAction = () => {
  const session = useSession()
  const toast = useToasts()
  const profile = useCurrentProfile()
  const [_, { refetch }] = useClassrooms()

  const onJoinClassroom = async (values) => {
    console.log("hello")
    const classroom = await getClassroom({ where: { code: values.classroomCode } })

    console.log(classroom)
    if (!classroom) {
      // trigger error message
      toast.danger({ title: "Invalid Code", message: "This classroom code is invalid." })
      return { [FORM_ERROR]: "Invalid classroom code." }
    }

    if (profile) {
      try {
        await addStudentToClassroom({
          classroomId: classroom.id,
          studentProfileId: profile?.id,
        })
        toast.success({
          title: "Classroom Joined",
          message: "You are now apart of " + classroom.name,
        })
        await refetch()
      } catch (err) {
        if (err.code === "P2002") {
          toast.danger({
            title: "Unable to Join Classroom",
            message: "You are already in this classroom.",
          })
        }
      }
    }
  }
  return (
    <div>
      <Popover.State>
        <Popover.Disclosure use={Button}>
          {session.roles.includes("teacher") ? "Create Classroom" : "Join Classroom"}
        </Popover.Disclosure>

        <Popover paddingY="minor-4" showCloseButton>
          <Form
            submitText={session.roles.includes("teacher") ? "Create" : "Join"}
            onSubmit={async (values) => await onJoinClassroom(values)}
            schema={session.roles.includes("teacher") ? CreateClassroomSchema : JoinClassroomSchema}
          >
            {session.roles.includes("teacher") ? (
              <Field
                component={InputField.Formik}
                label="Classroom Name"
                placeholder="My New Classroom"
                name="name"
                hint="Enter the name of your new classroom. You can customise it after."
              ></Field>
            ) : (
              <Field
                component={InputField.Formik}
                label="Enter classroom code"
                placeholder="bDhGAkCH"
                name="classroomCode"
                hint="This is a short (8 characters) code unique to your classroom. Ask your teacher to provide this code."
              ></Field>
            )}
          </Form>
        </Popover>
      </Popover.State>
    </div>
  )
}

const ClassRoomResultText = () => {
  const [classrooms] = useClassrooms()
  return <Text use="strong">{classrooms.length} Classrooms Discovered</Text>
}

const DashboardPage: BlitzPage = () => {
  return (
    <div>
      <Box marginBottom="major-5">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Heading use="h4" color="#000">
              Classrooms
            </Heading>
            <Suspense fallback="Loading...">
              <ClassRoomResultText />
            </Suspense>
          </Box>

          {/* <Button ref={buttonRef}>
            {session.roles.includes("teacher") ? "Create Classroom" : "Join Classroom"}
          </Button> */}
          <Suspense fallback="Loading...">
            <ClassroomHeaderAction />
          </Suspense>
        </Box>
      </Box>
      <Suspense fallback="Loading...">
        <ClassroomList></ClassroomList>
      </Suspense>
    </div>
  )
}

DashboardPage.getLayout = (page) => (
  <DashboardLayout title="Dashboard" heading="Dashboard" noSideBar>
    {page}
  </DashboardLayout>
)

export default DashboardPage
