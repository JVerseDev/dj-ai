import React from "react";
import ChatContainer from "../containers/ChatContainer";
import SideBar from "../containers/SideBar";
import querystring from 'querystring';
import useChatReducer from "../state/useChatReducer";
import PlaylistBar from "../containers/PlaylistBar";
import PlaylistContainer from "../containers/PlaylistContainer"

const clientId = '6b42d12ccbbe4a67837f46ba132701db';
const redirectUri = 'http://localhost:3000/callback';

function Chat() {
    const [chatState, dispatch] = useChatReducer()
    const [selectedSong, setSelectedSong] = React.useState('');
    const [selectedPlaylist, setSelectedPlaylist] = React.useState('')
    const [accessToken, setAccessToken] = React.useState('')
    //TODO: Create playlist reducer. How about for public and private? Do I need to do anything for this? {selectedPlaylist, togglePlaylistBar, all of users's playlist, filtered playlist}
    const [userPlaylist, setUserPlaylist] = React.useState('')
    const [playlistBarIsOpen, setPlaylistBarIsOpen] = React.useState(false)
    const filteredCreatedPlaylists = chatState.map(item => item.playlistID).filter(item => !!item)
    const spotifyAIPlaylist = userPlaylist ? userPlaylist.items.filter((item) => (
        filteredCreatedPlaylists.includes(item.id)
    )) : null


    React.useEffect(() => {
        //accessToken
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            const accessToken = async () => {
                const response = await fetch(`http://localhost:3001/callback?code=${authorizationCode}`)
                const data = await response.json()
                //because of React.Strict mode, it's causing the data to return blank a second time. need conditional
                if (!data.access_token) return

                setAccessToken(data.access_token)
                localStorage.setItem("accessToken", JSON.stringify(data))

                return data
            }
            accessToken()
        }
    }, [])

    //TODO: What happens when a user deletes a playlist in spotify? How do we do error checking?
    React.useEffect(() => {
        if (accessToken) {
            //put this into a useQuery hook
            const handleGetPlaylists = async () => {
                const userResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                setUserPlaylist(userResponse)
            }
            handleGetPlaylists()
        }
    }, [accessToken])


    //where does spotify authorizaiton belong? Higher level parent?
    const handleAuthorization = (e) => {
        e && e.preventDefault()
        const scope = 'playlist-modify-private playlist-read-private';
        const authorizationUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope,
            redirect_uri: redirectUri,
        })}`;
        console.log(authorizationUrl)
        window.location = authorizationUrl;
    };


    //consider moving side bar into a higher component?
    //<PlaylistContainer selectedPlaylist={selectedPlaylist} />
    return (
        <div className="chat-page flex flex-row w-full h-full bg-black py-4 px-2">
            <SideBar
                selectedSong={selectedSong}
                handleAuthorization={handleAuthorization}
                spotifyAIPlaylist={spotifyAIPlaylist}
                userPlaylist={userPlaylist.items}
                filteredCreatedPlaylists={filteredCreatedPlaylists}
            />
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