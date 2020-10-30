import React from "react"
import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import { CreateClassroomAssignmentInput } from "app/modules/assignment/validations"
import { InputField, TextareaField, FieldStack, useToasts } from "bumbag"
import { Field } from "formik"
import DateField from "app/components/Fields/DateField"
import { Form } from "app/components/Form"

function AssignmentForm({ onSubmit, initialValues, submitText }) {
  return (
    <Form
      submitText={submitText}
      initialValues={initialValues}
      schema={CreateClassroomAssignmentInput}
      onSubmit={onSubmit}
      resetOnSubmit
    >
      <FieldStack marginY="minor-3">
        <Field label="Name" name="name" placeholder="Name" component={InputField.Formik}></Field>
        <Field
          label="Instructions"
          name="description"
          placeholder="Instructions"
          component={TextareaField.Formik}
        ></Field>
        <Field name="dueDate" label="Due Date" component={DateField}></Field>
      </FieldStack>
    </Form>
  )
}

export default AssignmentForm
