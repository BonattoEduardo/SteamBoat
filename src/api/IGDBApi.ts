import type GameData from '../interfaces/GameData';
import type IIGDBApi from '../interfaces/IIGDBApi';
import api from './api';
import config from '../config';
import IGDBGame from '../interfaces/IGDBGame';

/** URL para solicitar tokens de autenticação da API da twitch */
export const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

/** URL para pesquisar jogos */
export const IGDB_GAMES_URL = 'https://api.igdb.com/v4/games';

/** URL para pesquisar language supports */
export const IGDB_LANGUAGE_SUPORTE_URL = 'https://api.igdb.com/v4/language_supports';

/** URL para pesquisar jogos */
export const IGDB_LANGUAGE_URL = 'https://api.igdb.com/v4/languages';


export default class IGDBApi implements IIGDBApi {

  /** Cabeçalho das requisições */
  private static headers: Record<string, string>;

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
      this.headers = {
        'Client-ID': config.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`
      };
    });
  }


  async searchGame(name: string): Promise<GameData | null> {

    const query = (
      `search "${name}"; ` +
      'fields name,alternative_names,dlcs,aggregated_rating,follows,language_supports;'
    );

    const res = await api.post<IGDBGame[]>(IGDB_GAMES_URL, query, { headers: IGDBApi.headers });

    const first = res.data[0];
    return {
      name: first?.name,
      id: first?.id,
      dlcs: first?.dlcs
    };
  }

  async searchLanguageSupports(id: number): Promise<number[] | null> {

    const query = (`fields language; where game = ${id};`);
    const res = await api.post<IGDBGame[]>(IGDB_LANGUAGE_SUPORTE_URL, query, { headers: IGDBApi.headers });
    const data = res.data;

    const language_supports: number[] = [];

    data.forEach(element => {
      if (element?.language)
        language_supports.push(element?.language);
    });

    return language_supports;
  }


  async searchLanguageNames(ids: number[]): Promise<string[] | null> {

    const query = (`fields name; where id = (${ids.toString()});`);
    const res = await api.post<IGDBGame[]>(IGDB_LANGUAGE_URL, query, { headers: IGDBApi.headers });
    const data = res.data;

    const languages: string[] = [];

    data.forEach(element => {
      if (element?.name)
        languages.push(element?.name);
    });

    return languages;

  }

  async searchAltNames(id: number): Promise<GameData | null> {

    const query = (`fields checksum,comment,game,name; where game = ${id};`);
    const res = await api.post<IGDBGame[]>(IGDB_LANGUAGE_URL, query, { headers: IGDBApi.headers });
    const data = res.data;

    const alternative_names: string[] = [];

    data.forEach(element => {
      if (element?.name)
        alternative_names.push(element?.name);
    });

    return {
      alternative_names
    };
  }

  async searchDLCs(game: GameData): Promise<GameData[] | null> {
    if (game?.dlcs) {
      const query = (`fields name; where id = (${game?.dlcs.toString()});`);
      const res = await api.post<IGDBGame[]>(IGDB_GAMES_URL, query, { headers: IGDBApi.headers });
      const data = res.data;

      const dlcs: GameData[] = [];

      data.forEach(element => {
        if (element?.id && element?.name)
          dlcs.push({
            id: element?.id,
            name: element?.name
          });
      });

      return dlcs;
    }
    return null;

  }

}

