import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { roleService } from '../services/roleService';

function RoleTable() {
  const [roles, setRoles] = useState(roleService.getRoles());
  const [show, setShow] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ name: '', permissions: [] });

  // Delete Role
  const handleDelete = (roleName) => {
    roleService.deleteRole(roleName); // Update roles in service
    setRoles(roleService.getRoles()); // Refresh the state
  };

  // Open Modal for Add/Edit
  const handleShow = (role) => {
    setSelectedRole(role || { name: '', permissions: [] }); // Set role or default
    setShow(true);
  };

  // Close Modal
  const handleClose = () => {
    setShow(false);
    setSelectedRole({ name: '', permissions: [] });
  };

  // Save Role
  const handleSave = () => {
    // Validation (optional)
    if (!selectedRole.name.trim()) {
      alert("Role name cannot be empty!");
      return;
    }

    roleService.updateRole(selectedRole); // Update roles in service
    setRoles(roleService.getRoles()); // Refresh the state
    handleClose();
  };

  return (
    <div className="m-5">
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        Add Role
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td className="gap-2 d-flex">
                <Button variant="warning" className="mr-2" onClick={() => handleShow(role)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(role.name)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Role */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRole?.name ? 'Edit Role' : 'Add Role'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Role Name Input */}
            <Form.Group controlId="formRoleName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={selectedRole.name}
                onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
              />
            </Form.Group>

            {/* Permissions */}
            <Form.Group controlId="formPermissions">
              <Form.Label>Permissions</Form.Label>
              <div>
                {['Read', 'Write', 'Delete'].map((permission) => (
                  <Form.Check
                    key={permission}
                    type="checkbox"
                    label={permission}
                    value={permission}
                    checked={selectedRole.permissions.includes(permission)}
                    onChange={(e) => {
                      const permissions = selectedRole.permissions || [];
                      if (e.target.checked) {
                        // Add permission
                        setSelectedRole({
                          ...selectedRole,
                          permissions: [...permissions, permission],
                        });
                      } else {
                        // Remove permission
                        setSelectedRole({
                          ...selectedRole,
                          permissions: permissions.filter((p) => p !== permission),
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {selectedRole?.name ? 'Save Changes' : 'Add Role'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RoleTable;
