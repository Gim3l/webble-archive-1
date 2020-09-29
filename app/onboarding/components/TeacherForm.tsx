import React from "react"
import { FieldStack, InputField } from "bumbag"
import { Form } from "app/components/Form"
import { useQuery, useRouter } from "blitz"
import createTeacherProfile from "app/onboarding/mutations/createTeacherProfile"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import updateCurrentUser from "app/users/mutations/updateCurrentUser"
import { Field } from "formik"
import { CreateTeacherProfileInput } from "../validations"

const TeacherForm = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  const onSubmit = async (values) => {
    try {
      await createTeacherProfile({
        data: {
          user: { connect: { id: currentUser?.id } },
          TeacherProfileOnClassroom: {
            create: { classroom: { create: { name: values.classroomName } } },
          },
        },
      })
      await updateCurrentUser({ data: { role: "teacher" } })
    } catch (err) {}
    router.push("/dashboard")
  }

  return (
    <Form
      submitText="Continue"
      onSubmit={async (values) => await onSubmit(values)}
      schema={CreateTeacherProfileInput}
    >
      <FieldStack>
        <Field component={InputField.Formik} label="Classroom Name" name="classroomName"></Field>
      </FieldStack>
    </Form>
  )
}

export default TeacherForm
