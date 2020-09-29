import DashboardLayout from "app/layouts/DashboardLayout"
import { Heading } from "bumbag/Heading"
import { Card } from "bumbag/Card"
import { Box } from "bumbag/Box"
import React, { Suspense } from "react"
import TeacherForm from "../components/TeacherForm"
import { AuthorizationError, BlitzPage, GetServerSideProps, Router, useQuery } from "blitz"
import { getSessionContext } from "@blitzjs/server"

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSessionContext(context.req, context.res)
//   try {
//     session!.authorize(["user"])
//   } catch (err) {
//     if (err instanceof AuthorizationError) {
//       context.res.writeHead(302, { Location: "/" })
//       context.res.end()
//     }
//   }
//   return {
//     props: {},
//   }
// }

const SelectedForm = ({ selectedRole }) => {
  return (
    <>
      {selectedRole === "teacher" && (
        <Suspense fallback="Loading...">
          <TeacherForm></TeacherForm>
        </Suspense>
      )}
    </>
  )
}

const OnboardingPage: BlitzPage = () => {
  const [selectedRole, setSelectedRole] = React.useState("")
  return (
    <div>
      <Heading use="h4">Hi, who are you? Let's complete your profile.</Heading>
      <Heading use="h5">I am a ...</Heading>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap="150px" marginY="major-4">
        <Card
          _hover={{ background: "#84D2F6" }}
          borderColor="primary"
          cursor="pointer"
          onClick={() => setSelectedRole("student")}
          background={selectedRole === "student" ? "#84D2F6" : "#EFEFEF"}
        >
          <Card.Title>Student</Card.Title>
          <img src="/school.svg" alt="Students heading to school"></img>
        </Card>

        <Card
          _hover={{ background: "#F1DAC4" }}
          borderColor="red"
          cursor="pointer"
          onClick={() => setSelectedRole("teacher")}
          background={selectedRole === "teacher" ? "#F1DAC4" : "#EFEFEF"}
        >
          <Card.Title>Teacher</Card.Title>
          {/* <Divider marginBottom="major-2" borderColor="#000"></Divider> */}
          <img src="/online_lesson.svg" alt="Teacher conduction lesson"></img>
        </Card>
        {selectedRole}
      </Box>
      {/* <Suspense fallback="Loading..."> */}
      <SelectedForm selectedRole={selectedRole}></SelectedForm>
      {/* </Suspense> */}
    </div>
  )
}

OnboardingPage.getLayout = (page) => (
  <DashboardLayout title="Onboarding" heading="Welcome!" noSideBar>
    {page}
  </DashboardLayout>
)

export default OnboardingPage
