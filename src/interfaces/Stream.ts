import GameData from "./GameData";

export default interface Stream {
    id: number;
    game: GameData;
    title: string;
    viewerCount: number;
}