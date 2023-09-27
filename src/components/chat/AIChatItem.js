import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";


function AIChatItem({ spotifyResults, streamResults }) {
    const [selectedSong, setSelectedSong] = React.useState('');
    const [open, setOpen] = React.useState(false)

    React.useLayoutEffect(() => {
        spotifyResults && setSelectedSong(spotifyResults[0].uriID)
    }, [spotifyResults])



    return (
        //TODO: Get ref of overflow div and element.scrollHeight > element.clientHeight to see if button and overflow is neede
        <div className={`flex flex-col`} >
            <div className={`relative ${open ? '' : 'max-h-[400px] overflow-hidden rounded-2xl'}`}>
                <Table
                    color="primary"
                    selectionMode="single"
                    defaultSelectedKeys={[selectedSong]}
                    aria-label="Example static collection table"
                    onSelectionChange={(uriID) => setSelectedSong(uriID.anchorKey)}
                    className={`w-full ${open ? '' : ''}`}
                >
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn>ALBUM</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {spotifyResults.map((item, index) => (
                            <TableRow key={item.uriID}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <p className='font-normal'>{item.name}</p>
                                    <p className='text-xs text-[#BEF264]'>{item.artist.name}</p>
                                </TableCell>
                                <TableCell><p className='font-light'>{item.album.name}</p></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button color='primary' variant='light' onClick={() => setOpen(!open)}>{open ? 'View Less' : 'View More'}</Button>
        </div>
    )

}

export default AIChatItem;
