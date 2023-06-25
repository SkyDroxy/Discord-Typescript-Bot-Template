import { ChatInputCommandInteraction } from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const command: ICommandFile = {
  name: 'ping',
  description: 'Envoie Pong!',
  developer: false,
  ephemeral: true,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.reply({ content: 'Pong!', ephemeral: command.ephemeral });
    return;
  },
};
