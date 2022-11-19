
export default interface GameData {
    /** Nome do jogo */
    name: string;
    /** Lista de nomes alternativos do jogo */
    alternativeNames: string[];
    /** Lista de DLCs do jogo */
    dlcs: GameData[];
    /** Avaliação do jogo */
    aggregatedRating: number;
    /** Número de seguidores do jogo */
    follows: number;
    /** Nomes dos idiomas suportados pelo jogo */
    languages: string[];
}