import React from "react";
import ChatContainer from "../containers/ChatContainer";
import PlaylistBar from "../containers/PlaylistBar";

/*CONSIDER WHICH TO MEMO-IZE, we don't want to re-render every component, only the ones when props updates */
function Chat({ selectedSong, setSelectedSong, chatState, selectedPlaylist, setSelectedPlaylist, userPlaylist, setUserPlaylist, spotifyAIPlaylist, filteredCreatedPlaylists, dispatch, handleAuthorization, accessToken }) {
    const [playlistBarIsOpen, setPlaylistBarIsOpen] = React.useState(false)







    //consider moving side bar into a higher component?
    //<PlaylistContainer selectedPlaylist={selectedPlaylist} />
    return (
        <div className="chat-page flex flex-row w-full h-full bg-black">
            <ChatContainer
                setSelectedSong={setSelectedSong}
                handleAuthorization={handleAuthorization}
                accessToken={accessToken}
                chatState={chatState}
                dispatch={dispatch}
                setSelectedPlaylist={setSelectedPlaylist}
                setPlaylistBarIsOpen={setPlaylistBarIsOpen}
            />
            {userPlaylist && playlistBarIsOpen
                ? <PlaylistBar
                    spotifyAIPlaylist={spotifyAIPlaylist}
                    setPlaylistBarIsOpen={setPlaylistBarIsOpen}
                    selectedPlaylist={selectedPlaylist}
                />
                : null
            }
        </div>
    )
}

export default Chat