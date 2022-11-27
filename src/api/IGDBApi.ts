import type GameData from '../interfaces/GameData';
import type IIGDBApi from '../interfaces/IIGDBApi';
import type { AlternativeName, Game, Language, LanguageSupport } from '../interfaces/IGDBTypes';
import { TWITCH_TOKEN_URL } from './TwitchApi';
import api from './api';
import config from '../config';

/** Enumeração com os enpoints da api do IGDB */
export enum IGDBEndpoints {
  GAMES = 'https://api.igdb.com/v4/games',
  LANGUAGE_SUPPORTS = 'https://api.igdb.com/v4/language_supports',
  LANGUAGES = 'https://api.igdb.com/v4/languages',
  ALTERNATIVE_NAMES = 'https://api.igdb.com/v4/alternative_names'
}

export default class IGDBApi implements IIGDBApi {
  /** Cabeçalho das requisições */
  private static headers: Record<string, string>;

  /** Inicializa a API, pegando o token de autenticação */
  public static async init(): Promise<void> {
    const res = await api<{ access_token?: string }>({
      url: TWITCH_TOKEN_URL,
      method: 'POST',
      data: {
        client_id: config.TWITCH_CLIENT_ID,
        client_secret: config.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      }
    });

    const token = res.data.access_token;
    if (!token) {
      throw new Error('Token de autenticação da Twitch não encontrado');
    }
    this.headers = {
      'Client-ID': config.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`
    };
  }

  /** Pesquisa um jogo na api do IGDB */
  public async searchGame(name: string): Promise<GameData[]> {
    const { data } = await api<Game[]>({
      url: IGDBEndpoints.GAMES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `search "${name}"; fields name,aggregated_rating,follows; limit 5; where category = 0;`
    });

    const gameDatas: GameData[] = [];

    for (const game of data) {
      const altNames = await this.searchAltNames(game.id);
      const languages = await this.searchLanguages(game.id);
      const dlcs = await this.searchDLCs(game.id);

      gameDatas.push({
        id: game.id,
        name: game.name,
        follows: game.follows,
        aggregatedRating: game.aggregated_rating,
        alternativeNames: altNames,
        languages: languages,
        dlcs: dlcs
      });
    }

    return gameDatas;
  }

  /** Pesquisa nome dos idiomas suportados de um jogo na api do IGDB */
  public async searchLanguages(gameId: number): Promise<string[]> {
    const { data: langSupports } = await api<LanguageSupport[]>({
      url: IGDBEndpoints.LANGUAGE_SUPPORTS,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields game,language; where game = ${gameId};`
    });

    const ids = langSupports.map(l => l.language).join(',');
    if (ids.length == 0) {
      return [];
    } 

    const { data: langs } = await api<Language[]>({
      url: IGDBEndpoints.LANGUAGES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name,native_name,locale; where id = (${ids});`
    });

    return langs.map(l => l.locale);
  }

  /** Pesquisa nomes alternativos de um jogo na api do IGDB */
  public async searchAltNames(gameId: number): Promise<string[]> {
    const { data } = await api<AlternativeName[]>({
      url: IGDBEndpoints.ALTERNATIVE_NAMES,
      method: 'POST',
      headers: IGDBApi.headers,
      data: `fields game,name; where game = ${gameId};`
    });

    return data.map(a => a.name);
  }

  /** Pesquisa DLCs de um jogo na api do IGDB */
  public async searchDLCs(gameId: number): Promise<GameData[]> {
    const { data } = await api<Game[]>({
      url: IGDBEndpoints.GAMES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name,aggregated_rating,follows; where parent_game = ${gameId};`,
    });

    return data.map(d => ({
      id: d.id,
      name: d.name,
      aggregatedRating: d.aggregated_rating,
      follows: d.follows
    }));
  }

}

