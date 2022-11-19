import type GameData from "./GameData";
import type Stream from "./Stream";

/** Interface para a classe de interações com a API da Twitch.tv */
export default interface ITwitchApi {
    searchStreamsForGame(game: GameData): Promise<Stream[]>;
}