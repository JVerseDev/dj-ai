import React from 'react';
import Chat from './pages/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaylistContainer from "./containers/PlaylistContainer"
import SideBar from './containers/SideBar';
import useChatReducer from "./state/useChatReducer";
import querystring from 'querystring';



const clientId = '6b42d12ccbbe4a67837f46ba132701db';
const redirectUri = 'http://localhost:3000/callback';

function App() {
  const [accessToken, setAccessToken] = React.useState('')
  const [selectedSong, setSelectedSong] = React.useState('');
  const [chatState, dispatch] = useChatReducer()
  const [selectedPlaylist, setSelectedPlaylist] = React.useState('')
  //TODO: Create playlist reducer. How about for public and private? Do I need to do anything for this? {selectedPlaylist, togglePlaylistBar, all of users's playlist, filtered playlist}
  const [userPlaylist, setUserPlaylist] = React.useState('')
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

  //need to put side bar here
  return (
    <div className="flex flex-row w-full bg-black py-4 px-2 h-screen mytheme text-foreground bg-background">
      <Router>
        <SideBar
          selectedSong={selectedSong}
          //handleAuthorization={handleAuthorization}
          spotifyAIPlaylist={spotifyAIPlaylist}
          userPlaylist={userPlaylist.items}
          filteredCreatedPlaylists={filteredCreatedPlaylists}
        />
        <Routes>
          <Route exact path="/" element={
            <Chat
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
              chatState={chatState}
              dispatch={dispatch}
              selectedPlaylist={selectedPlaylist}
              setSelectedPlaylist={setSelectedPlaylist}
              userPlaylist={userPlaylist}
              setUserPlaylist={setUserPlaylist}
              spotifyAIPlaylist={spotifyAIPlaylist}
              filteredCreatedPlaylists={filteredCreatedPlaylists}
              handleAuthorization={handleAuthorization}
              accessToken={accessToken}
            />}
          />
          <Route path="/callback" element={
            <Chat
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
              chatState={chatState}
              dispatch={dispatch}
              selectedPlaylist={selectedPlaylist}
              setSelectedPlaylist={setSelectedPlaylist}
              userPlaylist={userPlaylist}
              setUserPlaylist={setUserPlaylist}
              spotifyAIPlaylist={spotifyAIPlaylist}
              filteredCreatedPlaylists={filteredCreatedPlaylists}
              handleAuthorization={handleAuthorization}
              accessToken={accessToken}
            />}
          />
          <Route path="playlist/:id" element={<PlaylistContainer />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
