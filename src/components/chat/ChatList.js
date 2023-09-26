import React from 'react';
import AIChatItem from './AIChatItem';
import './animation.css'


function ChatList({ chatState, gptQuery, spotifyQuery, spotifyResults, streamResults, userInput }) {
    //create a hook for this? take in an array and return an array
    const chatListRef = React.useRef(null)
    const userRef = React.useRef(null)
    const messageRef = React.useRef(null)
    const playlistRef = React.useRef(null)
    console.log(chatState)

    React.useEffect(() => {
        //when you are not in the bottom, show arrow
        // chatListRef && (chatListRef.current.scrollTop + chatListRef.current.clientHeight >= chatListRef.current.scrollHeight) ? console.log('You are at the bottom!') : null
    }, [spotifyResults])

    return (
        <div ref={chatListRef} className="chat-list h-full flex flex-col bg-slate-200 pb-32 overflow-auto">
            {chatState.map((chatItem, index) => (
                <div key={index} className='w-full flex flex-col items-end'>
                    TURN THIS INTO A COMPONENT
                    {chatItem.userInput &&
                        <div className='w-[580px] p-4 bg-slate-500 animated-component'>
                            {chatItem.userInput}
                        </div>
                    }

                    {gptQuery.isLoading && gptQuery.fetchStatus === "idle"
                        ? null
                        : <div className={`w-[580px] p-4 bg-sky-500 animated-seba-component`}>
                            {gptQuery.isLoading && chatItem.message === ''
                                ? <p>Your Personal DJ at Work....</p>
                                : chatItem.message
                            }
                        </div>
                    }

                    {chatItem.spotify &&
                        //I want to animate this for loading but I need to take out gptQuery.isLoading outside in another condition
                        <div className='w-[580px] p-4 bg-slate-300 animated-seba-component'>
                            {index === chatItem.length - 1
                                ? spotifyQuery.isLoading && spotifyQuery.fetchStatus === "idle"
                                    ? null
                                    : spotifyQuery.isLoading
                                        ? <p>Creating your playlist...</p>
                                        : spotifyQuery.isLoading && spotifyQuery.fetchStatus === "idle"
                                            ? null
                                            : <AIChatItem ref={playlistRef} spotifyResults={chatItem.spotify} />
                                : <AIChatItem spotifyResults={chatItem.spotify} />
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
