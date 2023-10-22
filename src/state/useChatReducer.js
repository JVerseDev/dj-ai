import React from 'react';

const initialState = [

]

function reducer(state, action) {
    switch (action.type) {
        case "initialRender":
            return action.localStorage
        case "add":
            const newState = [
                ...state,
                {
                    id: new Date(),
                    playlistID: '',
                    userInput: action.userInput,
                    seba: {
                        message: "",
                        songs: "",
                        spotify: "",
                    }
                }
            ]
            localStorage.setItem("chat", JSON.stringify(newState))
            return newState
        case "updatePlaylist":
            const playlist = state.map((item, index) => (
                index === state.length - 1
                    ? {
                        ...item,
                        seba: {
                            ...item.seba,
                            [action.key]: action.value,
                        }
                    }
                    : item
            ))
            localStorage.setItem("chat", JSON.stringify(playlist))
            return playlist
        case "updateMessage":
            const message = state.map((item, index) => (
                index === state.length - 1
                    ? {
                        ...item,
                        seba: {
                            ...item.seba,
                            [action.key]: item.seba[action.key] + action.value,
                        }
                    }
                    : item
            ))
            localStorage.setItem("chat", JSON.stringify(message))
            return message
        case "addPlaylistID":
            const spotifyPlaylistCreated = state.map((item) => (
                item.id === action.selectedID
                    ? {
                        ...item,
                        playlistID: action.playlistID
                    }
                    : item
            ))
            localStorage.setItem("chat", JSON.stringify(spotifyPlaylistCreated))
            return spotifyPlaylistCreated
    }

}

function useChatReducer() {
    const [chatState, dispatch] = React.useReducer(reducer, initialState)

    return [chatState, dispatch]
}

export default useChatReducer;
