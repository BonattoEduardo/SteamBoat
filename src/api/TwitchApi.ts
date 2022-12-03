import type GameData from "../interfaces/GameData";
import type Channel from "../interfaces/Channel";
import BaseTwitchApi from "./BaseTwitchApi";

/** URL para pesquisar os canais na API da twitch */
export const TWITCH_SEARCH_URL = 'https://api.twitch.tv/helix/search/channels';

export default abstract class TwitchApi {

    /** Pesquisa livestreams do jogo passado como parâmetro */
    public static async searchStreamsForGame(game: GameData): Promise<Channel[]> {
        const res = await BaseTwitchApi.request<{ data: Channel[]; }>({
            url: TWITCH_SEARCH_URL,
            method: 'GET',
            params: {
                query: game.name,
                first: 5,
                live_only: true
            }
        });

        return res.data.data;
    }

}