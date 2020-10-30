import { Card, Text, Heading } from "bumbag"
import React from "react"

type StatCardProps = {
  title: string
  value: number | string
}

function StatCard(props: StatCardProps) {
  return (
    <div>
      <Card borderRadius="12px" height="135px" variant="bordered">
        <Text.Block height="38px" use="strong" marginBottom="minor-3">
          {props.title}
        </Text.Block>

        <Heading use="h3">{props.value}</Heading>
      </Card>
    </div>
  )
}

export default StatCard
