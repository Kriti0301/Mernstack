import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

// Validation
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  return (
    <Container className="py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await axios.post("/api/auth/login", values);

            // Save token
            localStorage.setItem("token", response.data.token);

            toast.success("Login successful!");
            resetForm();

            // Optional: redirect
            window.location.href = "/products";
          } catch (error) {
            if (error.response?.data?.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Something went wrong");
            }
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;
