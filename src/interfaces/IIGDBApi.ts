import type GameData from "./GameData";

/** Interface para a classe de interações com a API do IGDB */
export default interface IIGDBApi {
    /** Pesquisa um jogo na api do IGDB */
    searchGame(name: string): Promise<GameData | null>;
}