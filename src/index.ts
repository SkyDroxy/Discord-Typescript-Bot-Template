import { GatewayIntentBits } from 'discord.js';
import { DiscordBot } from './client/discord.bot';

const bot = new DiscordBot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

bot.start();
