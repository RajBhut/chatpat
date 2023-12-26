import chalk from 'chalk';
import moment from 'moment';

// Define log types for different types
export enum LogType {
    OK = '+',
    SUCCESS = '^',
    WARN = '=',
    ERROR = '-',
    UNKNOWN = '|'
}

// Define prefixes as a tuple
export const Prefixes = [] as const;
type PrefixLiteral = typeof Prefixes[number];

// Map for event listeners
type ListenerMap = {
    commit: { log: string, info: LogInfo };
};

type LogInfo = {
    type: LogType,
    prefixes: string[],
    message: string | any[],
    listeners: ({
        event: keyof ListenerMap,
        callback: (data: ListenerMap[keyof ListenerMap]) => void
    })[]
};

export function logger() {
    // State object to hold logging information and listeners
    let info: LogInfo = {
        type: LogType.UNKNOWN,
        prefixes: [],
        message: '',
        listeners: []
    };

    // Return object for method chaining
    function constructReturn() {
        return {
            type: _type,
            message: _message,
            prefix: _prefix,
            commit,
            on: _addListener,
            LogType,
            info
        };
    }

    // Set the log type
    function _type(t: LogType) {
        info.type = t;
        return constructReturn();
    }

    // Set the log message
    function _message(...m: any[]) {
        info.message = m;
        return constructReturn();
    }

    // Add prefix to the log
    function _prefix(p: PrefixLiteral | string) {
        info.prefixes.push(p);
        return constructReturn();
    }

    // Construct colored prefix for the log
    function constructColoredPrefix() {
        const color = {
            [LogType.OK]: chalk.whiteBright,
            [LogType.SUCCESS]: chalk.greenBright,
            [LogType.ERROR]: chalk.redBright,
            [LogType.WARN]: chalk.yellowBright,
            [LogType.UNKNOWN]: chalk.whiteBright,
        }[info.type];

        const type = color(`[${info.type}]`);
        const timestamp = moment().toISOString();

        return chalk.gray(timestamp) + ` ${type} ` + info.prefixes.map(prefixName => {
            return color(`${prefixName}`);
        }).join(' ');
    }

    // Construct non-colored prefix for the log
    function constructNonColorPrefix() {
        const type = `[${info.type}]`;
        const timestamp = moment().toISOString();

        return timestamp + ` ${type} ` + info.prefixes.join(' ');
    }

    // Add listener for specific event
    function _addListener<T extends keyof ListenerMap>(
        event: T,
        callback: (data: ListenerMap[T]) => void
    ) {
        info.listeners.push({ event, callback });
        return constructReturn();
    }

    // Trigger event and notify listeners
    function triggerEvent<T extends keyof ListenerMap>(event: T, eventData: ListenerMap[T]) {
        const listeners = info.listeners.filter(listener => listener.event === event);
        listeners.forEach(listener => {
            if (listener.callback) {
                listener.callback(eventData);
            }
        });
    }

    // Commit the log message
    function commit() {
        console.log(constructColoredPrefix(), ...info.message);

        // Notify listeners about the commit
        triggerEvent("commit", {
            log: constructNonColorPrefix() + (Array.isArray(info.message) ? ` ${info.message.join(' ')}` : ` ${info.message}`),
            info
        });

        return constructReturn();
    }

    // Return initial construct object
    return constructReturn();
}
