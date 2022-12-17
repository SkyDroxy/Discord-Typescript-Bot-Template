import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from 'discord.js';
import { OptionBuilder } from '../../builders/OptionBuilder';
import { DiscordBot } from '../../client/discord.bot';

export const command: ICommandFile = {
  name: 'test command',
  description: 'Test Command',
  options: [
    new OptionBuilder()
      .setName('arg1')
      .setDescription('Arg1')
      .setRequired(true)
      .setType(ApplicationCommandOptionType.String)
      .addChoice({
        name: 'choice 1',
        value: '1',
      })
      .addChoice({
        name: 'choice 2',
        value: '2',
      })
      .build(),
    new OptionBuilder()
      .setName('arg2')
      .setDescription('Arg 2')
      .setRequired(false)
      .setType(ApplicationCommandOptionType.Attachment)
      .build(),
  ],
  developer: true,
  ephemeral: true,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.reply({ content: 'Test!', ephemeral: command.ephemeral });
  },
};
