import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from 'discord.js';
import { OptionBuilder } from '../../builders/OptionBuilder';
import { DiscordBot } from '../../client/discord.bot';

export const command: ICommandFile = {
  name: 'test modal',
  description: 'Test Modal',
  options: [],
  developer: true,
  ephemeral: true,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.showModal(bot.modals.get("modalTemplate").builder);
    return;
  },
};
