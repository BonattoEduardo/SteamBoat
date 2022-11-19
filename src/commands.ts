import type Command from "./types/Command";
import Ping from "./commands/ping";
import kelmon from "./commands/kelmon";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping,
    kelmon
];

export default commands;