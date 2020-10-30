import { Box, Card, Stack, Text, Icon } from "bumbag"
import React from "react"
import ColouredBox from "./ColouredBox"

function ClassRecentBox() {
  return (
    <ColouredBox title="Activity Log" color="#320992" background="#DBE4F7">
      <Stack>
        <Box>
          <Text.Block use="strong">
            <Icon icon="solid-book"></Icon> New homework was assigned to you.
          </Text.Block>
          <Text use="sub">20 Seconds ago</Text>
        </Box>
        <Box>
          <Text.Block use="strong">
            <Icon icon="solid-folder"></Icon> A new class resource was submitted by your teacher.
          </Text.Block>
          <Text use="sub">22 November, 2020</Text>
        </Box>

        <Box>
          <Text.Block use="strong">
            <Icon icon="solid-percentage"></Icon> A grade was assigned to your submitted homework.
          </Text.Block>
          <Text use="sub">22 November, 2020</Text>
        </Box>
      </Stack>
    </ColouredBox>
  )
}

export default ClassRecentBox
