import allUsers from './users';

const currentUser = {
    displayName: "Luiz Augusto C. Souza",
    email: "luizaugustocsouza@gmail.com",
    photoURL: "https://lh4.googleusercontent.com/-OsXhvzedXaE/AAAAAAAAAAI/AAAAAAAAAAA/AAN31DVirdM9sEMEOsT6l-Gw7shT6_A1Mg/mo/photo.jpg",
    uid: "86HYDdMh3EhPCXgxVpd9PisSpu92",
    userName: "luizaugustocs"
};

const getCurrentUser = async () => {
    await setTimeout(() => {}, Math.random() * 3000);
    return currentUser
};

const getUser = async (userId) => {
    await setTimeout(() => {}, Math.random() * 3000);
    return allUsers[userId]
};

const getAllUsers = async() => {
    await setTimeout(() => {}, Math.random() * 3000);
    return Object.values(allUsers)
};


export {
    getCurrentUser,
    getUser,
    getAllUsers
}