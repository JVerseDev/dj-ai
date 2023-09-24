import React from 'react';
import useChatGPTResponse from '../utils/useChatGPTResponse';
import useSpotify from '../utils/useSpotify';
import { Link, Input, Card, CardBody, Image, Button, Progress } from '@nextui-org/react';

import querystring from 'querystring';

const clientId = '6b42d12ccbbe4a67837f46ba132701db';
const redirectUri = 'http://localhost:3000/callback';

const apiUrl = 'https://api.spotify.com/v1';
const createPlaylistUrl = 'https://api.spotify.com/v1/me/playlists';

function ChatContainer() {
    const [userInput, setUserInput] = React.useState("")
    const [response, setResponse] = React.useState("")
    const [spotifyResults, setSpotifyResults] = React.useState()
    const [accessToken, setAccessToken] = React.useState('')
    const gptQuery = useChatGPTResponse(userInput, setResponse, setUserInput)
    const spotifyQuery = useSpotify(response.playlist, setSpotifyResults)
    const formRef = React.useRef()


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

    const handleSubmit = (e) => {
        e.preventDefault()
        const userInput = e.target.elements.query.value
        if (userInput.trim().length >= 0) {
            setUserInput(userInput)
        }
        formRef.current.reset()
    }

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
        <div className="flex flex-col items-center pt-32">
            <h1>BaeMax.dj</h1>
            {!accessToken && <Button onClick={handleAuthorization}>Authorize with Spotify</Button>}
            <h1>Spotify Playlist Creator</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
                <Input className='w-96' name="query" />
            </form>
            {gptQuery.isError && <p>Error: {gptQuery.error.message}</p>}
            {
                gptQuery.isLoading && gptQuery.fetchStatus === "idle"
                    ? null
                    : gptQuery.isLoading
                        ? <p>Loading...</p>
                        : <ol>{response.playlist.map((item) => <li key={item.song}>{item.song} by <b>{item.artist}</b></li>)}</ol>
            }
            <div>
                {spotifyQuery.isLoading && spotifyQuery.fetchStatus === "idle"
                    ? null
                    : spotifyQuery.isLoading
                        ? <p>Spotify Loading...</p>
                        : <ol className='w-[420px]'>{spotifyResults.map((item, index) => {
                            const uri = item.uri.split('spotify:track:')[1]
                            return <iframe className='h-20 w-full mt-4' src={`https://open.spotify.com/embed/track/${uri}?utm_source=generator`} width="100%" height="352" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        }
                        )}</ol>
                }
            </div>
        </div >
    );
}

export default ChatContainer;
