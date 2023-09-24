import OpenAI from "openai";
import { useQuery } from "@tanstack/react-query";
import initialSystemInstructions from "./initialSystemInstructions";


//disable dangerouslyAllowBrowser: true later
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

async function fetchChatCompletion({ queryKey }) {
    const [gptres, userInput, setResponse, setUserInput] = queryKey

    if (userInput.trim().length === 0) {
        throw new Error("Please enter a valid artist, mood, or type")
    }

    //gpt-3.5: 20 secs, turbo 16k-12 secs, gpt-4: 22+ seconds
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            initialSystemInstructions,
            { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo-16k",
        temperature: 1,
    });

    setResponse(JSON.parse(chatCompletion.choices[0].message.content))
    //const gptResponse = chatCompletion.choices[0].message.content

    return chatCompletion
}

export default function useChatGPTResponse(userInput, setResponse, setUserInput) {
    const gptQuery = useQuery(["gptResponse", userInput, setResponse, setUserInput], fetchChatCompletion, {
        enabled: !!userInput,
        refetchOnWindowFocus: false
    })
    //openai is our fetch request, it returns a promise

    return gptQuery

}
