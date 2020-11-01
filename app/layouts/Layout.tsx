import React, { ReactNode } from "react"
import { Head } from "blitz"
import { PageWithHeader } from "bumbag/Page"
import Header from "app/components/Header"
import { Box } from "bumbag"

type LayoutProps = {
  title?: string
  invertHeader?: boolean
  children: ReactNode
}

const Layout = ({ title, invertHeader = false, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Webble"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWithHeader
        header={
          <Box paddingBottom="minor-5">
            <Header invert={invertHeader}></Header>
          </Box>
        }
      >
        {children}
      </PageWithHeader>
    </>
  )
}

export default Layout
