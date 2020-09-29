import React from "react"
import { Link, Router } from "blitz"
import { Form, FORM_ERROR } from "app/components/Form"
import { Field } from "formik"
import login from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"
import { Card, Container, FieldStack, InputField, Heading, Button } from "bumbag"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div>
      <Container>
        <Card maxWidth="600px" margin="50px auto">
          <Heading use="h3" color="#000">
            Login
          </Heading>

          <Form<LoginInputType>
            submitText="Log In"
            schema={LoginInput}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await login({ email: values.email, password: values.password })
                props.onSuccess && props.onSuccess()
              } catch (error) {
                if (error.name === "AuthenticationError") {
                  return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
            <FieldStack marginY="major-5">
              <Field component={InputField.Formik} name="email" label="Email" placeholder="Email" />
              <Field
                component={InputField.Formik}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button onClick={() => Router.push("/api/auth/google/")}>Login with Google</Button>
            </FieldStack>
          </Form>
        </Card>

        <div style={{ marginTop: "1rem" }}>
          Or <Link href="/signup">Sign Up</Link>
        </div>
      </Container>
    </div>
  )
}

export default LoginForm
