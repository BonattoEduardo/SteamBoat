
/** Tipo dos registro de Game no IGDB */
export interface Game {
    id: number;
    name: string;
    aggregated_rating?: number;
    follows?: number;
}

/** Tipo dos registro de Language Support no IGDB */
export interface LanguageSupport {
    id: number;
    game: number;
    language: number;
}

/** Tipo dos registro de Language no IGDB */
export interface Language {
    id: number;
    name: string;
    native_name: string;
    locale: string;
}

/** Tipo dos registro de Alternative Name no IGDB */
export interface AlternativeName {
    id: number;
    name: string;
}