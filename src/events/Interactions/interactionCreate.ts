import {
  ChatInputCommandInteraction,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const event: IEvent = {
  name: 'interactionCreate',
  once: false,
  execute: async function (
    bot: DiscordBot,
    interaction:
      | ChatInputCommandInteraction
      | UserContextMenuCommandInteraction,
  ): Promise<any> {
    if (interaction.isChatInputCommand())
      return await bot.events
        .get('chatInputInteractionCreate')
        .execute(bot, interaction);
    else if (interaction.isUserContextMenuCommand())
      return await bot.events
        .get('contextMenuInteractionCreate')
        .execute(bot, interaction);
  },
};
