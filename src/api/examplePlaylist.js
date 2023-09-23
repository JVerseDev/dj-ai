const playlist = [
    {
        "artist": "Calvin Harris",
        "album": "Motion",
        "song": "Blame"
    },
    {
        "artist": "Avicii",
        "album": "True",
        "song": "Levels"
    },
    {
        "artist": "Zedd",
        "album": "True Colors",
        "song": "Stay"
    },
    {
        "artist": "David Guetta",
        "album": "Listen",
        "song": "Hey Mama"
    },
    {
        "artist": "Martin Garrix",
        "album": "BYLAW",
        "song": "Byte"
    },
    {
        "artist": "The Chainsmokers",
        "album": "Memories...Do Not Open",
        "song": "Don't Let Me Down"
    },
    {
        "artist": "Kaskade",
        "album": "Atmosphere",
        "song": "I Remember"
    },
    {
        "artist": "Alesso",
        "album": "Forever",
        "song": "Heroes (we could be)"
    },
    {
        "artist": "Hardwell",
        "album": "United We Are",
        "song": "Apollo"
    },
    {
        "artist": "Steve Aoki",
        "album": "Neon Future I",
        "song": "Delirious (Boneless)"
    },
    {
        "artist": "Tiesto",
        "album": "Kaleidoscope",
        "song": "Red Lights"
    },
    {
        "artist": "Skrillex",
        "album": "Recess",
        "song": "Bangarang"
    },
    {
        "artist": "Dimitri Vegas & Like Mike",
        "album": "Smash The House Radio",
        "song": "Waves (Tomorrowland 2014 Anthem)"
    },
    {
        "artist": "Galantis",
        "album": "Pharmacy",
        "song": "Runaway (U & I)"
    },
    {
        "artist": "Axwell Λ Ingrosso",
        "album": "More Than You Know",
        "song": "Sun Is Shining"
    },
    {
        "artist": "Robin Schulz",
        "album": "Prayer",
        "song": "Sun Goes Down"
    },
    {
        "artist": "Diplo",
        "album": "Random White Dude Be Everywhere",
        "song": "Revolution"
    },
    {
        "artist": "Nicky Romero",
        "album": "Protocol Radio - July 2014",
        "song": "Toulouse"
    },
    {
        "artist": "Alok",
        "album": "Big Jet Plane",
        "song": "Hear Me Now"
    },
    {
        "artist": "Swedish House Mafia",
        "album": "Until Now",
        "song": "Don't You Worry Child"
    }
]

export default playlist

console.log("spotify")


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

async function fetchSongs() {
    const { access_token } = await requestAccessToken()

    const fetchedPlaylist = await Promise.all(playlist.map((item) => {
        const searchString = `?q=${encodeURIComponent(item.album)}%20track:${encodeURIComponent(item.song)}%20artist:${encodeURIComponent(item.artist)}&type=track`
        console.log(searchString)
        const response = fetch(`https://api.spotify.com/v1/search${searchString}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${access_token}` },
        })
        return response
    })
    )

    const filteredResponses = fetchedPlaylist.filter(item => item.status === 200)

    const data = await Promise.all(filteredResponses.map(item => item.json()))


    console.log(data[1])
    console.log(data.length)

    // Search tracks -> get first item from tracks array -> create an array of selected tracks URI -> create playlist -> add tracks to playlist
}

fetchSongs()



/*
{
  access_token: 'BQCafE8ZRkXrPKn9Q6GVLVxcViPKQkxn80xNqa9eQgDGscU8sgxYam3WjOJ-Gc5Vg45r1P3NoKzHabTBRnxPHzKm-DDg2uoJ-OazomnvqEfBWwh2q1o',
  token_type: 'Bearer',
  expires_in: 3600
}


'https://api.spotify.com/v1/search?query=True+track%3AWake+Me+Up+artist%3AAvicii&type=track&locale=*&offset=0&limit=20'
*/