import type { Client } from "discord.js";
import commands from "src/commands";

/**
 * Listener do evento `ready` (disparado quando o cliente está pronto para execução)
 */
export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        // Registrando os comandos na aplicação
        await client.application.commands.set(commands);

        console.log(`${client.user.username} is online`);
    });
}; 