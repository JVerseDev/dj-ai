import React from "react";
import ChatContainer from "../containers/ChatContainer";
import SideBar from "../containers/SideBar";
import querystring from 'querystring';


const clientId = '6b42d12ccbbe4a67837f46ba132701db';
const redirectUri = 'http://localhost:3000/callback';

function Chat() {
    const [selectedSong, setSelectedSong] = React.useState('');
    const [accessToken, setAccessToken] = React.useState('')
    console.log(`accessToken is: ${accessToken}`)

    React.useEffect(() => {
        //accessToken
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        console.log(authorizationCode)
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

    return (
        <div className="chat-page flex flex-row w-full h-full">
            <SideBar selectedSong={selectedSong} handleAuthorization={handleAuthorization} />
            <ChatContainer setSelectedSong={setSelectedSong} handleAuthorization={handleAuthorization} accessToken={accessToken} />
        </div>
    )
}

export default Chat