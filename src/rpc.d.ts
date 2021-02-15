declare module 'discord-rpc' {
    import { EventEmitter } from 'events';

    export class Client extends EventEmitter {
        public constructor(options: { transport: 'ipc' | 'websocket' });

        public login(options?: LoginOptions): Promise<this>;
        public destroy(): Promise<void>;

        public setActivity(args: Presence, pid?: number): Promise<any>;
        public clearActivity(pid?: number): Promise<any>;

        public on(event: 'ready', listener: () => void): this;
        public once(event: 'ready', listener: () => void): this;
        public off(event: 'ready', listener: () => void): this;
    }

    export interface LoginOptions {
        clientId: string;
        clientSecret?: string;
        accessToken?: string;
        rpcToken?: string;
        tokenEndpoint?: string;
        scopes?: string[];
    }

    export interface Presence {
        state?: string;
        details?: string;
        startTimestamp?: Date;
        endTimestamp?: Date;
        largeImageKey?: string;
        largeImageText?: string;
        smallImageKey?: string;
        smallImageText?: string;
        instance?: boolean;
        partySize?: number;
        partyMax?: number;
        matchSecret?: string;
        spectateSecret?: string;
        joinSecret?: string;
        buttons?: { label: string; url: string }[];
    }
}