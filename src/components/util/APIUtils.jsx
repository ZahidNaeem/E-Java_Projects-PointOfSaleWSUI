import { API_BASE_URL, ACCESS_TOKEN } from '../constant';
import { AsyncStorage } from 'AsyncStorage';
import { toast } from 'react-toastify';
import axios from 'axios';
import { async } from 'q';

export async function request(options) {
    const headers = { 'Content-Type': 'application/json' };

    const accessToken = await retrieveDataFromAsyncStorage(ACCESS_TOKEN);
    if (accessToken) {
        headers['Authorization'] = 'Bearer ' + accessToken;
        console.log('Access Token:', accessToken);

    }

    const defaults = { headers };
    options = Object.assign({}, defaults, options);
    console.log("Options:", options);

    try {
        const res = await axios(options);
        return res;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            toast.error("You are not authorized to see data or your session is expired.");
        }

    }
};

/* export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
} */

export function login(loginRequest) {
    const options = {
        url: API_BASE_URL + "auth/signin",
        method: 'POST',
        data: loginRequest
    }
    return request(options);
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export async function getCurrentUser() {
    const accessToken = await retrieveDataFromAsyncStorage(ACCESS_TOKEN);
    if (!accessToken) {
        return Promise.reject("No access token set.");
    }

    return await request({
        url: API_BASE_URL + "user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "users/" + username,
        method: 'GET'
    });
}

export function changePassword(changePasswordRequest) {
    const options = {
        url: API_BASE_URL + "user/changePassword",
        method: 'POST',
        data: changePasswordRequest
    }
    return request(options);
}

export function isSuccessfullResponse(res) {
    var callerName;
    let re = /([^(]+)@|at ([^(]+) \(/g;
    let aRegexResult = re.exec(new Error().stack);
    let result = aRegexResult[1] || aRegexResult[2];
    let arr = result.split("/");

    callerName = arr[arr.length - 1];
    console.log("Function:", callerName, "Response status:", res.status);
    if (res.status > 199 && res.status < 300) {
        return true;
    } else {
        return false;
    }
    /* try {
        throw new Error();
    } catch (e) {
        // console.log("Log1", e.stack.split('at ')[3].split(' ')[0]);
        // console.log("Log2", e.stack.split('at ')[3]);
        console.log("Log3", );
        return true;
    } */
    // }
}

export async function storeDataIntoAsyncStorage(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
        console.log("Data successfully stored in AsyncStorage");

    } catch (error) {
        console.log("Error storing date into AsyncStorage", error);

    }
};

export async function retrieveDataFromAsyncStorage(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log("Error retrieving data from AsyncStorage", error);
        return null;
    }
};

export async function removeDataFromAsyncStorage(key) {
    try {
        await AsyncStorage.removeItem(key);
        console.log("Data successfully removed from AsyncStorage");
    } catch (error) {
        console.log("Error removing data from AsyncStorage", error);
    }
};

export async function clearAsyncStorage() {
    try {
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared successfully.");
    } catch (error) {
        console.log("Error clearing AsyncStorage", error);
    }
};