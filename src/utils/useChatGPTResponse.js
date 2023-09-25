import OpenAI from "openai";
import { useQuery } from "@tanstack/react-query";
import initialSystemInstructions from "./initialSystemInstructions";


//disable dangerouslyAllowBrowser: true later
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

async function fetchChatCompletion({ queryKey }) {
    const [gptres, userInput, setResponse, setStreamResults] = queryKey

    if (userInput.trim().length === 0) {
        throw new Error("Please enter a valid artist, mood, or type")
    }

    //gpt-3.5: 20 secs, turbo 16k-12 secs, gpt-4: 22+ seconds
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            initialSystemInstructions[0].playlist,
            { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo-16k",
        temperature: 1,
    });

    //gpt-3.5: 20 secs, turbo 16k-12 secs, gpt-4: 22+ seconds
    const stream = await openai.chat.completions.create({
        messages: [
            initialSystemInstructions[1].message,
            { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo-16k",
        temperature: 1,
        stream: true,
    });

    for await (const chunk of stream) {
        setStreamResults(
            s => chunk.choices[0].delta.content === undefined
                ? s
                : s + chunk.choices[0].delta.content
        )
    }

    setResponse(JSON.parse(chatCompletion.choices[0].message.content))
    //const gptResponse = chatCompletion.choices[0].message.content

    return chatCompletion
}

export default function useChatGPTResponse(userInput, setResponse, setStreamResults) {
    const gptQuery = useQuery(["gptResponse", userInput, setResponse, setStreamResults], fetchChatCompletion, {
        enabled: !!userInput,
        refetchOnWindowFocus: false
    })
    //openai is our fetch request, it returns a promise

    return gptQuery

}
