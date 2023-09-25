import { useQuery } from "@tanstack/react-query";

function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        const duplicate = unique.some(item => item.uriID === element.uriID);
        console.log(duplicate)
        if (!duplicate) {
            unique.push(element);
        }
    });
    return unique;
}

async function requestAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=6b42d12ccbbe4a67837f46ba132701db&client_secret=73ff00832bd24ff1af4b56f605721e66",
    });

    const data = await response.json()
    return data
}

async function fetchSongs({ queryKey }) {
    console.log('fetching songs from Spotify...')
    const [songsList, playlist, setSpotifyResults] = queryKey
    const { access_token } = await requestAccessToken()

    //searches through the spotify tracks catalog using the track and artist name as filters
    const fetchedPlaylist = await Promise.all(playlist.map((item) => {
        const searchString = `?q=track:${encodeURIComponent(item.song)}%20artist:${encodeURIComponent(item.artist)}&type=track`
        const response = fetch(`https://api.spotify.com/v1/search${searchString}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${access_token}` },
        })
        return response
    })
    )

    const filteredResponses = fetchedPlaylist.filter(item => item.status === 200)

    const data = await Promise.all(filteredResponses.map(item => item.json()))

    //filters through each item and only returns ones that have a search result. Then maps through each item to return a formatted array of objects 
    const filteredData = data.filter(item => item.tracks.items.length > 0)
        .map(item => (
            {
                name: item.tracks.items[0].name,
                preview_song_url: item.tracks.items[0].preview_url,
                album: {
                    name: item.tracks.items[0].album.name,
                    img: { ...item.tracks.items[0].album.images[0] },
                },
                artist: {
                    name: item.tracks.items[0].album.artists[0].name,
                    url: item.tracks.items[0].album.artists[0].external_urls.spotify,
                    uri: item.tracks.items[0].album.artists[0].uri
                },
                url: item.tracks.items[0].external_urls.spotify,
                uri: item.tracks.items[0].uri,
                uriID: item.tracks.items[0].id,
            }
        ))

    setSpotifyResults(removeDuplicates(filteredData))

    return filteredData
}

export default function useSpotify(playlist, setSpotifyResults) {
    const spotifyQuery = useQuery(["songsList", playlist, setSpotifyResults], fetchSongs,
        {
            enabled: !!playlist,
            refetchOnWindowFocus: false
        })

    return spotifyQuery
}



