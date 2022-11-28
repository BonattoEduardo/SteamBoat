import type Command from "./interfaces/Command";
import Ping from "./commands/ping";
import Kelmon from "./commands/kelmon";
import Boat from "./commands/boat";
import Igdb from "./commands/igdb";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping,
    Kelmon,
    Boat,
    Igdb
];

export default commands;