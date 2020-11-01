import { TopNav } from "bumbag/TopNav"
import { Button } from "bumbag/Button"
import React, { Suspense } from "react"
import { Link, Router, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { DropdownMenu } from "bumbag/DropdownMenu"
import { useBreakpointValue } from "bumbag"

const UserDropDown = (props) => {
  const btnSize = useBreakpointValue({
    default: "default",
    mobile: "small",
  })

  return (
    <DropdownMenu
      menu={
        <React.Fragment>
          <Link href="/dashboard">
            <DropdownMenu.Item iconBefore="solid-pen">Dashboard</DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-file-signature">Rename</DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-trash-alt" color="danger">
            Delete
          </DropdownMenu.Item>
        </React.Fragment>
      }
    >
      <Button palette="default" iconAfter="chevron-down" size={btnSize}>
        {props.currentUser.firstName} {props.currentUser.lastName}
      </Button>
    </DropdownMenu>
  )
}

const RightNav = ({ invert = false }) => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const btnSize = useBreakpointValue({
    default: "default",
    mobile: "small",
  })

  if (currentUser) {
    return (
      <>
        <TopNav.Item>
          <UserDropDown currentUser={currentUser}></UserDropDown>
        </TopNav.Item>
        <TopNav.Item>
          <Button
            palette="primary"
            onClick={async () => {
              await logoutMutation().then(() => Router.push("/"))
            }}
            size={btnSize}
          >
            Logout
          </Button>
        </TopNav.Item>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <TopNav.Item>
            <Button
              variant={invert ? "outlined" : "ghost"}
              background={invert ? "#232946" : "auto"}
              palette={invert ? "secondary" : "primary"}
              size={btnSize}
            >
              Sign up
            </Button>
          </TopNav.Item>
        </Link>
        <Link href="/login">
          <TopNav.Item>
            <Button palette="primary" size={btnSize}>
              Login
            </Button>
          </TopNav.Item>
        </Link>
      </>
    )
  }
}

export default function Header({ invert = false }) {
  return (
    <div>
      <TopNav
        background={invert ? "#232946" : "#fff"}
        color={invert ? "#fff" : "primary"}
        paddingX="major-5"
      >
        <TopNav.Section>
          <Link href="/">
            <TopNav.Item
              fontWeight="semibold"
              fontSize="1.4em"
              _hover={{ color: invert ? "#fff" : "primary" }}
            >
              Webble
            </TopNav.Item>
          </Link>
          {/* <TopNav.Item href="#">Get started</TopNav.Item>

          <TopNav.Item href="#">Components</TopNav.Item> */}
        </TopNav.Section>
        <TopNav.Section marginRight="major-2">
          <Suspense fallback="Loading...">
            <RightNav invert={invert}></RightNav>
          </Suspense>
        </TopNav.Section>
      </TopNav>
    </div>
  )
}
