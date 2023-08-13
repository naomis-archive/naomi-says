import { SlashCommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const say: Command = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make Naomi say something!")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What you want Naomi to say.")
        .setRequired(true)
        .setMaxLength(200)
    )
    .addStringOption((option) =>
      option
        .setName("colour")
        .setDescription(
          "The CSS-compatible colour to use for the text. Colour name, hex code, or rgb value."
        )
    )
    .addStringOption((option) =>
      option
        .setName("background")
        .setDescription(
          "The CSS-compatible colour to use for the background. Colour name, hex code, or rgb value."
        )
    ),
  run: async (bot, interaction) => {
    try {
      await interaction.editReply({
        content: "Coming soon!",
      });
    } catch (err) {
      await errorHandler(bot, "say command", err);
      await interaction.editReply({
        content:
          "An error occurred while running this command. Please try again later.",
      });
    }
  },
};
