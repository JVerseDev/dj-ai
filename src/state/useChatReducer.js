import React from 'react';

const initialState = [
    {
        id: new Date(),
        userInput: '',
        seba: {
            message: "",
            playlist: null,
        }
    }
]

function reducer(state, action) {
    if (action.type === "add") {
        return
    }

    if (action.type === "update") {
        return
    }
}

function useChatReducer() {
    const [chatState, dispatch] = React.useReducer(reducer, initialState)

    return [chatState, dispatch]
}

export default useChatReducer;
