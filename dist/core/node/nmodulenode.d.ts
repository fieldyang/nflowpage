import { NNode } from "./nnode";
import { INode } from "../types";
import { NPageProcess } from "../npageprocess";
export declare class NModuleNode extends NNode {
    /**
     * 模块路径
     */
    path: string;
    /**
     * 模块对象
     */
    module: any;
    constructor(cfg: INode, process: NPageProcess);
    run(): Promise<void>;
    /**
     * 获取模块
     */
    getModule(): Promise<void>;
}
