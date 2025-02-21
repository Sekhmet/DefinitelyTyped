// Type definitions for throng 5.0
// Project: https://github.com/hunterloftis/throng
// Definitions by: Cyril Schumacher <https://github.com/cyrilschumacher>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare function throng(startOrOptions: throng.WorkerCallback | throng.Options): Promise<void>;
declare function throng(workers: throng.WorkerCount, start: throng.WorkerCallback): Promise<void>;
declare namespace throng {
    type WorkerCount = number | string;
    type WorkerCallback = (id: number, disconnect: () => void) => void;
    type MasterCallback = () => void;

    type Options = {
        signals?: string[] | undefined;
        grace?: number | undefined;
        lifetime?: number | undefined;
        master?: MasterCallback | undefined;
        count?: number | undefined;
        workers?: WorkerCount | undefined;
    } & ({ start: WorkerCallback } | { worker: WorkerCallback });
}

export = throng;
export as namespace throng;
