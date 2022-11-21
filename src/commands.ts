import type Command from "./interfaces/Command";
import Ping from "./commands/ping";
import Kelmon from "./commands/kelmon";
import Boat from "./commands/boat";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping,
    Kelmon,
    Boat
];

export default commands;