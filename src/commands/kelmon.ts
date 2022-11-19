import Command from "../types/Command";


const kelmon: Command = {
    name: "kelmon",
    description: "ele mesmo",
    run: async (_, interaction) => {
        await interaction.reply({
            files: ["https://i.imgur.com/piM9rG8.png"]
        });
    }
};

export default kelmon;