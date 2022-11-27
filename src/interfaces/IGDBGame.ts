
export default interface IGDBGame {
    id?: number;
    name?: string;
    alternative_names?: string[];
    dlcs?: number[];
    aggregated_rating?: number;
    follows?: number;
    language_id?: number;
    languages?: string[];
    language?: number;
}