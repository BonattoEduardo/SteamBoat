import type GameData from '../interfaces/GameData';
import type IIGDBApi from '../interfaces/IIGDBApi';
import type { AlternativeName, Game, Genre, Language, LanguageSupport, Platform } from '../interfaces/IGDBTypes';
import { TWITCH_TOKEN_URL } from './TwitchApi';
import api from './api';
import config from '../config';

/** Enumeração com os enpoints da api do IGDB */
export enum IGDBEndpoints {
  GAMES = 'https://api.igdb.com/v4/games',
  LANGUAGE_SUPPORTS = 'https://api.igdb.com/v4/language_supports',
  LANGUAGES = 'https://api.igdb.com/v4/languages',
  ALTERNATIVE_NAMES = 'https://api.igdb.com/v4/alternative_names',
  GENRES = 'https://api.igdb.com/v4/genres',
  PLATFORMS = 'https://api.igdb.com/v4/platforms'
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
      data: `search "${name}"; fields name,alternative_names; limit 5; where category = 0;`
    });

    const gameDatas: GameData[] = [];

    for (const game of data) {
      const altNames = await this.getAltNames(game.alternative_names ?? []);

      gameDatas.push({
        id: game.id,
        name: game.name,
        alternativeNames: altNames
      });
    }

    return gameDatas;
  }

  /** Requisita um jogo a partir do ID na api do IGDB */
  public async getGame(id: number): Promise<GameData | null> {
    const { data } = await api<Game[]>({
      url: IGDBEndpoints.GAMES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name,aggregated_rating,alternative_names,dlcs,genres,platforms; ` +
            `limit 1; where id = ${id};`
    });

    const game = data[0];

    if (!game) {
      return null;
    }

    const altNames = await this.getAltNames(game.alternative_names ?? []);
    const dlcs = await this.getDLCs(game.dlcs ?? []);
    const genres = await this.getGenres(game.genres ?? []);
    const platforms = await this.getPlatforms(game.platforms ?? []);
    // const languages = await this.getLanguages(game.language_supports ?? []);

    return {
      id: game.id,
      name: game.name,
      aggregatedRating: game.aggregated_rating,
      alternativeNames: altNames,
      dlcs: dlcs,
      genres: genres,
      platforms: platforms
      // languages: languages
    };
  }

  /** Requisita idiomas a partir dos IDs na api do IGDB */
  public async getLanguages(ids: number[]): Promise<string[]> {
    if (ids.length == 0) {
      return [];
    } 

    const { data: langSupports } = await api<LanguageSupport[]>({
      url: IGDBEndpoints.LANGUAGE_SUPPORTS,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields game,language; where id = (${ids.join(',')});`
    });

    const idsIdiomas = langSupports.map(l => l.language);
    if (idsIdiomas.length == 0) {
      return [];
    } 

    const { data: langs } = await api<Language[]>({
      url: IGDBEndpoints.LANGUAGES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name,native_name,locale; where id = (${idsIdiomas.join(',')});`
    });

    return langs.map(l => l.locale);
  }

  /** Requisita nomes alternativos a partir dos IDs na api do IGDB */
  public async getAltNames(ids: number[]): Promise<string[]> {
    if (ids.length == 0) {
      return [];
    }

    const { data } = await api<AlternativeName[]>({
      url: IGDBEndpoints.ALTERNATIVE_NAMES,
      method: 'POST',
      headers: IGDBApi.headers,
      data: `fields game,name; where id = (${ids.join(',')});`
    });

    return data.map(a => a.name);
  }

  /** Requisita DLCs a partir dos IDs na api do IGDB */
  public async getDLCs(ids: number[]): Promise<GameData[]> {
    if (ids.length == 0) {
      return [];
    }

    const { data } = await api<Game[]>({
      url: IGDBEndpoints.GAMES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name,aggregated_rating; where id = (${ids.join(',')});`,
    });

    return data.map(d => ({
      id: d.id,
      name: d.name,
      aggregatedRating: d.aggregated_rating
    }));
  }

  /** Requisita gêneros a partir dos IDs na api do IGDB */
  public async getGenres(ids: number[]): Promise<string[]> {
    if (ids.length == 0) {
      return [];
    }

    const { data } = await api<Genre[]>({
      url: IGDBEndpoints.GENRES,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name; where id = (${ids.join(',')});`
    });

    return data.map(d => d.name);
  }

  /** Requisita plataformas a partir dos IDs na api do IGDB */
  public async getPlatforms(ids: number[]): Promise<string[]> {
    if (ids.length == 0) {
      return [];
    }

    const { data } = await api<Platform[]>({
      url: IGDBEndpoints.PLATFORMS,
      headers: IGDBApi.headers,
      method: 'POST',
      data: `fields name; where id = (${ids.join(',')});`
    });

    return data.map(d => d.name);
  }
}

