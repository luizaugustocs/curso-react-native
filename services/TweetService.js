import allTweets from './tweets';
import {getCurrentUser} from './UserService'

const MAX_TIMEOUT = 1500;
const MIN_TIMEOUT = 0;


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const newTweet = async (content) => {
    await setTimeout(() => ({}), MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT));

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return Promise.reject();
    }

    return new Promise(resolve => {
        setTimeout(() => {
            const parsedTweet = {
                uid: uuidv4(),
                content,
                author: currentUser.uid,
                timestamp: new Date().toISOString(),
                authorName: currentUser.displayName,
                authorUserName: currentUser.userName,
                authorPhotoURL: currentUser.photoURL,

            };

            allTweets.unshift(parsedTweet);
            resolve(parsedTweet);
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

const getUserTweets = async (user, page = 0, pageSize = 10) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const userTweets = allTweets.filter(tweet => tweet.author === user.uid);

            const startIndex = page * pageSize;
            resolve(userTweets.slice(startIndex, startIndex + pageSize));
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

const getUserFeed = async (page = 0, pageSize = 10) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const startIndex = page * pageSize;
            resolve([...allTweets].slice(startIndex, startIndex + pageSize));
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });

};

export {
    newTweet,
    getUserTweets,
    getUserFeed
}