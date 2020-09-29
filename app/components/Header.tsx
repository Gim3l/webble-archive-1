import { TopNav } from "bumbag/TopNav"
import { Button } from "bumbag/Button"
import React, { Suspense } from "react"
import { Link, Router } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { DropdownMenu } from "bumbag/DropdownMenu"

const UserDropDown = (props) => (
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
    <Button palette="default" iconAfter="chevron-down">
      {props.currentUser.firstName} {props.currentUser.lastName}
    </Button>
  </DropdownMenu>
)

const RightNav = () => {
  const currentUser = useCurrentUser()

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
              await logout().then(() => Router.push("/"))
            }}
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
            <Button variant="ghost" palette="primary">
              Sign up
            </Button>
          </TopNav.Item>
        </Link>
        <Link href="/login">
          <TopNav.Item>
            <Button palette="primary">Login</Button>
          </TopNav.Item>
        </Link>
      </>
    )
  }
}

export default function Header() {
  return (
    <div>
      <TopNav paddingX="major-5">
        <TopNav.Section>
          <Link href="/">
            <TopNav.Item fontWeight="semibold">Webble</TopNav.Item>
          </Link>
          <TopNav.Item href="#">Get started</TopNav.Item>

          <TopNav.Item href="#">Components</TopNav.Item>
        </TopNav.Section>
        <TopNav.Section marginRight="major-2">
          <Suspense fallback="Loading...">
            <RightNav></RightNav>
          </Suspense>
        </TopNav.Section>
      </TopNav>
    </div>
  )
}
