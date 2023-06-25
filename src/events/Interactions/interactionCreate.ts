import {
  ChatInputCommandInteraction,
  Events,
  ModalSubmitInteraction,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const event: IEvent = {
  name: Events.InteractionCreate,
  once: false,
  execute: async function (
    bot: DiscordBot,
    interaction:
      | ChatInputCommandInteraction
      | UserContextMenuCommandInteraction
      | ModalSubmitInteraction,
  ): Promise<any> {
    if (interaction.isChatInputCommand())
      return await bot.events
        .get('chatInputInteractionCreate')
        .execute(bot, interaction);
    else if (interaction.isUserContextMenuCommand())
      return await bot.events
        .get('contextMenuInteractionCreate')
        .execute(bot, interaction);
    else if (interaction.isModalSubmit())
      return await bot.events
        .get('modalSubmitInteractionCreate')
        .execute(bot, interaction);
  },
};
