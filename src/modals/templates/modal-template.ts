import {
  ActionRowBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const modal: IModal = {
  customId: 'modalTemplate',
  title: 'Modal Template',
  developer: false,
  ephemeral: false,
  components: [
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('name')
        .setLabel("Name")
        .setRequired(true)
        .setPlaceholder('Modal')
        .setMinLength(1)
        .setMaxLength(25)
        .setStyle(TextInputStyle.Short),
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('description')
        .setLabel("Description")
        .setRequired(false)
        .setPlaceholder('Description')
        .setMinLength(1)
        .setMaxLength(255)
        .setStyle(TextInputStyle.Paragraph),
    ),
  ],
  execute: async function (
    bot: DiscordBot,
    interaction: ModalSubmitInteraction,
  ): Promise<void> {
    await interaction.reply({ content: `Name: ${interaction.fields.getTextInputValue("name")}\nDescription: ${interaction.fields.getTextInputValue("description")}`});
    return;
  },
};
