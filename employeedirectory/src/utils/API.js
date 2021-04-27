export async function getUsers() {
  const response = await fetch("https://randomuser.me/api/?results=25");
  const users = (await response.json()).results;
  return users.map((user) => ({
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    phone: user.phone,
  }));
}
