import type GameData from "../interfaces/GameData";
import type Channel from "../interfaces/Channel";
import { EmbedBuilder } from "@discordjs/builders";
import { InteractionReplyOptions } from "discord.js";

/** Retorna o componente de detalhes de um jogo */
export default (game: GameData, channels: Channel[]): InteractionReplyOptions => {

    // Container da mensagem de resposta
    const embed = new EmbedBuilder()
        .setColor(0x5b5690)
        .setTitle(`Streams ao vivo de ${game.name}`)
        .setDescription(channels.length == 0 ? 'Nenhuma live foi encontrada :(' : null)
        .setFields(channels.map(channel => ({
            name: channel.display_name,
            value: `https://www.twitch.tv/${channel.display_name}`
        })));

    return { embeds: [embed] };
}