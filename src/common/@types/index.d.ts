import {
  ApplicationCommandOptionType,
  Attachment,
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  GuildBasedChannel,
  GuildMember,
  Message,
  Role,
  SlashCommandBuilder,
  User,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { DiscordBot } from '../client/discord.bot';
import { env } from 'process';
import { CommandBuilder } from '../../classes/CommandBuilder';
import { SubCommandBuilder } from 'src/Classes/SubCommandBuilder';

declare global {
  /**
   * Discord Event Interface
   */
  interface IEvent {
    name: string;
    once: boolean;
    execute: (bot: DiscordBot, ...args: any[]) => Promise<any>;
  }

  /**
   * Discord CommandFile Interface
   */
  interface ICommandFile {
    name: string;
    description: string;
    options?: ICommandOption[];
    type?: ApplicationCommandType = ApplicationCommandType.ChatInput;
    developer: boolean;
    ephemeral: boolean;
    execute?: (
      bot: DiscordBot,
      interaction:
        | ChatInputCommandInteraction
        | UserContextMenuCommandInteraction,
      args?: IInteractionArg[],
    ) => Promise<any>;
  }

  /**
   * Discord Command Interface
   */
  interface ICommand {
    name: string;
    description: string;
    type?: ApplicationCommandType;
    options?: ICommandOption[];
  }

  /**
   * Discord CommandOptionChoice Interface
   */
  interface ICommandOptionChoice {
    name: string;
    value: string | number;
  }

  /**
   * Discord CommandOption Interface
   */
  interface ICommandOption {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required?: boolean;
    choices?: ICommandOptionChoice[];
    options?: ICommandOption[];
  }

  /**
   * Discord InteractionArg Interface
   */
  interface IInteractionArg {
    name: string;
    type: ApplicationCommandOptionType;
    value?: string | number | boolean;
    attachment?: Attachment;
    role?: Role;
    user?: User;
    member?: GuildMember;
    message?: Message<boolean>;
    autocomplete?: boolean;
    channel?: GuildBasedChannel;
    focused?: boolean;
  }
}

export {};
