const initialState = {
    totals: []
};

const GET_VALUE = 'GET_VALUE';

export function getValue(valueObj) {
    return {
        type: GET_VALUE,
        payload: valueObj
    }
}


export default function welcomeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_VALUE:
            return { ...state, payload }
        default:
            return state
    }
}