/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { checkTokenExpiration } from '../services/authentication';

const setInitialState = () => {
    const initalState = {
        authenticationStatus: false,
        claims: null,
        username: '',
        admin: false,
    };
    const token = localStorage.getItem('accessToken');
    if (token && !checkTokenExpiration()) {
        const parsedToken = JSON.parse(atob(token.split('.')[1]));
        initalState.claims = parsedToken;
        initalState.authenticationStatus = true;
        initalState.username = parsedToken.username;
        initalState.admin = parsedToken.admin;
    }
    return initalState;
};

const UserSlice = createSlice({
    name: 'authorize',
    initialState: {
        ...setInitialState(),
    },
    reducers: {
        setAuth: (state, { payload }) => {
            if (payload.token) {
                try {
                    const parsedToken = JSON.parse(atob(payload.token.split('.')[1]));
                    state.claims = parsedToken;
                    state.username = parsedToken.username;
                    state.admin = parsedToken.admin;
                    state.authenticationStatus = true;
                } catch (error) {
                    state.claims = null;
                }
            } else {
                state.claims = null;
                state.authenticationStatus = false;
            }
        },
        fetchUser: (state) => ({
            ...state,
        }),
    },
});

export const { setAuth, fetchUser } = UserSlice.actions;

export default UserSlice;
