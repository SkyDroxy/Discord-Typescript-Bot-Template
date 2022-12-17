import { ApplicationCommandOptionType } from 'discord.js';

export class OptionBuilder {
  private option: ICommandOption;

  constructor() {
    this.option = {
      name: '',
      description: '',
      type: ApplicationCommandOptionType.String,
      required: false,
      options: [],
      choices: [],
    };
  }

  public setName(name: string): OptionBuilder {
    this.option.name = name;
    return this;
  }

  public setDescription(description: string): OptionBuilder {
    this.option.description = description;
    return this;
  }

  public setType(type: ApplicationCommandOptionType): OptionBuilder {
    this.option.type = type;
    return this;
  }

  public setRequired(required: boolean): OptionBuilder {
    this.option.required = required;
    return this;
  }

  public addOption(option: ICommandOption): OptionBuilder {
    this.option.options.push(option);
    return this;
  }

  public setOptions(options: ICommandOption[]): OptionBuilder {
    this.option.options = options;
    return this;
  }

  public addChoice(choice: ICommandOptionChoice): OptionBuilder {
    this.option.choices.push(choice);
    return this;
  }

  public build(): ICommandOption {
    if (this.option.type === ApplicationCommandOptionType.SubcommandGroup) {
      delete this.option.required;
      delete this.option.choices;
    }
    return this.option;
  }
}
