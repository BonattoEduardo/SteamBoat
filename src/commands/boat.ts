import { ApplicationCommandOptionType } from "discord.js";
import type Command from "../interfaces/Command";

const Boat: Command = {
    name: "boat",
    description: "Navegando pela Steam...",
    options: [
        { 
            name: "jogo",
            description: "Jogo que você deseja pesquisar",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (_, interaction) => {
        await interaction.deferReply();

        const option = interaction.options.data.find(opt => opt.name == "jogo");
        const nomeJogo = option?.value?.toString();

        if (!nomeJogo) {
            await interaction.reply("Ai não né amigão...");
            return;
        }

        // await searchGame(nomeJogo); 
    }
};

export default Boat;