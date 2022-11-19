import type GameData from "../interfaces/GameData";
import type ITwitchApi from "../interfaces/ITwitchApi";
import Stream from "../interfaces/Stream";

export default class TwitchApi implements ITwitchApi {

    searchStreamsForGame(game: GameData): Stream[] {
        throw new Error("Method not implemented.");
    }

}