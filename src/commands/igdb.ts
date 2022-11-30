import type Command from "../interfaces/Command";
import { ApplicationCommandOptionType, ComponentType } from "discord.js";
import IGDBApi from "../api/IGDBApi";
import gameDetails from "../components/gameDetails";
import gameList from "../components/gameList";
import TwitchApi from "../api/TwitchApi";

/** Comando que permite pesquisar jogos na api do IGDB */
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
            const jogos = await igdbApi.searchGame(nomeJogo);

            const message = await interaction.editReply(gameList(jogos));
            const collector = message.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

            collector.on('collect', async (e) => {
                const id = Number(e.values[0]);
                if (id == null || !isFinite(id)) {
                    await e.reply('Erro: Opção inválida');
                    return;
                }

                await e.deferReply();
                const game = await igdbApi.getGame(id);
                const message = await e.followUp(gameDetails(game));

                if (game == null) {
                    return;
                }

                const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button });
                collector.on('collect', async (e) => {
                    await e.deferReply();
                    
                    try {
                        const twitchApi = new TwitchApi();
                        const channels = await twitchApi.searchStreamsForGame(game);
    
                        await e.followUp(
                            `Canais ao vivo jogando ${nomeJogo}:` +
                            `\n${channels.map(c => 'https://www.twitch.tv/'+c.display_name).join('\n')}`
                        );
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

export default Igdb;