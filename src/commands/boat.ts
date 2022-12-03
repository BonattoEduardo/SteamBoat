import type Command from "../interfaces/Command";
import { ApplicationCommandOptionType, ComponentType } from "discord.js";
import IGDBApi from "../api/IGDBApi";
import TwitchApi from "../api/TwitchApi";
import gameList from "../components/gameList";
import gameDetails from "../components/gameDetails";
import liveStreams from "../components/liveStreams";

const Boat: Command = {
    name: "boat",
    description: "Navegando...",
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
            const jogos = await IGDBApi.searchGame(nomeJogo);

            const message = await interaction.editReply(gameList(jogos));
            const collector = message.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

            collector.on('collect', async (e) => {
                const id = Number(e.values[0]);
                if (id == null || !isFinite(id)) {
                    await e.reply('Erro: Opção inválida');
                    return;
                }

                await e.deferReply();
                const game = await IGDBApi.getGame(id);
                const message = await e.followUp(gameDetails(game));

                if (game == null) {
                    return;
                }

                const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button });
                collector.on('collect', async (e) => {
                    await e.deferReply();
                    
                    try {
                        const channels = await TwitchApi.searchStreamsForGame(game);
    
                        await e.followUp(liveStreams(game, channels));
                    } catch (error) {
                        console.log(error);
                        await e.followUp(String(error));
                    }
                });
            });

        } catch (error) {
            console.log(error);
            await interaction.editReply(String(error));
        }
    }
};

export default Boat;