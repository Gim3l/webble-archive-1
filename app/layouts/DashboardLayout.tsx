import React, { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import { PageWithHeader, PageContent } from "bumbag/Page"
import { Heading } from "bumbag/Heading"
import { Card } from "bumbag/Card"
import Header from "app/components/Header"
import SideBar from "app/components/SideBar"
import { PageWithSidebar } from "bumbag/Page"
import BottomBar from "app/components/BottomBar"
import { Show } from "bumbag/Show"
import { Hide } from "bumbag"

type DashboardLayoutProps = {
  title?: string
  heading: string
  children: ReactNode
  noSideBar?: boolean
}

const DashboardLayout = ({ title, heading, noSideBar, children }: DashboardLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Webble"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWithHeader header={<Header></Header>} sticky>
        {noSideBar ? (
          <PageContent>
            <Heading marginY="major-4" use="h2">
              {heading}
            </Heading>
            <Card>{children}</Card>
          </PageContent>
        ) : (
          <PageWithSidebar
            sidebar={
              // <Suspense fallback="Loading...">
              <SideBar></SideBar>
              // </Suspense>
            }
          >
            <PageContent>
              <Heading marginY="major-4" use="h2">
                {heading}
              </Heading>
              <Card>{children}</Card>
            </PageContent>
          </PageWithSidebar>
        )}
        <BottomBar></BottomBar>
      </PageWithHeader>
    </>
  )
}

export default DashboardLayout
