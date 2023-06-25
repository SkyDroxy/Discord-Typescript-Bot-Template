import { ModalSubmitInteraction } from 'discord.js';
import { DiscordBot } from '../../client/discord.bot';

export const event = {
  name: 'modalSubmitInteractionCreate',
  once: false,
  execute: async (bot: DiscordBot, interaction: ModalSubmitInteraction) => {
    bot.logger.info(`Modal ${interaction.customId} submitted`);
    var modal = bot.modals.get(interaction.customId);
    if (!modal) return;
    else {
      await modal.file.execute(bot, interaction);
    }
  },
};
