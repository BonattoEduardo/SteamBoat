import type Command from "./types/Command";
import Ping from "./commands/ping";
import Kelmon from "./commands/kelmon";
import SearchGame from "./commands/searchGame";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping,
    Kelmon,
    SearchGame
];

export default commands;