// React and external libraries\
import React from 'react';


function PlaylistContainer({ selectedPlaylist }) {

    /* TODO: Add in recommendations from chat gpt onto spotify to create a mix */
    if (!selectedPlaylist) return null

    return (
        <div className="chat-container flex flex-col w-full h-full relative bg-[#121212] overflow-hidden rounded-2xl">
            <iframe
                className='rounded-2xl'
                title="Spotify Embed: Recommendation Playlist "
                src={`https://open.spotify.com/embed/playlist/${selectedPlaylist}?utm_source=generator&theme=0`}
                width="100%"
                height="100%"
                style={{ minHeight: '360px' }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </div >
    );
}

export default PlaylistContainer;
