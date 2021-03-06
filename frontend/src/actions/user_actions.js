import * as APIUtil from '../util/users_util';
import {receiveErrors} from './session_actions';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = 'RECEIVE_USER';
export const UPDATE_USER = "UPDATE_USER";




const updateUser = user => ({
    type: UPDATE_USER,
    user
})

export const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
})

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUsers = () => dispatch => {
    return APIUtil.fetchUsers().then(users => (
        dispatch(receiveAllUsers(users))
    ))
}

export const fetchUser = (userId) => dispatch => (APIUtil.fetchUser(userId))
.then((user) => dispatch(receiveUser(user)))


export const editUser = (userData) => dispatch => {
    //debugger;
    return APIUtil.editUser(userData)
.then((user) => dispatch(updateUser(user)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
}
// .fail(err => console.log("error here"))