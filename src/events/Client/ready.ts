import { DiscordBot } from '../../client/discord.bot';

export const event: IEvent = {
  name: 'ready',
  once: true,
  execute: async function (bot: DiscordBot): Promise<void> {
    bot.logger.success('Bot is ready!');
    return;
  },
};
