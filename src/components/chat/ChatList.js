import React from 'react';
import AIChatItem from './AIChatItem';

function ChatList({ gptQuery, spotifyQuery, spotifyResults, streamResults }) {

    return (
        <div className="chat-list h-full flex flex-col items-center bg-slate-200 overflow-auto pb-32">
            {streamResults}
            {gptQuery.isError && <p>Error: {gptQuery.error.message}</p>}
            {
                gptQuery.isLoading && gptQuery.fetchStatus === "idle"
                    ? null
                    : gptQuery.isLoading && <p>Your Personal DJ at Work....</p>
            }
            <div>
                {spotifyQuery.isLoading && spotifyQuery.fetchStatus === "idle"
                    ? null
                    : spotifyQuery.isLoading
                        ? <p>Preparing your playlist...</p>
                        : <AIChatItem spotifyQuery={spotifyQuery} spotifyResults={spotifyResults} streamResults={streamResults} />
                }
            </div>
            <div className="flex flex-col gap-3">
            </div>
        </div >
    );
}

export default ChatList;
