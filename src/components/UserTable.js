import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { userService } from "../services/userService";

function UserTable() {
  const [users, setUsers] = useState(userService.getUsers());
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: "", email: "", role: "", status: "" });
  const [errors, setErrors] = useState({ name: "", email: "", role: "", status: "" });

  const handleDelete = (email) => {
    userService.deleteUser(email); // Delete user
    setUsers(userService.getUsers()); // Update state with the new user list
  };

  const handleShow = (user) => {
    setSelectedUser(user || { name: "", email: "", role: "", status: "" });
    setShow(true);
    setErrors({ name: "", email: "", role: "", status: "" }); // Reset errors
  };

  const handleClose = () => {
    setShow(false);
    setSelectedUser({ name: "", email: "", role: "", status: "" });
    setErrors({ name: "", email: "", role: "", status: "" });
  };

  const handleSave = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", role: "", status: "" };

    // Validation
    if (!selectedUser.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!selectedUser.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!selectedUser.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (!selectedUser.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    setErrors(newErrors); // Update errors

    if (!isValid) return; // Stop if validation fails

    // Save user
    userService.updateUser(selectedUser);
    setUsers(userService.getUsers()); // Refresh user list
    handleClose();
  };

  return (
    <div className="m-5">
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td className="d-flex gap-2">
                <Button variant="warning" onClick={() => handleShow(user)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.email)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit User */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser.email ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                isInvalid={!!errors.role}
              >
                <option value="">-- Select Role --</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser.status}
                onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                isInvalid={!!errors.status}
              >
                <option value="">-- Select Status --</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {selectedUser.email ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserTable;
