import type Command from "../types/Command";
import { setTimeout } from "node:timers/promises";

const Ping: Command = {
  name: "ping",
  description: "Responde 'Pong!' quando recebe um comando '/ping'",
  run: async (_, interaction) => {
    // Adiando a resposta que será enviada (para o discord não achar que a resposta falhou)
    await interaction.deferReply();
    
    await setTimeout(4000);

    await interaction.editReply('Pong!');
  }
};

export default Ping;