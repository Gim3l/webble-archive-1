import React from "react"
import ContentLoader from "react-content-loader"

function SkeletonLoader({ width, height, children, ...otherProps }: any) {
  return (
    <ContentLoader speed={1} width={width} height={height} viewBox="0 0 340 184" {...otherProps}>
      {children ? (
        <>{children}</>
      ) : (
        <>
          <rect x="9" y="4" rx="0" ry="0" width="320" height="22" />
          <rect x="18" y="14" rx="0" ry="0" width="303" height="6" />
          <rect x="11" y="33" rx="0" ry="0" width="108" height="13" />
          <rect x="129" y="33" rx="0" ry="0" width="60" height="13" />
          <rect x="196" y="33" rx="0" ry="0" width="60" height="13" />
          <rect x="196" y="33" rx="0" ry="0" width="60" height="13" />
          <rect x="196" y="33" rx="0" ry="0" width="60" height="13" />
        </>
      )}
    </ContentLoader>
  )
}

export default SkeletonLoader
