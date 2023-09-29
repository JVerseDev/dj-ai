import React from 'react';

const initialState = [

]

function reducer(state, action) {
    switch (action.type) {
        case "initialRender":
            return action.localStorage
        case "add":
            const newState = [
                ...state,
                {
                    id: new Date(),
                    playlistID: '',
                    userInput: action.userInput,
                    seba: {
                        message: "",
                        songs: "",
                        spotify: "",
                    }
                }
            ]
            localStorage.setItem("chat", JSON.stringify(newState))
            return newState
        case "updatePlaylist":
            const playlist = state.map((item, index) => (
                index === state.length - 1
                    ? {
                        ...item,
                        seba: {
                            ...item.seba,
                            [action.key]: action.value,
                        }
                    }
                    : item
            ))
            localStorage.setItem("chat", JSON.stringify(playlist))
            return playlist
        case "updateMessage":
            const message = state.map((item, index) => (
                index === state.length - 1
                    ? {
                        ...item,
                        seba: {
                            ...item.seba,
                            [action.key]: item.seba[action.key] + action.value,
                        }
                    }
                    : item
            ))
            localStorage.setItem("chat", JSON.stringify(message))
            return message
        case "addPlaylistID":
            const spotifyPlaylistCreated = state.map((item) => (
                item.id === action.selectedID
                    ? {
                        ...item,
                        playlistID: action.playlistID
                    }
                    : item
            ))
            localStorage.setItem("chat", JSON.stringify(spotifyPlaylistCreated))
            return spotifyPlaylistCreated
    }

}

function useChatReducer() {
    const [chatState, dispatch] = React.useReducer(reducer, initialState)

    return [chatState, dispatch]
}

export default useChatReducer;

/*
 {
        "id": "2023-09-26T14:53:36.792Z",
        "userInput": "madeon",
        "seba": {
            "message": "Absolutely! My friend, I've got you covered. Here's a fantastic playlist featuring artists who have a similar style and energy as Madeon. Get ready to be transported to an electrifying world of uplifting melodies, infectious beats, and euphoric sounds. Enjoy the playlist and let the music ignite your soul! 🎧🌟🎹false",
            "songs": {
                "playlist": [
                    {
                        "artist": "Porter Robinson",
                        "song": "Language"
                    },
                    {
                        "artist": "Nero",
                        "song": "Promises"
                    },
                    {
                        "artist": "Zedd",
                        "song": "Spectrum"
                    },
                    {
                        "artist": "Mat Zo",
                        "song": "Easy"
                    },
                    {
                        "artist": "Arty",
                        "song": "When I See You"
                    },
                    {
                        "artist": "Foxes",
                        "song": "Clarity"
                    },
                    {
                        "artist": "Porter Robinson",
                        "song": "Sad Machine"
                    },
                    {
                        "artist": "Disclosure",
                        "song": "You & Me"
                    },
                    {
                        "artist": "Madeon",
                        "song": "Pay No Mind"
                    },
                    {
                        "artist": "Dillon Francis",
                        "song": "Coming Over"
                    },
                    {
                        "artist": "Martin Garrix",
                        "song": "Scared to be Lonely"
                    },
                    {
                        "artist": "Flume",
                        "song": "Never Be Like You"
                    },
                    {
                        "artist": "Porter Robinson",
                        "song": "Flicker"
                    },
                    {
                        "artist": "Louis The Child",
                        "song": "Better Not"
                    },
                    {
                        "artist": "ODESZA",
                        "song": "Say My Name"
                    },
                    {
                        "artist": "Madeon",
                        "song": "All My Friends"
                    },
                    {
                        "artist": "Porter Robinson",
                        "song": "Divinity"
                    },
                    {
                        "artist": "San Holo",
                        "song": "Light"
                    },
                    {
                        "artist": "Madeon",
                        "song": "Shelter"
                    },
                    {
                        "artist": "Virtual Self",
                        "song": "Ghost Voices"
                    }
                ]
            },
            "spotify": [
                {
                    "name": "Language",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/d2ae99ac464b268b70b8208a759556057e0742b8?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Language",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2736046328819f2994a34214b7f",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Porter Robinson",
                        "url": "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
                        "uri": "spotify:artist:3dz0NnIZhtKKeXZxLOxCam"
                    },
                    "url": "https://open.spotify.com/track/3NRDLYyqIXja0UElvdzjkB",
                    "uri": "spotify:track:3NRDLYyqIXja0UElvdzjkB",
                    "uriID": "3NRDLYyqIXja0UElvdzjkB"
                },
                {
                    "name": "Promises - Skrillex & Nero Remix",
                    "preview_song_url": null,
                    "album": {
                        "name": "Welcome Reality +",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2734a00dec9ce1677ff4fbfeb91",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "NERO",
                        "url": "https://open.spotify.com/artist/4uRYpUQZrNrY5t8tAv3XrD",
                        "uri": "spotify:artist:4uRYpUQZrNrY5t8tAv3XrD"
                    },
                    "url": "https://open.spotify.com/track/7569Hbv0FUS7vjkdGvdgeZ",
                    "uri": "spotify:track:7569Hbv0FUS7vjkdGvdgeZ",
                    "uriID": "7569Hbv0FUS7vjkdGvdgeZ"
                },
                {
                    "name": "Spectrum",
                    "preview_song_url": null,
                    "album": {
                        "name": "Clarity",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b273941dd3b3343d9cb9329d37bf",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Zedd",
                        "url": "https://open.spotify.com/artist/2qxJFvFYMEDqd7ui6kSAcq",
                        "uri": "spotify:artist:2qxJFvFYMEDqd7ui6kSAcq"
                    },
                    "url": "https://open.spotify.com/track/1dFkD1JfRMzwO6hwUsE8aS",
                    "uri": "spotify:track:1dFkD1JfRMzwO6hwUsE8aS",
                    "uriID": "1dFkD1JfRMzwO6hwUsE8aS"
                },
                {
                    "name": "Easy - Radio Edit",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/f6cadb00cf6a17ace05cbb0637b2d9085c1efd7f?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Easy",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2730fe5b29de5c144967cf6e171",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Mat Zo",
                        "url": "https://open.spotify.com/artist/2n7USVO8fO8FF8zq4kG2N1",
                        "uri": "spotify:artist:2n7USVO8fO8FF8zq4kG2N1"
                    },
                    "url": "https://open.spotify.com/track/03p1o66Hn130t8TzeLLi34",
                    "uri": "spotify:track:03p1o66Hn130t8TzeLLi34",
                    "uriID": "03p1o66Hn130t8TzeLLi34"
                },
                {
                    "name": "When I See You - Alesso Mix",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/fa18f70e57e2f9352de202e0e08c4fb31eb00e0e?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "When I See You (Alesso Mix)",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2733ef4131ddd6e90abcb60d3ea",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "ARTY",
                        "url": "https://open.spotify.com/artist/1rSGNXhhYuWoq9BEz5DZGO",
                        "uri": "spotify:artist:1rSGNXhhYuWoq9BEz5DZGO"
                    },
                    "url": "https://open.spotify.com/track/2JRzwYtKysqmvkCk8W5C2g",
                    "uri": "spotify:track:2JRzwYtKysqmvkCk8W5C2g",
                    "uriID": "2JRzwYtKysqmvkCk8W5C2g"
                },
                {
                    "name": "Clarity - Acoustic",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/b9ffdf03d574e841fdf6b4bf9b0227ee266027e7?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Acoustic Sessions (Spotify)",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b27384662dd6e2cbe4e5c11e254e",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Foxes",
                        "url": "https://open.spotify.com/artist/7qRll6DYV06u2VuRPAVqug",
                        "uri": "spotify:artist:7qRll6DYV06u2VuRPAVqug"
                    },
                    "url": "https://open.spotify.com/track/3Dd74brVmZzIfc532iBBB2",
                    "uri": "spotify:track:3Dd74brVmZzIfc532iBBB2",
                    "uriID": "3Dd74brVmZzIfc532iBBB2"
                },
                {
                    "name": "Sad Machine",
                    "preview_song_url": null,
                    "album": {
                        "name": "Worlds",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2731f675e7b8bae408653346dd9",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Porter Robinson",
                        "url": "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
                        "uri": "spotify:artist:3dz0NnIZhtKKeXZxLOxCam"
                    },
                    "url": "https://open.spotify.com/track/1JY6B9ILvmRla2IKKRZvnH",
                    "uri": "spotify:track:1JY6B9ILvmRla2IKKRZvnH",
                    "uriID": "1JY6B9ILvmRla2IKKRZvnH"
                },
                {
                    "name": "You & Me - Flume Remix",
                    "preview_song_url": null,
                    "album": {
                        "name": "Settle (The Remixes)",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2737cc97670c72e565337cfb3e0",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Disclosure",
                        "url": "https://open.spotify.com/artist/6nS5roXSAGhTGr34W6n7Et",
                        "uri": "spotify:artist:6nS5roXSAGhTGr34W6n7Et"
                    },
                    "url": "https://open.spotify.com/track/1snNAXmmPXCn0dkF9DaPWw",
                    "uri": "spotify:track:1snNAXmmPXCn0dkF9DaPWw",
                    "uriID": "1snNAXmmPXCn0dkF9DaPWw"
                },
                {
                    "name": "Pay No Mind (feat. Passion Pit)",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/29e4fa3d1476e4ceb8c2797444f9e44eaeb94ae0?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Adventure (Deluxe)",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b27392cb28b37837c67dffe602f9",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Madeon",
                        "url": "https://open.spotify.com/artist/4pb4rqWSoGUgxm63xmJ8xc",
                        "uri": "spotify:artist:4pb4rqWSoGUgxm63xmJ8xc"
                    },
                    "url": "https://open.spotify.com/track/3rsq3qtqNBId48c0IVraTS",
                    "uri": "spotify:track:3rsq3qtqNBId48c0IVraTS",
                    "uriID": "3rsq3qtqNBId48c0IVraTS"
                },
                {
                    "name": "Coming Over (feat. James Hersey)",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/08466e2522e69a364729e60dd51cfdecd86214d5?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "This Mixtape is Fire.",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b273f99413a5d2a4185bf18c5e81",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Dillon Francis",
                        "url": "https://open.spotify.com/artist/5R3Hr2cnCCjt220Jmt2xLf",
                        "uri": "spotify:artist:5R3Hr2cnCCjt220Jmt2xLf"
                    },
                    "url": "https://open.spotify.com/track/6m3ZWIXhjoV76syT1j2oE9",
                    "uri": "spotify:track:6m3ZWIXhjoV76syT1j2oE9",
                    "uriID": "6m3ZWIXhjoV76syT1j2oE9"
                },
                {
                    "name": "Scared to Be Lonely",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/49e6a27ef1e85764d5758ae6238f003601a53d7d?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Scared to Be Lonely",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b27364f8a309aa3c0a66a31fc374",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Martin Garrix",
                        "url": "https://open.spotify.com/artist/60d24wfXkVzDSfLS6hyCjZ",
                        "uri": "spotify:artist:60d24wfXkVzDSfLS6hyCjZ"
                    },
                    "url": "https://open.spotify.com/track/3ebXMykcMXOcLeJ9xZ17XH",
                    "uri": "spotify:track:3ebXMykcMXOcLeJ9xZ17XH",
                    "uriID": "3ebXMykcMXOcLeJ9xZ17XH"
                },
                {
                    "name": "Never Be Like You (feat. Kai)",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/b8bdc762015ebc81a392f4e95bf53074e0d3f8a8?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Skin",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b273750d4a1b362296d1b815a223",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Flume",
                        "url": "https://open.spotify.com/artist/6nxWCVXbOlEVRexSbLsTer",
                        "uri": "spotify:artist:6nxWCVXbOlEVRexSbLsTer"
                    },
                    "url": "https://open.spotify.com/track/5WI2ltQIdwgzf1SNE76JyR",
                    "uri": "spotify:track:5WI2ltQIdwgzf1SNE76JyR",
                    "uriID": "5WI2ltQIdwgzf1SNE76JyR"
                },
                {
                    "name": "Flicker",
                    "preview_song_url": null,
                    "album": {
                        "name": "Worlds",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2731f675e7b8bae408653346dd9",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Porter Robinson",
                        "url": "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
                        "uri": "spotify:artist:3dz0NnIZhtKKeXZxLOxCam"
                    },
                    "url": "https://open.spotify.com/track/6BivCuyKJtgLa9ooFsvUoZ",
                    "uri": "spotify:track:6BivCuyKJtgLa9ooFsvUoZ",
                    "uriID": "6BivCuyKJtgLa9ooFsvUoZ"
                },
                {
                    "name": "Better Not (with Wafia)",
                    "preview_song_url": null,
                    "album": {
                        "name": "Kids At Play- EP",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b27353c069027efd7447798e844d",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Louis The Child",
                        "url": "https://open.spotify.com/artist/7wg1qvie3KqDNQbAkTdbX0",
                        "uri": "spotify:artist:7wg1qvie3KqDNQbAkTdbX0"
                    },
                    "url": "https://open.spotify.com/track/7n1940b6kHcaEewFSZXnXa",
                    "uri": "spotify:track:7n1940b6kHcaEewFSZXnXa",
                    "uriID": "7n1940b6kHcaEewFSZXnXa"
                },
                {
                    "name": "Say My Name",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/d4c7d4f4111a05c65c5bef988cb6bd8fe091e4f0?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "In Return",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2737348311d84dc91045dd5dbf9",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "ODESZA",
                        "url": "https://open.spotify.com/artist/21mKp7DqtSNHhCAU2ugvUw",
                        "uri": "spotify:artist:21mKp7DqtSNHhCAU2ugvUw"
                    },
                    "url": "https://open.spotify.com/track/1LeItUMezKA1HdCHxYICed",
                    "uri": "spotify:track:1LeItUMezKA1HdCHxYICed",
                    "uriID": "1LeItUMezKA1HdCHxYICed"
                },
                {
                    "name": "All My Friends",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/624c95af1ebaf3de58e6d8684ee057a995770e7e?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Good Faith",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b273dc384e6d13983fe1cd415ade",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Madeon",
                        "url": "https://open.spotify.com/artist/4pb4rqWSoGUgxm63xmJ8xc",
                        "uri": "spotify:artist:4pb4rqWSoGUgxm63xmJ8xc"
                    },
                    "url": "https://open.spotify.com/track/3ArdPRbscsYB2uI70AzpuG",
                    "uri": "spotify:track:3ArdPRbscsYB2uI70AzpuG",
                    "uriID": "3ArdPRbscsYB2uI70AzpuG"
                },
                {
                    "name": "Divinity",
                    "preview_song_url": null,
                    "album": {
                        "name": "Worlds",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2731f675e7b8bae408653346dd9",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Porter Robinson",
                        "url": "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
                        "uri": "spotify:artist:3dz0NnIZhtKKeXZxLOxCam"
                    },
                    "url": "https://open.spotify.com/track/18cCBvygH6yEFDY0cYN3wT",
                    "uri": "spotify:track:18cCBvygH6yEFDY0cYN3wT",
                    "uriID": "18cCBvygH6yEFDY0cYN3wT"
                },
                {
                    "name": "Light",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/df4cd25e3fe93b489e81b0ace76cc112fedb0192?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Light",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b273a5c1582e2b2b087ee7862758",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "San Holo",
                        "url": "https://open.spotify.com/artist/0jNDKefhfSbLR9sFvcPLHo",
                        "uri": "spotify:artist:0jNDKefhfSbLR9sFvcPLHo"
                    },
                    "url": "https://open.spotify.com/track/6jq6rcOikCZAmjliAgAmfT",
                    "uri": "spotify:track:6jq6rcOikCZAmjliAgAmfT",
                    "uriID": "6jq6rcOikCZAmjliAgAmfT"
                },
                {
                    "name": "Ghost Voices",
                    "preview_song_url": "https://p.scdn.co/mp3-preview/edcf0f6357322cda0a3259e41029ba3afb4007d8?cid=6b42d12ccbbe4a67837f46ba132701db",
                    "album": {
                        "name": "Virtual Self",
                        "img": {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b2734ba2d15b6e7f470bfd3e424e",
                            "width": 640
                        }
                    },
                    "artist": {
                        "name": "Virtual Self",
                        "url": "https://open.spotify.com/artist/0F52YLV7uWqaJfMMDgG737",
                        "uri": "spotify:artist:0F52YLV7uWqaJfMMDgG737"
                    },
                    "url": "https://open.spotify.com/track/7ipGvvE90ROUNFw7ZBXBTO",
                    "uri": "spotify:track:7ipGvvE90ROUNFw7ZBXBTO",
                    "uriID": "7ipGvvE90ROUNFw7ZBXBTO"
                }
            ]
        }
    }
    */