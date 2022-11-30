
export default interface GameData {
    /** Id do jogo */
    id: number;
    /** Nome do jogo */
    name: string;
    /** Lista de nomes alternativos do jogo */
    alternativeNames?: string[];
    /** Lista de DLCs do jogo */
    dlcs?: GameData[];
    /** Avaliação do jogo */
    aggregatedRating?: number;
    /** Nomes dos idiomas suportados pelo jogo */
    languages?: string[];
    /** Lista dos genêros aos quais o jogo pertence */
    genres?: string[];
    /** Lista das plataformas em que o jogo está disponível */
    platforms?: string[];
}