import type { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";

export default interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}