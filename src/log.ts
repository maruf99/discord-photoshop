import * as colorette from 'colorette';

export enum LogTypes {
    Log = 'green',
    Error = 'red'
}

export function log(str: string, type: LogTypes = LogTypes.Log): void {
    const message = `[Photoshop Rich Presence] => ${str}`;
    console.log(colorette[type](message));
}