import getClassroomFolders from "app/modules/resource/queries/getClassroomFolders"
import { useQuery } from "blitz"
import React from "react"

function useClassroomFolders(data) {
  return useQuery(getClassroomFolders, data)
}

export default useClassroomFolders
