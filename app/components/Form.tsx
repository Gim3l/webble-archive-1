import React, { useState, ReactNode, PropsWithoutRef } from "react"
import { Formik, FormikProps, FormikErrors } from "formik"
import * as z from "zod"
import { Button } from "bumbag/Button"

type FormProps<FormValues> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText: string
  onSubmit: (values: FormValues) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<FormValues>["initialValues"]
  noSubmitButton?: boolean
  resetOnSubmit?: boolean
  schema?: z.ZodType<any, any>
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

type OnSubmitResult = {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<FormValues extends Record<string, unknown>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  resetOnSubmit,
  ...props
}: FormProps<FormValues>) {
  const [formError, setFormError] = useState<string | null>(null)
  return (
    <Formik<FormValues>
      initialValues={initialValues || ({} as FormValues)}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={async (values, { setErrors, resetForm }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values as FormValues)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors as FormikErrors<FormValues>)
        }

        if (resetOnSubmit && !(FORM_ERROR || Object.keys(otherErrors).length > 0)) {
          resetForm()
        }
      }}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {formError && (
            <div role="alert" style={{ color: "red" }}>
              {formError}
            </div>
          )}

          {!props.noSubmitButton && (
            <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting || !isValid}>
              {submitText}
            </Button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    </Formik>
  )
}

export default Form
