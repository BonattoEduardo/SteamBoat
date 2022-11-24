import type Command from "./interfaces/Command";
import Ping from "./commands/ping";
import Kelmon from "./commands/kelmon";
import Boat from "./commands/boat";
import IGDBA from "./commands/igdba";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping,
    Kelmon,
    Boat,
    IGDBA,
];

export default commands;