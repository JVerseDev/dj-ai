// React and external libraries\
import React from 'react';
import querystring from 'querystring';
//components
import ChatInput from '../components/chat/ChatInput'
import ChatList from '../components/chat/ChatList';
//utils
import useChatGPTResponse from '../utils/useChatGPTResponse';
import useSpotify from '../utils/useSpotify';



const clientId = '6b42d12ccbbe4a67837f46ba132701db';
const redirectUri = 'http://localhost:3000/callback';

const apiUrl = 'https://api.spotify.com/v1';
const createPlaylistUrl = 'https://api.spotify.com/v1/me/playlists';

function ChatContainer() {
    const [userInput, setUserInput] = React.useState("")
    const [gptResults, setGPTResults] = React.useState("")
    const [streamResults, setStreamResults] = React.useState("")
    const [spotifyResults, setSpotifyResults] = React.useState()
    const gptQuery = useChatGPTResponse(userInput, setGPTResults, setStreamResults)
    const spotifyQuery = useSpotify(gptResults.playlist, setSpotifyResults)
    const [accessToken, setAccessToken] = React.useState('')


    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            const accessToken = async () => {
                const response = await fetch(`http://localhost:3001/callback?code=${authorizationCode}`)
                const data = await response.text()
                //because of React.Strict mode, it's causing the data to return blank a second time. need conditional
                if (data) {
                    setAccessToken(data)
                }
                return data
            }
            accessToken()
        }
    }, [])

    //where does spotify authorizaiton belong? Higher level parent?
    const handleAuthorization = (e) => {
        e.preventDefault()
        const scope = 'playlist-modify-private';
        const authorizationUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope,
            redirect_uri: redirectUri,
        })}`;
        console.log(authorizationUrl)
        window.location = authorizationUrl;
    };

    async function createPlaylist(accessToken) {
        //gets user id
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())

        const user_id = userResponse.id

        const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'SEBA AI',
                description: 'A playlist created with the Spotify API',
                public: false,
            }),
        }).then(res => res.json())
        console.log(response)

        return response
    }

    spotifyResults && console.log(spotifyResults.map(item => item.uri))

    /* TODO: remove the album name from gpt response and pull that from spotify instead */
    /* TODO: Add in recommendations from chat gpt onto spotify to create a mix */

    return (
        <div className="chat-container flex flex-col w-full h-full relative">
            <ChatList gptQuery={gptQuery} spotifyQuery={spotifyQuery} gptResults={gptResults} spotifyResults={spotifyResults} streamResults={streamResults} />
            <ChatInput setUserInput={setUserInput} setStreamResults={setStreamResults} />

        </div >
    );
}

export default ChatContainer;
