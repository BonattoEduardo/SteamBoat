import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

// Listeners de eventos do cliente (`client`)
ready(client);
interactionCreate(client);

// Fazendo login do bot
client.login(process.env.TOKEN);