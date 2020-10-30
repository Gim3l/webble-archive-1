import { Card } from "bumbag/Card"
import React, { ReactNode } from "react"

type ColoredCardProps = {
  color?: string
  children: ReactNode
  onClick?: () => any
}

function ColoredCard({ children, color = "primary", onClick }: ColoredCardProps) {
  return (
    <Card
      onClick={onClick}
      borderTopColor={color}
      variant="bordered"
      borderTopWidth="5px"
      _hover={{
        cursor: "pointer",
        transition: "0.5s",
        transform: "translate3d(0px, -2px, 0px)",
        boxShadow: "rgba(0, 0, 0, 0.22) 0px 12px 20px",
      }}
    >
      {children}
    </Card>
  )
}

export default ColoredCard
