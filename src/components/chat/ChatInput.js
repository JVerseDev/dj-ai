import React from 'react';
import { Input } from '@nextui-org/react';



function ChatInput({ setSessionInput, dispatch }) {
    const formRef = React.useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        //setStreamResults('')
        const userInput = e.target.elements.query.value
        if (userInput.trim().length >= 0) {
            setSessionInput(userInput)
            dispatch({ type: "add", userInput })
        }
        formRef.current.reset()
    }

    return (
        <div className="chat-input absolute bottom-0 py-8 px-16 w-full bg-inherit">
            <form onSubmit={handleSubmit} ref={formRef}>
                <Input className='' name="query" />
            </form>
        </div >
    );
}

export default ChatInput;
