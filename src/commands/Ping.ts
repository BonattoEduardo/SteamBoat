import type Command from "src/types/Command";

const Ping: Command = {
  name: "ping",
  description: "Responde 'Pong!' quando recebe um comando '/ping'",
  run: async (_, interaction) => {
    await interaction.reply('Pong!');
  }
};

export default Ping;