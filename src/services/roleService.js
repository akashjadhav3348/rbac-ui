let roles = [
  { name: 'Admin', permissions: ['Read', 'Write'] },
  { name: 'User', permissions: ['Read'] },
];

export const roleService = {
  getRoles: () => [...roles], // Return a copy to avoid state mutation
  deleteRole: (roleName) => {
    roles = roles.filter((role) => role.name !== roleName); // Remove role by name
  },
  updateRole: (role) => {
    const index = roles.findIndex((r) => r.name === role.name);
    if (index !== -1) {
      roles[index] = role; // Update existing role
    } else {
      roles.push(role); // Add new role
    }
  },
};
