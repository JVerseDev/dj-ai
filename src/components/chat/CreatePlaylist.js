import React from 'react';
import { Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";


function CreatePlaylist({ children }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal className='mytheme text-foreground' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalHeader className="flex flex-col gap-1">Create Playlist</ModalHeader>
                            <ModalBody fullWidth>
                                <Input
                                    label="Title"
                                    labelPlacement="outside"
                                    placeholder="Enter your title"

                                />
                                <Textarea
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Enter your description"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {children}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

}

export default CreatePlaylist;
