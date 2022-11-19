import type { Client, Interaction, CommandInteraction } from "discord.js";
import commands from "../commands";

/**
 * Listener do evento `interactionCreate` (disparado quando uma interação é recebida pelo cliente)
 */
export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        // Verifica se a interação é um comando (inicia com "/")
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

/** Trata as interações de comando */
const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    // Procurando o comando com o nome informado
    const slashCommand = commands.find(c => c.name == interaction.commandName);

    // Mandando uma mensagem de erro se não encontrar
    if (!slashCommand) {
        interaction.followUp({ content: "Comando não encontrado" });
        return;
    }

    // Rodando o comando encontrado
    slashCommand.run(client, interaction);
};