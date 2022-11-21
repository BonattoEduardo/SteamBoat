import type Channel from "./Channel";
import type GameData from "./GameData";

/** Interface para a classe de interações com a API da Twitch.tv */
export default interface ITwitchApi {
    /** Pesquisa livestreams do jogo passado como parâmetro */
    searchStreamsForGame(game: GameData): Promise<Channel[]>;
}