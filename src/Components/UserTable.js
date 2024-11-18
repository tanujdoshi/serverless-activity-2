import React from "react";
import { Table, Button } from "react-bootstrap";

const UserTable = ({ users, onDelete, onView }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Student ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.studentId}</td>
            <td>
              <Button variant="primary" onClick={() => onView(user)}>
                View
              </Button>{" "}
              <Button variant="danger" onClick={() => onDelete(user.userId)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
