require('dotenv').config();
const request = require('request');

const getTokem = (url: string | undefined, callback: { (res: any): string; (arg0: any): void; }) => {
    const options = {
        url: process.env.TWITCH_GET_TOKEN,
        json: true,
        body: {
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            grant_type: 'client_credentials'
        }
    };
    request.post(options, (err: any, res: any, body: any) => {
        if (err) {
            return console.log(err);
        }
        console.log('Statis: ${res.statusCode}');
        console.log(body);

        callback(res);

    });
};

var AT = '';
getTokem(process.env.TWITCH_GET_TOKEN, (res: { body: { access_token: string; }; }) => {
    AT = res.body.access_token;
    return AT;
});

const getGames = (url: string | undefined, access_token: string, callback: (reponse: any) => void) => {
    const gameOptions = {
        url: process.env.TWITCH_GET_GAMES,
        method: 'GET',
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': 'Bearer ' + access_token
        }
    };

    request.get(gameOptions, (err: any, res: any, body: string) => {
        if (err) {
            return console.log(err);
        }
        console.log('Status: $(res.statusCode');
        console.log(JSON.parse(body));

    });
};

setTimeout(() => {
    getGames(process.env.GET_GAMES, AT, (reponse: any) => {

    })
}, 2000);