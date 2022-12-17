import { UserContextMenuCommandInteraction } from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const event = {
  name: 'contextMenuInteractionCreate',
  once: false,
  execute: async (
    bot: DiscordBot,
    interaction: UserContextMenuCommandInteraction,
  ) => {
    bot.logger.info(`${interaction.commandName} command provided`);

    const command = bot.commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({
        content: 'This command does not exist or is outdated.',
        ephemeral: true,
      });
    } else if (command.developer && !bot.isDeveloper(interaction.user.id)) {
      return interaction.reply({
        content: 'You do not have access to this command.',
        ephemeral: true,
      });
    } else {
      return command.execute(bot, interaction);
    }
  },
};
