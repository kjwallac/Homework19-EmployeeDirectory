export async function getUsers() {
    const response =  await fetch('https://randomuser.me/api/?results=25');
    return (await response.json()).results;
}

