import { ApplicationCommandOptionType } from "discord.js";
import IGDBApi from "../api/IGDBApi";
import type Command from "../interfaces/Command";

const IGDBA: Command = {
    name: "igdba",
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
            const IBGA = new IGDBApi();
            const resposta = await IBGA.searchGame(nomeJogo);

            await interaction.editReply(`${resposta}`);
        } catch (error) {
            await interaction.editReply(String(error));
        }

    }
};

export default IGDBA;