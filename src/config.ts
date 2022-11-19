import dotenv from "dotenv";

dotenv.config();

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
    throw new Error("As variáveis de ambiente não foram encontradas");
}

const config = {
    TOKEN,
    CLIENT_ID
}

export default config;