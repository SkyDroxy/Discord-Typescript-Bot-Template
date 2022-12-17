import glob from 'glob';
import { promisify } from 'util';

const globPromise = promisify(glob);

export async function loadFiles(directory: string): Promise<string[]> {
  const commands: string[] = await globPromise(
    `${process.cwd().replace(/\\/g, '/')}/src/${directory}/**/*{.ts,.js}`,
  );
  commands.forEach(async (file: string) => {
    delete require.cache[require.resolve(file)];
  });
  return commands;
}
