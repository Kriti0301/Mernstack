import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

// Yup validation schema
const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, "Phone must be 10 to 15 digits")
        .required("Phone is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

const RegisterPage = () => {
    return (
        <Container className="py-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Registration Form</h2>

            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        const response = await axios.post("/api/auth/register", values);

                        // Save JWT token to localStorage
                        localStorage.setItem("token", response.data.token);

                        toast.success("Registration successful!");
                        resetForm();


                        window.location.href = "/login";

                    } catch (error) {
                        if (error.response && error.response.data?.message) {
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
                    <Form noValidate onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <Form.Group controlId="fullName" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.fullName && !!errors.fullName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fullName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Email */}
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

                        {/* Phone */}
                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.phone && !!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Password */}
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

                        {/* Confirm Password */}
                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default RegisterPage;
