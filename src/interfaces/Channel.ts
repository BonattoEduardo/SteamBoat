
/** Tipo de um objeto de canal da twitch */
export default interface Channel {
    display_name: string;
    game_id: number;
    game_name: string;
    id: string;
    is_live: true;
    thumbnail_url: string;
    title: string;
    started_at: string;
}