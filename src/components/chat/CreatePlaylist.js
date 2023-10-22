import React from 'react';
import { Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";


function CreatePlaylist({ children, chatItem, handleAddPlaylist }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formState, setFormState] = React.useState({
        title: '',
        description: ''
    })

    const handleForms = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }
    return (
        <>
            <Button onPress={onOpen}>Create Playlist</Button>
            <Modal className='mytheme text-foreground' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalHeader className="flex flex-col gap-1">Create Playlist</ModalHeader>
                            <ModalBody fullWidth>
                                <Input
                                    id="title"
                                    label="Title"
                                    labelPlacement="outside"
                                    placeholder="Enter your title"
                                    value={formState.title}
                                    onChange={handleForms}
                                />
                                <Textarea
                                    id="description"
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Enter your description"
                                    onChange={handleForms}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color='primary'
                                    isDisabled={chatItem.playlistID ? true : false}
                                    onClick={() => handleAddPlaylist(
                                        {
                                            playlist: chatItem.seba.spotify.map(song => song.uri),
                                            selectedID: chatItem.id,
                                            title: formState.title,
                                            description: formState.description
                                        }
                                    )}>
                                    {chatItem.playlistID ? 'Playlist Added ✓' : 'Add to Playlist'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

}

export default CreatePlaylist;
