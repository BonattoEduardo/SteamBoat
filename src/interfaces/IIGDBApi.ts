import type GameData from "./GameData";

/** Interface para a classe de interações com a API do IGDB */
export default interface IIGDBApi {
    /** Pesquisa um jogo na api do IGDB */
    searchGame(name: string): Promise<GameData[]>;
    /** Pesquisa nome dos idiomas suportados de um jogo na api do IGDB */
    searchLanguages(gameId: number): Promise<string[]>;
    /** Pesquisa DLCs de um jogo na api do IGDB */
    searchDLCs(gameId: number): Promise<GameData[]>;
    /** Pesquisa nomes alternativos de um jogo na api do IGDB */
    searchAltNames(gameId: number): Promise<string[]>;
}