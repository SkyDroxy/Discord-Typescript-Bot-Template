import { DiscordBot } from '../client/discord.bot';
import { loadFiles } from '../utils/files.loader';
import Table from 'cli-table3';

export async function handleEvents(bot: DiscordBot) {
  bot.events.clear();

  const table = new Table({
    head: ['Status', 'Event'],
    colWidths: [10, 30],
  });
  var events = await loadFiles('events');

  const promiseMap = events.map(async (value: string) => {
    const eventModule = await import(value);
    const event: IEvent = eventModule.event;
    bot.events.set(event.name, event);
    table.push(['🟩', event.name]);
    if (event.once === true) {
      bot.once(event.name, (...args: any) => event.execute(bot, ...args));
    } else {
      bot.on(event.name, (...args: any) => event.execute(bot, ...args));
    }
  });

  await Promise.all(promiseMap);
  bot.logger.log(table.toString());
  return;
}
