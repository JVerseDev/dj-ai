const express = require('express');
const cors = require('cors'); // Import the 'cors' package
const querystring = require('querystring');
const fetch = require('node-fetch'); //npm i node-fetch@2

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

const clientId = '6b42d12ccbbe4a67837f46ba132701db';
const clientSecret = '73ff00832bd24ff1af4b56f605721e66';
const redirectUri = 'http://localhost:3001/callback';

const apiUrl = 'https://api.spotify.com/v1';
const createPlaylistUrl = `${apiUrl}/me/playlists`;

app.get('/callback', async (req, res) => {
    //req.params.id /:id
    const code = req.query.code;
    console.log('hello')

    const tokenResponse = await requestAccessToken(code);

    console.log(tokenResponse)
    const accessToken = tokenResponse;

    res.send(accessToken);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function requestAccessToken(code) {

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback"); //The redirect_uri in the post request has to be the same as the first redirect_uri from the client side. 

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: params
    }).then(res => res.json());

    console.log(result)

    return result
}

const refreshAccessToken = (refreshToken) => {
    // Make a POST request to the token endpoint of the authorization server
    const result = fetch('https://api.example.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then((data) => {
            // The response should contain a new access token
            const newAccessToken = data.access_token;
            // You can use the new access token to make authenticated API requests
            console.log('New Access Token:', newAccessToken);
        })
        .catch((error) => {
            console.error('Error refreshing access token:', error);
        });

    return result
}

