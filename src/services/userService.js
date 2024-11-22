let users = [
  { name: "Atul hire", email: "Atul@example.com", role: "Admin", status: "Active" },
  { name: "Akash jadhav", email: "Akashjadhav3348@example.com", role: "User", status: "Inactive" },
];

export const userService = {
  getUsers: () => [...users], // Return a copy of the users array
  deleteUser: (email) => {
    users = users.filter((user) => user.email !== email); // Filter out the user by email
  },
  updateUser: (user) => {
    const index = users.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      users[index] = user; // Update existing user
    } else {
      users.push(user); // Add new user
    }
  },
};
