import OpenAI from "openai";
import { useQuery } from "@tanstack/react-query";
import initialSystemInstructions from "./initialSystemInstructions";


//disable dangerouslyAllowBrowser: true later
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

//TODO: Break this up into several fucntions
async function fetchChatCompletion({ queryKey }) {
    const [gptres, userInput, dispatch, setGPTPlaylist] = queryKey

    if (userInput.trim().length === 0) {
        throw new Error("Please enter a valid artist, mood, or type")
    }

    console.log("gpt fired")

    //gpt-3.5: 20 secs, turbo 16k-12 secs, gpt-4: 22+ seconds
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            initialSystemInstructions[0].playlist,
            { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo-16k",
        temperature: 1,
    });

    const stream = await openai.chat.completions.create({
        messages: [
            initialSystemInstructions[1].message,
            { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo-16k",
        temperature: 1,
        stream: true,
    });

    //updates state as gpt streams...
    for await (const chunk of stream) {
        dispatch({ type: "updateMessage", key: "message", value: (chunk.choices[0].delta.content !== undefined ? chunk.choices[0].delta.content : '') })
    }

    dispatch({ type: "updatePlaylist", key: "songs", value: JSON.parse(chatCompletion.choices[0].message.content) })
    setGPTPlaylist(JSON.parse(chatCompletion.choices[0].message.content))

    return chatCompletion
}

export default function useChatGPTResponse(userInput, dispatch, setGPTPlaylist) {
    const gptQuery = useQuery(["gptResponse", userInput, dispatch, setGPTPlaylist], fetchChatCompletion, {
        enabled: !!userInput,
        refetchOnWindowFocus: false
    })

    return gptQuery

}
