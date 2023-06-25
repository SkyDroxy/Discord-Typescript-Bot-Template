import { ModalBuilder } from 'discord.js';
import { DiscordBot } from '../client/discord.bot';
import { loadFiles } from '../utils';
import Table from 'cli-table3';

export async function handleModals(bot: DiscordBot) {
  bot.modals.clear();

  const table = new Table({
    head: ['Status', 'Modal'],
    colWidths: [10, 30],
  });
  var modals = await loadFiles('modals');

  const promiseMap = modals.map(async (value: string) => {
    const modalModule = await import(value);
    const modal: IModal = modalModule.modal;
    bot.modals.set(modal.customId, {
      builder: new ModalBuilder()
        .setCustomId(modal.customId)
        .setTitle(modal.title)
        .setComponents(modal.components),
      file: modal,
    });
    table.push(['🟩', modal.customId]);
  });

  await Promise.all(promiseMap);
  bot.logger.log(table.toString());
  return;
}
