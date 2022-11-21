import dotenv from "dotenv";

dotenv.config();

const { TOKEN, CLIENT_ID, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

if (!TOKEN || !CLIENT_ID  || !TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    throw new Error("As variáveis de ambiente não foram encontradas");
}

const config = {
    TOKEN,
    CLIENT_ID,
    TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET
}

export default config;