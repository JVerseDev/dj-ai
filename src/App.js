import React from 'react';
import useChatGPTResponse from './api/useChatGPTResponse';
import useSpotify from './api/useSpotify';
import { Link, Input, Card, CardBody, Image, Button, Progress } from '@nextui-org/react';
import { HeartIcon } from "./media/HeartIcon";
import { PauseCircleIcon } from "./media/PauseCircleIcon";

function App() {
  const [userInput, setUserInput] = React.useState("")
  const [liked, setLiked] = React.useState(false);
  const [response, setResponse] = React.useState("")
  const [spotifyResults, setSpotifyResults] = React.useState()
  const gptQuery = useChatGPTResponse(userInput, setResponse, setUserInput)
  const spotifyQuery = useSpotify(response.playlist, setSpotifyResults)
  const formRef = React.useRef()

  /*
React.useEffect(() => {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    setIFrame(IFrameAPI)
  }
  if (spotifyResults) {
    spotifyResults.map((item, index) => {
      let element = document.getElementById(`embed-iframe-${index}`);
      let options = {
        uri: item.uri,
        width: '60%',
        height: '100',
      };
      let callback = (EmbedController) => { };
      iFrame.createController(element, options, callback);
    })
  }
}, [spotifyResults])
*/

  const handleSubmit = (e) => {
    e.preventDefault()
    const userInput = e.target.elements.query.value
    if (userInput.trim().length >= 0) {
      setUserInput(userInput)
    }
    formRef.current.reset()
  }

  spotifyResults && console.log(spotifyResults.map(item => item.uri))

  /* TODO: remove the album name from gpt response and pull that from spotify instead */

  return (
    <div className="flex flex-col items-center pt-32">
      <h1>BaeMax.dj</h1>


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

export default App;
