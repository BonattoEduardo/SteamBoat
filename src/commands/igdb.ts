import type Command from "../interfaces/Command";
import { ApplicationCommandOptionType, ButtonStyle, ComponentType } from "discord.js";
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
            const jogos = await igdbApi.searchGame(nomeJogo);

            await interaction.editReply({
                embeds: [{
                    title: 'Jogos Encontrados (primeiros 5 resultados)',
                    color: 0x8379d9,
                    description: jogos.length == 0 ? 'Nenhum jogo encontrado :(' : undefined,
                    fields: jogos.map((j, i) => ({
                        name: j.name,
                        value: j.alternativeNames?.length
                            ? `Outros nomes: ${j.alternativeNames?.join(', ')}`
                            : 'Nenhum outro nome'
                    }))
                }],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                customId: 'select',
                                type: ComponentType.StringSelect,
                                placeholder: 'Selecione um dos jogos',
                                options: jogos.map(j => ({ label: j.name, value: j.id.toString() })),
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            console.log(error);
            await interaction.editReply(String(error));
        }

    }
};

export default Igdb;