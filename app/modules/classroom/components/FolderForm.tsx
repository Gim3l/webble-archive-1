import { Form } from "app/components/Form"
import createResourceFolder from "app/modules/resource/mutations/createResourceFolder"
import { InputField } from "bumbag"
import { Field } from "formik"
import React from "react"
import { useState } from "react"
import { TwitterPicker } from "react-color"
import useClassroomFolders from "../hooks/useClassroomFolders"
import useCurrentClassroom from "../hooks/useCurrentClassroom"

const FolderForm = ({ onSubmit, colour, setColour, initialData, submitText }) => {
  return (
    <div>
      <Form
        submitText={submitText}
        onSubmit={onSubmit}
        initialValues={{ folderName: initialData.folderName }}
      >
        <Field
          component={InputField.Formik}
          label="Folder Name"
          name="folderName"
          placeholder="e.g Presentations"
        ></Field>
        <TwitterPicker
          color={colour}
          onChangeComplete={(color, event) => setColour(color)}
        ></TwitterPicker>
      </Form>
    </div>
  )
}

export default FolderForm
