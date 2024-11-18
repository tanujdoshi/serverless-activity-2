import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  const [errors, setErrors] = useState({}); // To hold validation errors
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate name (should not be empty)
    if (!name.trim()) {
      isValid = false;
      formErrors["name"] = "Name is required";
    }

    // Validate email (should not be empty and should be in proper format)
    if (!email.trim()) {
      isValid = false;
      formErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors["email"] = "Email is invalid";
    }

    // Validate student ID (should not be empty)
    if (!studentId.trim()) {
      isValid = false;
      formErrors["studentId"] = "Student ID is required";
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({
        name,
        email,
        studentId,
      });

      await axios.post(
        `https://us-central1-csci-5410-439301.cloudfunctions.net/create-user`,
        {
          name,
          email,
          studentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1>Create New User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formStudentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            isInvalid={!!errors.studentId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.studentId}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
