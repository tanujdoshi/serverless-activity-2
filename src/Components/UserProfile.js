import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    location.state?.user?.profilePicture || null
  );

  const { user } = location.state || {};
  if (!user) {
    return <div>No user data available</div>;
  }

  // Function to handle profile picture upload
  const handleFileChange = (e) => {
    const currentFile = e.target.files[0];
    console.log("selectedFile", currentFile);
    setSelectedFile(currentFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", user.userId);
    console.log("formData", selectedFile);

    try {
      const response = await axios.post(
        "https://us-central1-csci-5410-439301.cloudfunctions.net/activity2-pic-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProfilePictureUrl = response.data.url;
      console.log("response.s3Url", response.data.url);
      setProfilePicture(updatedProfilePictureUrl);
    } catch (error) {
      console.error("There was an error uploading the file", error);
      alert("Error uploading file");
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>
          <h4>Profile Information</h4>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Student ID:</strong> {user.studentId}
          </p>
        </Col>

        <Col md={4}>
          <h4>Profile Picture</h4>
          {profilePicture ? (
            <Image
              src={profilePicture}
              roundedCircle
              width={150}
              height={150}
            />
          ) : (
            <p>No profile picture uploaded</p>
          )}
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Update Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {user.profilePicture ? "Update Picture" : "Add Picture"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
