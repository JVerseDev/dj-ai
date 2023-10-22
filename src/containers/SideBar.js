import React from 'react';
import { Image, Tabs, Tab, Button } from '@nextui-org/react';
import UserMenu from '../components/sidebar/UserMenu';
import PlaylistItem from '../components/sidebar/PlaylistItem';
import useSpotifyUser from '../utils/useSpotifyUser';

function SideBar({ userPlaylist, filteredCreatedPlaylist, spotifyAIPlaylist, setSelectedPlaylist, selectedPlaylist, accessToken, setPlaylistBarIsOpen }) {
    const userQuery = useSpotifyUser(accessToken)

    return (
        <div className="side-bar h-full min-w-[300px] overflow-hidden pr-4 pb-12 relative">
            <Button className='bg-[#121212] w-full p-4 rounded-2xl mb-4'>
                Chat
            </Button>
            <Tabs fullWidth aria-label="Tabs colors" radius="full">
                <Tab key="photos" title="All" className='h-full overflow-auto'>
                    {userPlaylist
                        ? userPlaylist.map((item) => (
                            <PlaylistItem key={item.id} item={item} setSelectedPlaylist={setSelectedPlaylist} selectedPlaylist={selectedPlaylist} setPlaylistBarIsOpen={setPlaylistBarIsOpen} />))
                        : null
                    }
                </Tab>
                <Tab key="music" title="By Seba">
                    {spotifyAIPlaylist
                        ? (
                            spotifyAIPlaylist.map((item) => (
                                <PlaylistItem key={item.id} item={item} setSelectedPlaylist={setSelectedPlaylist} selectedPlaylist={selectedPlaylist} setPlaylistBarIsOpen={setPlaylistBarIsOpen} />
                            ))
                        ) : null
                    }
                </Tab>
            </Tabs>

            <div className='absolute bottom-0 w-full bg-black p-2 z-1'>
                <UserMenu userQuery={userQuery} />
            </div>

        </div >
    );

}

export default SideBar;
