import type GameData from "../interfaces/GameData";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonStyle, InteractionReplyOptions } from "discord.js";

/** Constante do ID do botão de requisição das lives de um jogo */
export const IGDB_LIVES_BUTTON = 'igdb_lives_button';

/** Retorna o componente de detalhes de um jogo */
export default (game: GameData | null): InteractionReplyOptions => {

    // Container da mensagem de resposta
    const embed = new EmbedBuilder()
        .setColor(0x8379d9)
        .setTitle(game != null ? `Informações sobre ${game.name}` : 'Jogo não encontrado')
        .setDescription(game == null ? 'O jogo selecionado não foi encontrado :(' : null)
        .setFields(game != null ? [
            {
                name: 'Outros Nomes',
                value: game.alternativeNames?.length
                    ? game.alternativeNames?.join(', ')
                    : 'Nenhum outro nome'
            },
            {
                name: 'Nota',
                value: game.aggregatedRating?.toFixed(1) ?? 'Nenhuma nota encontrada'
            },
            {
                name: 'DLCs',
                value: game.dlcs?.length
                    ? game.dlcs?.map(d => d.name)?.join(', ')
                    : 'Nenhuma DLC encontrada'
            },
            {
                name: 'Gêneros',
                value: game.genres?.length
                    ? game.genres.join(', ')
                    : 'Nenhum gênero encontrado'
            },
            {
                name: 'Plataformas',
                value: game.platforms?.length
                    ? game.platforms.join(', ')
                    : 'Nenhuma plataforma encontrada'
            }
        ] : []);
    
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(IGDB_LIVES_BUTTON)
                .setLabel('Live Streams')
                .setStyle(ButtonStyle.Primary),
        );

    return { embeds: [embed], components: [row] };
}