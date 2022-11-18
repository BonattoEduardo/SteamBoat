import type { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";

/** Tipo dos objetos de comando */
export default interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}