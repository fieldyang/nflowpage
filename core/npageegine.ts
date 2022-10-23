import { NPageProcess } from "./npageprocess";
/**
 * 流程引擎
 */
export class NPageEngine{
    static processId = 1;
    static processMap = new Map();

    static createProcess(container,cfg){
        const pid = this.processId++;
        return new NPageProcess(pid,cfg,container);
        // return process;
    }

    static getProcess(pid){
        // return this.flowMap.get(pid);
    }
}