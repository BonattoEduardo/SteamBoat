import { Client } from "discord.js";
import BaseTwitchApi from "./api/BaseTwitchApi";
import config from "./config";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

console.log(`O bot está iniciando...`);

const client = new Client({ intents: [] });

// Listeners de eventos do cliente (`client`)
ready(client);
interactionCreate(client);

// Fazendo login do bot
client.login(config.TOKEN);

// Inicializando o token de autenticação da twitch
BaseTwitchApi.init();