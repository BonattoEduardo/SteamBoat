import Command from "../types/Command";

const Ping: Command = {
    name: "ping",
    description: "Responde pong",
    run: async (_, interaction) => {
        // await interaction.channel?.send("teste do teste do teste do teste");
        await interaction.reply(`Vai se fuder ${interaction.user.username}`);
    }
};

export default Ping;