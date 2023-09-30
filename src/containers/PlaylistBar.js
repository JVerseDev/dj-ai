import { Button } from '@nextui-org/react';
import React from 'react';

function PlaylistBar({ accessToken, chatState, setPlaylistBarIsOpen, selectedPlaylist }) {

    return (
        <div className="side-bar h-full w-[480px] pl-4 overflow-auto relative">
            <div className='absolute top-2 right-2'>
                <Button
                    onClick={() => setPlaylistBarIsOpen(false)}
                    isIconOnly
                >X</Button>
            </div>
            {selectedPlaylist
                ? <iframe
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
                : null
            }
        </div >
    );

}

export default PlaylistBar;
