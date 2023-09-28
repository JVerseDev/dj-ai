import React from 'react';

function SideBar({ selectedSong }) {
    if (selectedSong) {
        return (
            <div className="side-bar h-full w-[260px] bg-slate-500 overflow-auto">
                <iframe src={`https://open.spotify.com/embed/track/${selectedSong}?utm_source=generator&theme=0`} width="100%" height="400" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div >
        );
    } else {
        return null
    }
}

export default SideBar;
