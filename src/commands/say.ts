import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import nodeHtmlToImage from "node-html-to-image";

import { Html } from "../config/Html";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { isValidHex } from "../utils/isValidHex";
import { prefixHex } from "../utils/prefixHex";

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
        .setDescription("The hex string to use for the text.")
        .setMinLength(6)
        .setMaxLength(7)
    )
    .addStringOption((option) =>
      option
        .setName("background")
        .setDescription("The hex string to use for the background.")
        .setMinLength(6)
        .setMaxLength(7)
    ),
  run: async (bot, interaction) => {
    try {
      const message = interaction.options.getString("message", true);
      const colour = interaction.options.getString("colour");
      const background = interaction.options.getString("background");

      const html = Html.replace(
        "{text}",
        isValidHex(colour) ? prefixHex(colour) : "pink"
      )
        .replace(
          "{background}",
          isValidHex(background) ? prefixHex(background) : "purple"
        )
        .replace("{message}", message)
        .replace("{size}", message.length > 100 ? "25" : "35");
      const image = await nodeHtmlToImage({
        html,
        selector: "body",
      });
      if (!(image instanceof Buffer)) {
        await interaction.editReply({
          content:
            "An error occurred while generating the image. Please try again later.",
        });
        return;
      }
      const attachment = new AttachmentBuilder(image, {
        name: "say.png",
      }).setDescription(`Naomi says: ${message}`);
      await interaction.editReply({
        files: [attachment],
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
