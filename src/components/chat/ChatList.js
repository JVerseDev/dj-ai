import React from 'react';
import AIChatItem from './AIChatItem';
import './animation.css'
import { Button } from '@nextui-org/react';


function ChatList({ chatState, gptQuery, spotifyQuery, setSelectedSong, handleAuthorization, handleAddPlaylist, accessToken }) {
    //create a hook for this? take in an array and return an array
    const chatListRef = React.useRef(null)

    React.useEffect(() => {
        //when you are not in the bottom, show arrow
        // how to make autoscroll to bottom optional: chatListRef.current && (chatListRef.current.scrollTop + chatListRef.current.clientHeight >= chatListRef.current.scrollHeight) ? console.log('You are at the bottom!') : null 
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;

    }, [chatState])


    /* TODO: LOADING*/
    /* Turn the 3 into a component */
    return (
        <div ref={chatListRef} className="chat-list h-full flex flex-col items-center pb-32 overflow-auto">
            {chatState.map((chatItem, index) => (
                <div key={index} className='flex flex-col items-end'>
                    {chatItem.userInput &&
                        <div className={`w-auto max-w-[640px] p-4 text-white mt-8 rounded-3xl ${index === chatState.length - 1 && 'animated-component'}`}>
                            {chatItem.userInput}
                        </div>
                    }

                    {gptQuery.isLoading && gptQuery.fetchStatus === "idle" && chatItem.seba.message === ''
                        ? null
                        : <div className={`w-[640px] p-4 bg-[#242424] mt-8 rounded-3xl ${index === chatState.length - 1 && 'animated-seba-component'}`}>
                            {gptQuery.isLoading && chatItem.seba.message === ''
                                ? <p>Your Personal DJ at Work....</p>
                                : chatItem.seba.message
                            }
                        </div>
                    }

                    {chatItem.seba.spotify &&
                        <div className={`w-[640px] p-4 bg-[#242424] mt-4 rounded-3xl ${index === chatState.length - 1 && 'animated-seba-component'}`}>
                            {accessToken
                                ? <Button
                                    isDisabled={chatItem.playlistID ? true : false}
                                    onClick={() => handleAddPlaylist(
                                        {
                                            playlist: chatItem.seba.spotify.map(song => song.uri),
                                            selectedID: chatItem.id
                                        }
                                    )}>
                                    {chatItem.playlistID ? 'Playlist Added ✓' : 'Add to Playlist'}
                                </Button>
                                : <Button
                                    onClick={handleAuthorization}>
                                    Connect to Spotify
                                </Button>}

                            {index === chatItem.length - 1
                                ? spotifyQuery.isLoading && spotifyQuery.fetchStatus === "idle"
                                    ? null
                                    : spotifyQuery.isLoading
                                        ? <p>Creating your playlist...</p>
                                        : <AIChatItem setSelectedSong={setSelectedSong} spotifyResults={chatItem.seba.spotify} />
                                : <AIChatItem setSelectedSong={setSelectedSong} spotifyResults={chatItem.seba.spotify} />
                            }
                        </div>
                    }
                </div >
            ))
            }
        </div>

    );

}

export default ChatList;
