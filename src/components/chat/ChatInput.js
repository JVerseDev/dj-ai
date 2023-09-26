import React from 'react';
import { Input } from '@nextui-org/react';



function ChatInput({ setUserInput, setStreamResults, dispatch }) {
    const formRef = React.useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        //setStreamResults('')
        const userInput = e.target.elements.query.value
        if (userInput.trim().length >= 0) {
            //setUserInput(userInput)
            dispatch({ type: "update", key: "userInput", value: userInput })
        }
        formRef.current.reset()
    }

    return (
        <div className="chat-input absolute bottom-0 py-4 px-16 w-full bg-black">
            <form onSubmit={handleSubmit} ref={formRef}>
                <Input className='' name="query" />
            </form>
        </div >
    );
}

export default ChatInput;
