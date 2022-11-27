import type GameData from "./GameData";

/** Interface para a classe de interações com a API do IGDB */
export default interface IIGDBApi {
    /** Pesquisa um jogo na api do IGDB */
    searchGame(name: string): Promise<GameData | null>;

    /** Pesquisa idiomas suportados de um jogo na api do IGDB */
    searchLanguageSupports(id: number): Promise<number[] | null>;

    /** Pesquisa nome dos idiomas suportados de um jogo na api do IGDB */
    searchLanguageNames(ids: number[]): Promise<string[] | null>;

    /** Pesquisa DLCs de um jogo na api do IGDB */
    searchDLCs(game: GameData): Promise<GameData[] | null>;

    /** Pesquisa nomes alternativos de um jogo na api do IGDB */
    searchAltNames(id: number): Promise<GameData | null>;
}