import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NPageProcess } from "../npageprocess";
export declare class NParallelNode extends NNode {
    /**
     * 出口顺序流
     */
    outSequences: NSequenceNode[];
    /**
     * 入口顺序流
     */
    inSequences: NSequenceNode[];
    /**
     * 执行剩余数量
     */
    inCount: number;
    constructor(cfg: INode, process: NPageProcess);
    run(): Promise<void>;
    init(): void;
}
