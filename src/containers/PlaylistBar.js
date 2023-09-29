import { Button } from '@nextui-org/react';
import React from 'react';

function PlaylistBar({ accessToken, chatState, userPlaylist, setPlaylistBarIsOpen }) {

    return (
        <div className="side-bar h-full w-[480px] pl-4 overflow-auto relative">
            <div className='absolute top-2 right-2'>
                <Button
                    onClick={() => setPlaylistBarIsOpen(false)}
                    isIconOnly
                >X</Button>
            </div>
            {userPlaylist && userPlaylist.map(item => (
                <iframe
                    className='rounded-2xl'
                    title="Spotify Embed: Recommendation Playlist "
                    src={`https://open.spotify.com/embed/playlist/${item.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    style={{ minHeight: '360px' }}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            ))}
        </div >
    );

}

export default PlaylistBar;
