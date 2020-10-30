import React, { ReactNode } from "react"
import { Card, Heading } from "bumbag"

type ColouredBoxProps = {
  children: ReactNode
  title: string
  background: string
  color: string
}

function ColouredBox(props: ColouredBoxProps) {
  return (
    <Card
      paddingX="0"
      borderRadius="12px"
      background={props.background}
      color={props.color}
      variant="bordered"
    >
      <Heading use="h5" color={props.color} textAlign="center">
        {props.title}
      </Heading>
      <Card
        background="none"
        borderRight="none"
        borderLeft="none"
        borderBottom="none"
        borderRadius="none"
        borderColor={props.color}
        variant="bordered"
        marginY="minor-4"
        color="#000"
      >
        {props.children}
      </Card>
    </Card>
  )
}

export default ColouredBox
