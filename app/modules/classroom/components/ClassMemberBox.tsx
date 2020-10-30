import { useQuery } from "blitz"
import React from "react"
import useCurrentClassroom from "../hooks/useCurrentClassroom"
import getClassroom from "../queries/getClassroom"
import ColouredBox from "./ColouredBox"
import { Text } from "bumbag"

function ClassMemberBox() {
  const classroom = useCurrentClassroom()
  const [classroomMembers] = useQuery(getClassroom, {
    where: { id: classroom?.id },
    include: {
      StudentProfileOnClassroom: {
        select: {
          studentProfile: { select: { user: { select: { firstName: true, lastName: true } } } },
        },
      },
      TeacherProfileOnClassroom: {
        select: {
          teacherProfile: { select: { user: { select: { firstName: true, lastName: true } } } },
        },
      },
    },
  })
  return (
    <ColouredBox title="Members" color="#48C77B" background="#E3F7EB">
      <>
        <Text use="strong">Teachers</Text>
        {classroomMembers!["TeacherProfileOnClassroom"].map((classroomMember) => (
          <p key={"teacher" + classroomMember.teacherProfile.user.id}>
            {classroomMember.teacherProfile.user.firstName +
              " " +
              classroomMember.teacherProfile.user.lastName}
          </p>
        ))}

        <Text use="strong">Students</Text>
        {classroomMembers!["StudentProfileOnClassroom"].map((classroomMember) => (
          <p key={"student" + classroomMember.studentProfile.user.id}>
            {classroomMember.studentProfile.user.firstName +
              " " +
              classroomMember.studentProfile.user.lastName}
          </p>
        ))}
        {/* <p>{JSON.stringify(classroomMembers)}</p> */}
      </>
    </ColouredBox>
  )
}

export default ClassMemberBox
