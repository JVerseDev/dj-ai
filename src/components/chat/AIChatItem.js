import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from "@nextui-org/react";

function AIChatItem({ spotifyResults, streamResults }) {
    const [selectedSong, setSelectedSong] = React.useState('');

    React.useEffect(() => {
        spotifyResults && setSelectedSong(spotifyResults[0].uriID)
    }, [spotifyResults])

    return (
        <div>
            <iframe className='h-20 w-full mt-4' src={`https://open.spotify.com/embed/track/${selectedSong}?utm_source=generator`} width="100%" height="352" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <Table
                color="primary"
                selectionMode="single"
                defaultSelectedKeys={[selectedSong]}
                aria-label="Example static collection table"
                onSelectionChange={(uriID) => setSelectedSong(uriID.anchorKey)}
            >
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>ALBUM</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    {spotifyResults.map((item, index) => (
                        <TableRow key={item.uriID}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {item.name}
                                <p>{item.artist.name}</p>
                            </TableCell>
                            <TableCell>{item.album.name}</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )

}

export default AIChatItem;
