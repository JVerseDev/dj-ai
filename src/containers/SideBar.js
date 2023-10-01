import React from 'react';
import { Image, Tabs, Tab, Button } from '@nextui-org/react';
import PlaylistItem from '../components/sidebar/PlaylistItem';

function SideBar({ userPlaylist, filteredCreatedPlaylist, spotifyAIPlaylist, setCurrentView, currentView }) {
    //turn playlist item into a component
    console.log(userPlaylist)
    return (
        <div className="side-bar h-full min-w-[300px] overflow-hidden pr-4 relative">
            <Button className='bg-[#121212] w-full p-4 rounded-2xl mb-4' onClick={() => setCurrentView({
                view: "chat",
                playlistID: '',
            })}>
                Chat
            </Button>
            <Tabs fullWidth aria-label="Tabs colors" radius="full">
                <Tab key="photos" title="All" className='h-full overflow-auto'>
                    {userPlaylist
                        ? (
                            userPlaylist.map((item) => (
                                <PlaylistItem item={item} currentView={currentView} setCurrentView={setCurrentView} />
                            ))
                        ) : null
                    }
                </Tab>
                <Tab key="gg" title="By You">

                </Tab>
                <Tab key="music" title="By Seba">
                    {spotifyAIPlaylist
                        ? (
                            spotifyAIPlaylist.map((item) => (
                                <PlaylistItem item={item} currentView={currentView} setCurrentView={setCurrentView} />
                            ))
                        ) : null
                    }
                </Tab>
            </Tabs>

            <div className='absolute bottom-0 w-full bg-slate-500 z-1'>
                <Button>Connect to Spotify</Button>
            </div>

        </div >
    );

}

export default SideBar;
