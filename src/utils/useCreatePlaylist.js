import React from "react"
import { useQuery } from "@tanstack/react-query"

async function createPlaylist({ queryKey }) {
    const [playlistId, accessToken, playlistToAdd, setPlaylistToAdd, dispatch] = queryKey
    const { playlist, selectedID, title, description } = playlistToAdd
    //gets user id
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())

    console.log(userResponse)

    const user_id = userResponse.id

    const createdPlaylist = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: title || 'SEBA',
            description: description || 'A playlist created using CHAT GPT x Spotify API',
            public: false,
        }),
    }).then(res => res.json())
    console.log(createdPlaylist)

    const playlist_id = createdPlaylist.id

    const addResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks
    `, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uris: playlist,
            position: 0
        }),
    }).then(res => res.json())
    console.log(addResponse)

    dispatch({ type: "addPlaylistID", selectedID: selectedID, playlistID: playlist_id })
    setPlaylistToAdd('')

    return addResponse
}

export default function useCreatePlaylist(accessToken, playlistToAdd, setPlaylistToAdd, dispatch) {
    const playlistQuery = useQuery(["playlist_id", accessToken, playlistToAdd, setPlaylistToAdd, dispatch], createPlaylist, {
        enabled: !!accessToken && !!playlistToAdd,
    })
    return playlistQuery
}
