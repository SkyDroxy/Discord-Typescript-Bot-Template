import {
  ChatInputCommandInteraction,
  CommandInteractionOption,
} from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const event = {
  name: 'chatInputInteractionCreate',
  once: false,
  execute: async (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
  ) => {
    bot.logger.info(`${interaction.commandName} command provided`);

    const commandName = interaction.commandName;
    const subCommandGroupName = await interaction.options.getSubcommandGroup(
      false,
    );
    const subCommand = await interaction.options.getSubcommand(false);

    let commandFullName = commandName;
    if (subCommandGroupName && subCommand) {
      commandFullName += ` ${subCommandGroupName} ${subCommand}`;
    } else if (subCommand) {
      commandFullName += ` ${subCommand}`;
    }

    const command = bot.commands.get(commandFullName);

    const args = command.options
      ? command.options.map(
          (option) => interaction.options.get(option.name) as IInteractionArg,
        )
      : [];

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
      return command.execute(bot, interaction, args);
    }
  },
};
