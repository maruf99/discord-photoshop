import * as windowInfo from '@arcsine/win-info';
import { Client, Presence } from 'discord-rpc';
import findProcess from 'find-process';
import { basename, dirname, extname } from 'path';
import {
    APPLICATION_NAME,
    APPLICATION_NAME_FULL,
    APPLICATION_REGEX,
    SMALL_IMAGE_KEY,
    SUPPORTED_EXTENSIONS
} from './constants';


// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const config = require('../config.json');

export async function loadPresence(rpc: Client, date: Date): Promise<any> {
    const processes = await findProcess('name', APPLICATION_NAME);
    const app = processes.find(p => APPLICATION_REGEX.test(p.name));

    if (!app) return rpc.clearActivity();

    const photoshop = await windowInfo.getByPid(app.pid);

    const version = basename(dirname(photoshop.owner.path));
    const [title, details] = photoshop.title.split(' @ ');

    const idle = title.startsWith(APPLICATION_NAME_FULL);
    const extension = extname(title).slice(1).toLowerCase().replace('jpeg', 'jpg');
    const supported = SUPPORTED_EXTENSIONS.has(extension);

    const activity: Presence = {
        details: idle ? config.idleText : `Editing ${title}`,
        state: config.showWorkspaceDetails && !idle ? details : undefined,
        startTimestamp: date,
        largeImageKey: `${idle ? 'idle' : supported ? extension : 'default'}_icon`,
        largeImageText: idle ? config.idleText : `Editing a${supported ? ` ${extension.toUpperCase()}` : ''} file`,
        smallImageKey: SMALL_IMAGE_KEY,
        smallImageText: version ?? APPLICATION_NAME_FULL,
        instance: false
    };

    return rpc.setActivity(activity);
}