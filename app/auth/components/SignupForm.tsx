import React from "react"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { Heading } from "bumbag/Heading"
import { Card } from "bumbag/Card"
import { Container } from "bumbag/Container"
import { FieldStack } from "bumbag/FieldStack"
import { InputField } from "bumbag/Input"
import { Field } from "formik"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  return (
    <div>
      <Container>
        <Card maxWidth="600px" margin="50px auto">
          <Heading use="h3" color="#000">
            Create an Account
          </Heading>

          <Form<SignupInputType>
            submitText="Create Account"
            schema={SignupInput}
            initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await signup({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                })
                props.onSuccess && props.onSuccess()
              } catch (error) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return { email: "This email is already being used" }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
              }
            }}
          >
            <FieldStack marginY="major-5">
              <Field
                component={InputField.Formik}
                name="firstName"
                label="First Name"
                placeholder="John"
              />
              <Field
                component={InputField.Formik}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
              />
              <Field
                component={InputField.Formik}
                name="email"
                label="Email"
                placeholder="john.doe@email.com"
              />
              <Field
                component={InputField.Formik}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </FieldStack>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

export default SignupForm
