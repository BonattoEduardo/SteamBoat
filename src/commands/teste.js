import { Client, GatewayIntentBits,  } from 'discord.js';
import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'teste') {
    await interaction.reply('CARLS!');
    await interaction.editReply('EITA PORRA');

    const channelClone = await interaction.channel.clone();
    channelClone.clone();
  }
});

client.login(process.env.TOKEN);