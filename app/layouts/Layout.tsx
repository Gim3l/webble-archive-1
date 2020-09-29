import { ReactNode } from "react"
import { Head } from "blitz"
import { PageWithHeader } from "bumbag/Page"
import Header from "app/components/Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "simpleshop"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWithHeader header={<Header></Header>}>{children}</PageWithHeader>
    </>
  )
}

export default Layout
