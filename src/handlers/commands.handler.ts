import { DiscordBot } from '../client/discord.bot';
import Table from 'cli-table3';
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Routes,
} from 'discord.js';
import { loadFiles } from '../utils/files.loader';
import { CommandBuilder } from '../builders/CommandBuilder';

export async function handleCommands(bot: DiscordBot) {
  bot.commands.clear();

  const table = new Table({
    head: ['Status', 'Command', 'Type'],
    colWidths: [10, 30, 10],
  });
  var files = await loadFiles('commands');

  var commandsArr = [];
  var commandsCollection: Map<string, CommandBuilder> = new Map<
    string,
    CommandBuilder
  >();

  async function processFile(file: string) {
    const commandModule = await import(file);
    const commandFile: ICommandFile = commandModule.command;

    if (!commandFile || commandFile.name === '') {
      return;
    }

    const [mainCommand, subCommandGroup, subCommand] = commandFile.name
      .split(' ')
      .map((element) => element.trim());
    const command =
      commandsCollection.has(mainCommand) &&
      commandsCollection.get(mainCommand).getType() !==
        ApplicationCommandType.User
        ? commandsCollection.get(mainCommand)
        : new CommandBuilder();

    table.push([
      '✅',
      commandFile.name,
      commandFile.type ? commandFile.type : 1,
    ]);

    if (commandFile.type === ApplicationCommandType.User) {
      command.setName(commandFile.name).setType(ApplicationCommandType.User);
      commandsCollection.set(mainCommand, command);
      bot.commands.set(commandFile.name, commandFile);
      return;
    }

    command.setName(mainCommand);

    command.setDescription(mainCommand);

    if (subCommandGroup && subCommand) {
      if (!command.hasSubCommandGroup(subCommandGroup)) {
        command.addOption({
          name: subCommandGroup,
          description: subCommandGroup,
          type: ApplicationCommandOptionType.SubcommandGroup,
          options: [
            {
              name: subCommand,
              description: commandFile.description,
              options: commandFile.options,
              type: ApplicationCommandOptionType.Subcommand,
            },
          ],
        });
      } else {
        command.getSubCommandGroup(subCommandGroup).options.push({
          name: subCommand,
          description: commandFile.description,
          options: commandFile.options,
          type: ApplicationCommandOptionType.Subcommand,
        });
      }
    } else if (subCommandGroup) {
      command.addOption({
        name: subCommandGroup,
        description: commandFile.description,
        type: ApplicationCommandOptionType.Subcommand,
        options: commandFile.options,
      });
    } else if (mainCommand) {
      command.setOptions(commandFile.options);
      command.setDescription(commandFile.description);
    }

    commandsCollection.set(mainCommand, command);
    bot.commands.set(commandFile.name, commandFile);
  }

  await Promise.all(files.map(processFile));

  for (const command of commandsCollection) {
    commandsArr.push(command[1].toJSON());
  }

  try {
    bot.logger.info('Started refreshing application (/) commands.');
    await bot.restRequest.put(
      Routes.applicationCommands(bot.getIdentifier()!),
      {
        body: commandsArr,
      },
    );
    bot.logger.log(table.toString());
    bot.logger.success('Successfully reloaded application (/) commands.');
  } catch (error) {
    bot.logger.error(error);
  }
  return;
}
