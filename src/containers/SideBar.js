import React from 'react';
import { Image, Tabs, Tab } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function SideBar({ userPlaylist, filteredCreatedPlaylist, spotifyAIPlaylist }) {
    //turn playlist item into a component
    console.log(userPlaylist)
    return (
        <div className="side-bar h-full w-[320px] overflow-auto pr-4">
            <Link to='/'>
                <div className='bg-[#121212] p-4 rounded-2xl'>
                    Chat
                </div>
            </Link>
            <Tabs className="w-full" aria-label="Tabs colors" radius="full">
                <Tab key="photos" title="All">
                    {userPlaylist
                        ? (
                            userPlaylist.map((item) => (
                                <Link to={`playlist/${item.id}`}>
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
                                </Link>

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
                                <Link to={`playlist/${item.id}`}>
                                    <div key={item.id} className='flex gap-3 p-2 hover:bg-[#222326] rounded-lg'>
                                        <Image
                                            width={52}
                                            className='min-w-[52px]'
                                            alt="NextUI hero Image"
                                            src={item.images.length > 0 ? item.images[0].url : null}
                                        />
                                        <div className='truncate flex flex-col justify-center'>
                                            <p className='text-sm pb-2'>{item.name}</p>
                                            <p className='text-sm text-slate-400'>{item.owner.display_name}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : null
                    }
                </Tab>
            </Tabs>

        </div >
    );

}

export default SideBar;
