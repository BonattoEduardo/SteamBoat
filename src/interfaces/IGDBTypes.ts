
/** Tipo dos registro de Game no IGDB */
export interface Game {
    id: number;
    name: string;
    aggregated_rating?: number;
    alternative_names?: number[];
    dlcs?: number[];
    genres?: number[];
    platforms?: number[];
    // language_supports?: number[];
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

/** Tipo dos registros de Genre no IGDB */
export interface Genre {
    id: number;
    name: string;
}

/** Tipo dos registros de Platform no IGDB */
export interface Platform {
    id: number;
    name: string;
}