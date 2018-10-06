import allUsers from './users';

const MAX_TIMEOUT = 3000;
const MIN_TIMEOUT = 1000;

let currentUser = undefined;

const getCurrentUser = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(currentUser);
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

const getUser = async (userId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(allUsers[userId]);
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

const getAllUsers = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Object.values(allUsers));
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

export {
    getCurrentUser,
    getUser,
    getAllUsers,
}