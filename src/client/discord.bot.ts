import consola, { Consola } from 'consola';
import {
  Client,
  ClientOptions,
  Collection,
  REST,
  ModalBuilder,
} from 'discord.js';
import { handleCommands } from '../handlers/commands.handler';
import { handleEvents } from '../handlers/events.handler';
import { handleModals } from '../handlers/modals.handler';
import * as dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export class DiscordBot extends Client {
  logger: Consola = consola;
  logged: boolean = false;
  restRequest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
  events: Collection<string, IEvent> = new Collection();
  commands: Collection<string, ICommandFile> = new Collection();
  modals: Collection<string, { builder: ModalBuilder; file: IModal }> =
    new Collection();

  public constructor(options: ClientOptions) {
    super(options);
  }

  /**
   * start
   * @returns void
   */
  public async start() {
    this.logger.info(`Bot starting..`);

    await this.login(process.env.BOT_TOKEN);
    this.logger.success(`Bot Started!`);
    this.logged = true;

    this.logger.info(`Loading events..`);
    await handleEvents(this);

    this.logger.info(`Loading commands..`);
    await handleCommands(this);

    this.logger.info(`Loading modals...`);
    await handleModals(this);

    this.logger.success('Everything is ready!');
  }

  /**
   * stop
   * @returns void
   */
  public stop() {
    this.logger.info('Destroying Economy Bot..');
    this.destroy();
    this.logged = false;
  }

  /**
   * getIdentifier
   * @returns number | undefined
   */
  public getIdentifier(): string | undefined {
    return this.user?.id;
  }

  /**
   * getAvatarURL
   * @returns string | null
   */
  public getAvatarURL(): string | null | undefined {
    return this.user?.displayAvatarURL();
  }

  /**
   * getDiscriminator
   * @returns string | undefined
   */
  public getDiscriminator(): string | undefined {
    return this.user?.discriminator;
  }

  /**
   * getUsername
   * @returns string | undefined
   */
  public getUsername(): string | undefined {
    return this.user?.username;
  }

  /**
   * getTag
   * @returns string | undefined
   */
  public getTag(): string | undefined {
    return this.user?.tag;
  }

  /**
   * isVerified
   * @returns boolean | undefined
   */
  public isVerified(): boolean | undefined {
    return this.user?.verified;
  }

  /**
   * isDeveloper
   * @returns boolean
   */
  public isDeveloper(userId: string): boolean {
    return userId === process.env.DEV_ID;
  }
}
