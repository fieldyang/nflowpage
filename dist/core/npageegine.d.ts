import { NPageProcess } from "./npageprocess";
/**
 * 流程引擎
 */
export declare class NPageEngine {
    static processId: number;
    static processMap: Map<any, any>;
    static createProcess(container: any, cfg: any): NPageProcess;
    static getProcess(pid: any): void;
}
