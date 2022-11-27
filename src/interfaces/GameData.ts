
export default interface GameData {
    /** Id do jogo */
    id?: number;
    /** Nome do jogo */
    name?: string;
    /** Lista de nomes alternativos do jogo */
    alternative_names?: string[];
    /** Lista de DLCs do jogo */
    dlcs?: number[];
    /** Avaliação do jogo */
    aggregatedRating?: number;
    /** Número de seguidores do jogo */
    follows?: number;
    /** Nomes dos idiomas suportados pelo jogo */
    languages?: string[];
    /** Ids dos idiomas suportados pelo jogo */
    language_supports?: number[];
}