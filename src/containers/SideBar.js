import React from 'react';
import { Image, Tabs, Tab } from '@nextui-org/react';

function SideBar({ userPlaylist, filteredCreatedPlaylist, spotifyAIPlaylist }) {
    //turn playlist item into a component
    return (
        <div className="side-bar h-full w-[400px] overflow-auto pr-4">
            <div className='bg-[#121212] p-4 rounded-2xl'>
                Chat
            </div>
            <Tabs className="w-full" aria-label="Tabs colors" radius="full">
                <Tab key="photos" title="All">
                    {userPlaylist
                        ? (
                            userPlaylist.map((item) => (
                                <div key={item.id} className='flex gap-3 p-2 hover:bg-[#222326] rounded-lg'>
                                    <Image
                                        width={60}
                                        className='min-w-[60px]'
                                        alt="NextUI hero Image"
                                        src={item.images.length > 0 ? item.images[0].url : null}
                                    />
                                    <div className='truncate flex flex-col justify-center'>
                                        <p className='pb-2'>{item.name}</p>
                                        <p className='text-sm text-slate-400'>{item.owner.display_name}</p>
                                    </div>
                                </div>
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
                                <div key={item.id} className='flex gap-3 p-2 hover:bg-[#222326] rounded-lg'>
                                    <Image
                                        width={60}
                                        className='min-w-[60px]'
                                        alt="NextUI hero Image"
                                        src={item.images.length > 0 ? item.images[0].url : null}
                                    />
                                    <div className='truncate flex flex-col justify-center'>
                                        <p className='pb-2'>{item.name}</p>
                                        <p className='text-sm text-slate-400'>{item.owner.display_name}</p>
                                    </div>
                                </div>
                            ))
                        ) : null
                    }
                </Tab>
            </Tabs>

        </div >
    );

}

export default SideBar;
