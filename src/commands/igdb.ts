import type Command from "../interfaces/Command";
import { ApplicationCommandOptionType } from "discord.js";
import IGDBApi from "../api/IGDBApi";

const Igdb: Command = {
    name: "igdb",
    description: "Procura jogo...",
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
            const resposta = await igdbApi.searchGame(nomeJogo);

            await interaction.editReply(`Jogo Pesquisado: ${resposta?.name}`);
        } catch (error) {
            console.log(error);
            await interaction.editReply(String(error));
        }

    }
};

export default Igdb;