import type { InteractionReplyOptions } from "discord.js";
import type GameData from "../interfaces/GameData";
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "@discordjs/builders";

/** Constante do ID do componente de seleção de jogos */
export const IGDB_SELECT = 'igdb_select';

/** Retorna o componente de lista de jogos encontrados */
export default (jogos: GameData[]): InteractionReplyOptions => {
    // Menu de seleção de jogos
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(IGDB_SELECT)
        .setPlaceholder('Selecione um jogo para ver mais detalhes')
        .setOptions(jogos.map(j => ({ label: j.name, value: j.id.toString() })));

    // Componente pai do menu de seleção
    const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    // Container da mensagem de resposta
    const embed = new EmbedBuilder()
        .setColor(0x8379d9)
        .setTitle('Jogos Encontrados (primeiros 5 resultados)')
        .setDescription(jogos.length == 0 ? 'Nenhum jogo encontrado :(' : null)
        .setFields(jogos.map((j, i) => ({
            name: j.name,
            value: j.alternativeNames?.length
                ? `Outros nomes: ${j.alternativeNames?.join(', ')}`
                : 'Nenhum outro nome'
        })));
    
    return { components: [actionRow], embeds: [embed] };
}