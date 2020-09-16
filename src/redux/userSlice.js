/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { checkTokenExpiration } from '../services/authentication';

const setInitialState = () => {
    const initalState = {
        authenticationStatus: false,
        claims: null,
    };
    const token = localStorage.getItem('accessToken');
    if (token && !checkTokenExpiration()) {
        initalState.claims = JSON.parse(atob(token.split('.')[1]));
        initalState.authenticationStatus = true;
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
                    state.claims = JSON.parse(atob(payload.token.split('.')[1]));
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
