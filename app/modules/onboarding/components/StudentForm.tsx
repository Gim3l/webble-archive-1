import React from "react"
import { FieldStack, InputField } from "bumbag"
import { Form } from "app/components/Form"
import { useQuery, useRouter } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import updateCurrentUser from "app/users/mutations/updateCurrentUser"
import { Field } from "formik"
import { CreateStudentProfileInput } from "../validations"
import createStudentProfile from "../mutations/createStudentProfile"

const StudentForm = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  const onSubmit = async (values) => {
    console.log(values)
    try {
      await createStudentProfile({
        data: { user: { connect: { id: currentUser?.id } } },
      })
      await updateCurrentUser({ data: { role: "student" } })
      router.push("/dashboard")
    } catch (err) {}
  }

  return (
    <Form submitText="Continue" onSubmit={async (values) => await onSubmit(values)}>
      {/* <FieldStack>
        <Field
          component={InputField.Formik}
          isOptional
          label="Classroom Code"
          placeholder="c3CvD3c"
          name="classroomCode"
        ></Field>
      </FieldStack> */}
    </Form>
  )
}

export default StudentForm
