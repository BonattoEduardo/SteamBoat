import type Command from "./interfaces/Command";
import Ping from "./commands/ping";
import Kelmon from "./commands/kelmon";
import Boat from "./commands/boat";
import SearchGame from "./commands/searchGame";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping,
    Kelmon,
    Boat,
    SearchGame
];

export default commands;