import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import React, { Suspense } from "react"
import { Box, Heading, Text, Button, Columns, Hide, Icon } from "bumbag"
import Image from "next/image"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Feature = ({ text, ...otherProps }: { text: string; [otherProps: string]: any }) => (
  <Box display="flex" alignItems="center" {...otherProps}>
    <Icon
      width="35px"
      height="35px"
      marginRight="minor-2"
      icon="solid-check-circle"
      color="#F0F2FF"
    ></Icon>
    <Text fontSize="0.95em" width="80%">
      {text}
    </Text>
  </Box>
)

const Home: BlitzPage = () => {
  return (
    <>
      <main>
        <Box
          width="100%"
          paddingY="minor-20"
          paddingX="minor-10"
          backgroundColor="#232946"
          color="#fff"
        >
          <Columns>
            <Columns.Column spread={8}>
              <Heading color="#fff" marginBottom="minor-8">
                Create and Manage Your Online Classroom in Seconds
              </Heading>
              <Text.Block fontSize="1.2em" marginBottom="minor-12" width="80%">
                Finally! A social LMS for individuals that's simple and customizable! Harvest the
                power of a learning management system without the complexities of setting it up.
              </Text.Block>
              <Link href="/signup">
                <Button palette="secondary">Create Your Classroom</Button>
              </Link>
            </Columns.Column>
            <Hide below="tablet">
              <Columns.Column>
                <Image src="/teacher.svg" alt="Teacher" width={300} height={350} />
              </Columns.Column>
            </Hide>
          </Columns>
        </Box>

        <Box width="100%" paddingY="minor-20" paddingX="minor-10" background="#F0F2FF">
          <Columns marginY="major-5">
            <Columns.Column spread={6}>
              <Heading use="h3">Simple Classroom Management</Heading>
              <Text.Block marginY="minor-6">
                Managing your classroom online shouldn't have to be difficult. Webble is easy to
                navigate, customizable and powerful! You can make it even simpler with our layout
                builder.
              </Text.Block>
            </Columns.Column>
            <Columns.Column spread={6}></Columns.Column>
          </Columns>
          <Columns marginY="major-15">
            <Columns.Column spread={6}></Columns.Column>
            <Columns.Column spread={6}>
              <Heading use="h3">Effortless Grading</Heading>
              <Text.Block marginY="minor-6">
                We made grading easier! Engage and grade your students digitally, without the
                hassle. Track your student's performance all in one easy to understand interface.
              </Text.Block>
            </Columns.Column>
          </Columns>
          <Columns marginY="major-15">
            <Columns.Column spread={6}>
              <Heading use="h3">Worthwhile Parent-Teacher Engagements</Heading>
              <Text.Block marginY="minor-6">
                You create the data. We provide the analysis. And, you engage parents with
                worthwhile information. Teachers, students and parents are no longer left in the
                dark.
              </Text.Block>
            </Columns.Column>
            <Columns.Column spread={6}></Columns.Column>
          </Columns>
        </Box>

        <Box width="100%" paddingY="minor-20" paddingX="minor-10" background="#D4C785">
          <Columns>
            <Columns.Column spread={6}>
              <Heading use="h3">Activity Tracking is now Child's Play</Heading>
              <Text.Block marginY="minor-6" width="90%">
                You create the data. We provide the analysis. And, you engage parents with
                worthwhile information. Teachers, students and parents are no longer left in the
                dark.
              </Text.Block>
              <Link href="/signup">
                <Button size="medium">Start for Free!</Button>
              </Link>
            </Columns.Column>
          </Columns>
        </Box>

        <Box width="100%" paddingY="minor-20" paddingX="minor-10" background="#004643" color="#fff">
          <Heading use="h3" marginBottom="minor-6" color="#fff">
            Features
          </Heading>
          <Columns>
            <Columns.Column>
              <Feature
                text="Schedule and automatically send emails to students"
                marginBottom="minor-4"
              ></Feature>
              <Feature text="Schedule and track events" marginBottom="minor-4"></Feature>
              <Feature text="Generate and export reports" marginBottom="minor-4"></Feature>
            </Columns.Column>

            <Columns.Column>
              <Feature
                text="Assign tasks and homework to your students"
                marginBottom="minor-4"
              ></Feature>
              <Feature text="Grade your students" marginBottom="minor-4"></Feature>
              <Feature
                text="Distribute and organize classroom resources"
                marginBottom="minor-4"
              ></Feature>
              <Feature text="Classroom activity log" marginBottom="minor-4"></Feature>
              <Feature text="Communicate directly with students" marginBottom="minor-4"></Feature>
              <Feature text="Badges and rewards" marginBottom="minor-4"></Feature>
              <Feature text="Classroom statistics" marginBottom="minor-4"></Feature>
              <Feature text="Plus many more awesome features!"></Feature>
            </Columns.Column>

            <Columns.Column>
              <Feature
                text="Customize the look and feel of your classroom"
                marginBottom="minor-4"
              ></Feature>
              <Feature
                text="View and analyze student grades with beautiful charts"
                marginBottom="minor-4"
              ></Feature>
              <Feature
                text="Gather anonymous feedback from students"
                marginBottom="minor-4"
              ></Feature>
            </Columns.Column>
          </Columns>
          <Box display="flex" justifyContent="center">
            <Link href="/signup">
              <Button display="block" margin="minor-20 auto" palette="secondary" size="large">
                Get Started For Free!
              </Button>
            </Link>
          </Box>
        </Box>
      </main>
    </>
  )
}

Home.getLayout = (page) => (
  <Layout title="Home" invertHeader={true}>
    {page}
  </Layout>
)

export default Home
