import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from 'discord.js';

export class CommandBuilder {
  private command: ICommand;

  constructor() {
    this.command = {
      name: '',
      description: '',
      type: ApplicationCommandType.ChatInput,
      options: [],
    };
  }

  public getName(): string {
    return this.command.name;
  }

  public setName(name: string): CommandBuilder {
    this.command.name = name;
    return this;
  }

  public setDescription(description: string): CommandBuilder {
    this.command.description = description;
    return this;
  }

  public getType(): ApplicationCommandType {
    return this.command.type;
  }

  public setType(type: ApplicationCommandType): CommandBuilder {
    this.command.type = type;
    return this;
  }

  public addOption(option: ICommandOption): CommandBuilder {
    this.command.options.push(option);
    return this;
  }

  public setOptions(options: ICommandOption[]): CommandBuilder {
    this.command.options = options;
    return this;
  }

  public hasOption(name: string): boolean {
    return this.command.options.some((option) => option.name === name);
  }

  public hasSubCommandGroup(name: string): boolean {
    return this.command.options.some(
      (option) =>
        option.name === name &&
        option.type === ApplicationCommandOptionType.SubcommandGroup,
    );
  }

  public getSubCommandGroup(name: string): ICommandOption {
    return this.command.options.find(
      (option) =>
        option.name === name &&
        option.type === ApplicationCommandOptionType.SubcommandGroup,
    );
  }

  public getSubCommand(name: string): ICommandOption {
    return this.command.options.find(
      (option) =>
        option.name === name &&
        option.type === ApplicationCommandOptionType.Subcommand,
    );
  }

  public hasSubCommand(name: string): boolean {
    return this.command.options.some(
      (option) =>
        option.name === name &&
        option.type === ApplicationCommandOptionType.Subcommand,
    );
  }

  public getOption(name: string): ICommandOption {
    return this.command.options.find((option) => option.name === name);
  }

  public toJSON(): object {
    const command = { ...this.command };
    if (command.type === ApplicationCommandType.User) {
      delete command.options;
      delete command.description;
    }
    return JSON.parse(JSON.stringify(command));
  }

  public build(): ICommand {
    return this.command;
  }
}
