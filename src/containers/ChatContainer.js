// React and external libraries\
import React from 'react';
//components
import ChatInput from '../components/chat/ChatInput'
import ChatList from '../components/chat/ChatList';
//utils and state
import useChatGPTResponse from '../utils/useChatGPTResponse';
import useSpotify from '../utils/useSpotify';
import useCreatePlaylist from '../utils/useCreatePlaylist';

function ChatContainer({ setSelectedSong, handleAuthorization, accessToken, chatState, dispatch, setSelectedPlaylist, setPlaylistBarIsOpen, handleGetPlaylist }) {
    //state management
    const [sessionInput, setSessionInput] = React.useState('')
    const [gptPlaylist, setGPTPlaylist] = React.useState('')
    const [playlistToAdd, setPlaylistToAdd] = React.useState('')
    //queries
    const gptQuery = useChatGPTResponse(sessionInput, dispatch, setGPTPlaylist)
    const spotifyQuery = useSpotify(gptPlaylist.playlist, dispatch)
    const playlistQuery = useCreatePlaylist(accessToken, playlistToAdd, setPlaylistToAdd, dispatch)

    React.useEffect(() => {
        //localStorage
        const localChats = localStorage.getItem("chat") || "[]"
        dispatch({ type: "initialRender", localStorage: JSON.parse(localChats) })
    }, [])

    //TODO: When setPlaylistToAdd state changes, refetch the user's collection of playlists
    const handleAddPlaylist = (playlistObj) => {
        setPlaylistToAdd(playlistObj)
        handleGetPlaylist()
    }

    /* TODO: Add in recommendations from chat gpt onto spotify to create a mix */

    return (
        <div className="chat-container flex flex-col w-full h-full relative bg-[#121212] overflow-hidden rounded-2xl">
            <ChatList
                chatState={chatState}
                gptQuery={gptQuery}
                spotifyQuery={spotifyQuery}
                setSelectedSong={setSelectedSong}
                handleAuthorization={handleAuthorization}
                handleAddPlaylist={handleAddPlaylist}
                accessToken={accessToken}
                setSelectedPlaylist={setSelectedPlaylist}
                setPlaylistBarIsOpen={setPlaylistBarIsOpen} />
            <ChatInput
                dispatch={dispatch}
                setSessionInput={setSessionInput}
            />

        </div >
    );
}

export default ChatContainer;
