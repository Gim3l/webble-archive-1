import { Box, Card, Heading, Icon, Stack, Text } from "bumbag"
import React from "react"
import ColouredBox from "./ColouredBox"

function ClassEventBox() {
  return (
    <ColouredBox color="#E1BC29" background="#FDFAF0" title="Upcoming">
      <Stack>
        <Box>
          <Text.Block use="strong">
            <Icon icon="solid-calendar-week"></Icon> First Class Session
          </Text.Block>
          <Text use="sub">22 November, 2020</Text>
        </Box>
        <Box>
          <Text.Block use="strong">
            <Icon icon="solid-calendar-week"></Icon> Potometer Experiment
          </Text.Block>
          <Text use="sub">22 November, 2020</Text>
        </Box>
      </Stack>
    </ColouredBox>
  )
}

export default ClassEventBox
