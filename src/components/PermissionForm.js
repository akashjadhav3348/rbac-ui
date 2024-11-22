import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function PermissionForm() {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedPermissions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    console.log('Permissions assigned:', selectedPermissions);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select Permissions</Form.Label>
        <div>
          {['Read', 'Write', 'Delete'].map((permission) => (
            <Form.Check
              type="checkbox"
              label={permission}
              value={permission}
              key={permission}
              onChange={handleCheckboxChange}
            />
          ))}
        </div>
      </Form.Group>
      <Button variant="success" onClick={handleSubmit}>Save Permissions</Button>
    </Form>
  );
}

export default PermissionForm;
