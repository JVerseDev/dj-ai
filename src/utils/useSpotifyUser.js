import React from "react"
import { useQuery } from "@tanstack/react-query"

async function fetchUserProfile({ queryKey }) {
    const [userProfile, accessToken] = queryKey
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    return userResponse
}

export default function useSpotifyUser(accessToken) {
    const userQuery = useQuery(["userProfile", accessToken], fetchUserProfile, {
        enabled: !!accessToken,
    })

    return userQuery
}
