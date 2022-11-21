import type GameData from "../interfaces/GameData";
import type IIGDBApi from "../interfaces/IIGDBApi";

export default class IGDBApi implements IIGDBApi {

    searchGame(name: string): Promise<GameData> {
        throw new Error("Method not implemented.");
    }

}