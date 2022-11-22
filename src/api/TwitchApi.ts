import type GameData from "../interfaces/GameData";
import type ITwitchApi from "../interfaces/ITwitchApi";
import type Channel from "../interfaces/Channel";
import config from "../config";
import api from "./api";

/** URL para solicitar tokens de autenticação da API da twitch */
export const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
/** URL para pesquisar os canais na API da twitch */
export const TWITCH_SEARCH_URL = 'https://api.twitch.tv/helix/search/channels';

export default class TwitchApi implements ITwitchApi {
    /** Token de autenticação da Twitch */
    public static TOKEN: string | null;

    /** Inicializa a API, pegando o token de autenticação */
    public static async init(): Promise<void> {
        api.post<{ access_token?: string }>(TWITCH_TOKEN_URL, {
            client_id: config.TWITCH_CLIENT_ID,
            client_secret: config.TWITCH_CLIENT_SECRET,
            grant_type: 'client_credentials'
        }).then(res => {
            const token = res.data.access_token;
            if (!token) {
                throw new Error("Token de autenticação da Twitch não encontrado");
            }

            this.TOKEN = token;
        });
    }
    
    /** Pesquisa livestreams do jogo passado como parâmetro */
    public async searchStreamsForGame(game: GameData): Promise<Channel[]> {
        const res = await api.get<{ data: Channel[]; }>(TWITCH_SEARCH_URL, {
            params: {
                query: game.name,
                first: 5,
                live_only: true
            },
            headers: {
                'Client-ID': config.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${TwitchApi.TOKEN}`
            }
        });

        return res.data.data;
    }

}