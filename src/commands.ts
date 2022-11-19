import type Command from "./types/Command";
import Ping from "./commands/Ping";

/** Lista de comandos do Bot */
const commands: Command[] = [
    Ping
];

export default commands;