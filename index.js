import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
{
    name: 'ping',
    description: 'Replies with Pong!',
},
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });
  
  client.login(process.env.TOKEN);