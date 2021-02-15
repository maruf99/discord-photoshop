import { Client } from 'discord-rpc';
import { DISCORD_APPLICATION_ID } from './constants';
import { handleError, log } from './util';
import { loadPresence } from './presence';

const rpc = new Client({ transport: 'ipc' });
log('Starting...');

rpc.once('ready', () => {
    log('Ready');

    const start = new Date();
    void loadPresence(rpc, start).catch(handleError);

    setInterval(() => {
        void loadPresence(rpc, start).catch(handleError);
    }, 5000);
});

rpc
    .login({ clientId: DISCORD_APPLICATION_ID })
    .catch(handleError);