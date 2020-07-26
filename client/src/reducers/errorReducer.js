import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    email: null,
    id: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                email: action.payload.email,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                email: null,
                id: null
            };
        default:
            return state;
    }
}
