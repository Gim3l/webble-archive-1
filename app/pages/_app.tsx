import { AppProps, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import { Provider as BumbagProvider, css, ToastManager } from "bumbag"
import {
  faHouseUser,
  faFolder,
  faBook,
  faCalendarWeek,
  faPercentage,
  faEllipsisH,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"

import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import LoginForm from "app/auth/components/LoginForm"
import React from "react"

export default function App({ Component, pageProps }: AppProps) {
  const theme = {
    global: {
      fontSize: 18,
      styles: {
        base: css`
          html,
          body {
            background-color: #f7fafc;
          }

          .bb-PageWithSidebarSidebarExpandedWrapper,
          .bb-PageWithSidebarSidebar {
            overflow-y: hidden;
          }
        `,
      },
    },
    fonts: {
      importUrls: [
        "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      ],
      default: "'Poppins', sans-serif",
    },
    palette: { primary: "#232946", secondary: "#EBDD94", tertiary: "#F8F8F9" },
    breakpoints: { mobile: 520, tablet: 960 },
    Icon: {
      iconSets: [
        {
          icons: [
            faHouseUser,
            faFolder,
            faBook,
            faCalendarWeek,
            faPercentage,
            faEllipsisH,
            faGoogle,
            faCheckCircle,
          ],
          prefix: "solid-",
          type: "font-awesome",
        },
      ],
    },
    Button: { defaultProps: { palette: "primary" } },
    Heading: { styles: { base: { color: "primary", fontFamily: "'Poppins', sans-serif" } } },
    DropdownMenu: {
      Item: { styles: { base: { textAlign: "center" } } },
      Popover: {
        styles: {
          base: {
            overflowY: "auto",
            maxHeight: "300px",
            textAlign: "center",
          },
        },
      },
    },
    SideNav: { Item: { styles: { active: { background: "#1B2036" } } } },
  }

  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    // @ts-ignore
    <BumbagProvider theme={theme} isSSR>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={() => {
          // This ensures the Blitz useQuery hooks will automatically refetch
          // data any time you reset the error boundary
          queryCache.resetErrorBoundaries()
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
      <ToastManager />
    </BumbagProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error?.name === "AuthenticationError") {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
