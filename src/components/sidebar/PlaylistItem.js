import React from 'react';
import { Image } from '@nextui-org/react';

function PlaylistItem({ item, setSelectedPlaylist, selectedPlaylist, setPlaylistBarIsOpen }) {
    const handleSelectPlaylist = (id) => {
        setPlaylistBarIsOpen(true)
        setSelectedPlaylist(id)

    }

    return (
        <div className={`flex flex-col`} >
            <div key={item.id} className={`flex gap-3 p-2 hover:bg-[#222326] rounded-lg cursor-pointer ${selectedPlaylist === item.id && 'bg-[#222326]'}`} onClick={() => handleSelectPlaylist(item.id)}>
                <Image
                    width={52}
                    className='min-w-[52px] z-0'
                    alt="NextUI hero Image"
                    src={item.images.length > 0 ? item.images[0].url : null}
                />
                <div className='truncate flex flex-col justify-center'>
                    <p className='pb-2 text-sm'>{item.name}</p>
                    <p className='text-sm text-slate-400'>{item.owner.display_name}</p>
                </div>
            </div>
        </div>
    )

}

export default PlaylistItem;
