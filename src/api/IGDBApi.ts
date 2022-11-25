import type GameData from '../interfaces/GameData';
import type IIGDBApi from '../interfaces/IIGDBApi';
import api from './api';
import config from '../config';
import IGDBGame from '../interfaces/IGDBGame';

/** URL para solicitar tokens de autenticação da API da twitch */
export const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

/** URL para pesquisar jogos */
export const IGDB_GAMES_URL = 'https://api.igdb.com/v4/games';


export default class IGDBApi implements IIGDBApi {
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
        throw new Error('Token de autenticação da Twitch não encontrado');
      }
      this.TOKEN = token;
    });
  }


  async searchGame(name: string): Promise<GameData | null> {

    const query = (
      `search "${name}"; ` +
      'fields name,alternative_names,dlcs,aggregated_rating,follows,language_supports;'
    );

    const res = await api.post<IGDBGame[]>(IGDB_GAMES_URL, query, {
      headers: {
        'Client-ID': config.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${IGDBApi.TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
      }
    });
    
    const first = res.data[0];

    return { name: first?.name };
  }


}

