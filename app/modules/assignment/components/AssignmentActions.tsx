import { Link, useMutation, useParam, useRouter } from "blitz"
import deleteClassroomAssignment from "../mutations/deleteClassroomAssignment"
import { Button, DropdownMenu } from "bumbag"
import React from "react"

const AssignmentActions = () => {
  const router = useRouter()
  const classroomId = useParam("classroomId", "number")
  const assignmentId = useParam("assignmentId", "number")

  const [deleteAssignment] = useMutation(deleteClassroomAssignment, {
    onSuccess: () => {
      router.push(
        {
          pathname: "/classroom/[classroomId]/assignment/",
          query: { classroomId },
        },
        "/classroom/[classroomId]/assignment/"
      )
    },
  })
  return (
    <DropdownMenu
      menu={
        <>
          <Link href={{ pathname: `[assignmentId]/edit/`, query: { classroomId, assignmentId } }}>
            <DropdownMenu.Item iconBefore="solid-pen">Edit</DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item iconBefore="solid-share">Share</DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-file-signature">Rename</DropdownMenu.Item>
          <DropdownMenu.Item
            iconBefore="solid-trash-alt"
            color="danger"
            onClick={() => {
              deleteAssignment({ id: assignmentId! })
            }}
          >
            Delete
          </DropdownMenu.Item>
        </>
      }
    >
      <Button size="small" iconAfter="chevron-down">
        Actions
      </Button>
    </DropdownMenu>
  )
}

export default AssignmentActions
