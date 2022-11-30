import type GameData from "./GameData";

/** Interface para a classe de interações com a API do IGDB */
export default interface IIGDBApi {
    /** Pesquisa um jogo na api do IGDB */
    searchGame(name: string): Promise<GameData[]>;
    /** Requisita um jogo a partir do ID na api do IGDB */
    getGame(id: number): Promise<GameData | null>;
    /** Requisita idiomas a partir dos IDs na api do IGDB */
    getLanguages(ids: number[]): Promise<string[]>;
    /** Requisita DLCs a partir dos IDs na api do IGDB */
    getDLCs(ids: number[]): Promise<GameData[]>;
    /** Requisita nomes alternativos a partir dos IDs na api do IGDB */
    getAltNames(ids: number[]): Promise<string[]>;
    /** Requisita gêneros a partir dos IDs na api do IGDB */
    getGenres(ids: number[]): Promise<string[]>;
    /** Requisita plataformas a partir dos IDs na api do IGDB */
    getPlatforms(ids: number[]): Promise<string[]>;
}