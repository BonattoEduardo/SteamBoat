import Command from "src/types/Command";

const Ping: Command = {
  name: "ping",
  description: "pinga pinga",
  run: async (_, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName == 'ping') {
      await interaction.reply('Pong!');
    }
  }
};

export default Ping;