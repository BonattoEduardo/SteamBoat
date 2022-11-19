import { ApplicationCommandOptionType } from "discord.js";
import IGDBApi from "../api/IGDBApi";
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

        try {
            const igdbApi = new IGDBApi();
            const gameData = await igdbApi.searchGame(nomeJogo);

            await interaction.editReply(`Jogo encontrado: ${gameData.name}`);
        } catch (error) {
            await interaction.editReply(String(error));
        }
    }
};

export default Boat;