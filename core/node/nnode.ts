import { NPageProcess } from "../npageprocess";
import { INode } from "../types";

/**
 * 基础节点
 */
export class NNode{
    /**
     * 所属流程
     */
    process:NPageProcess;

    /**
     * 节点名
     */
    name:string;

    /**
     * 类型
     */
    type:string;

    constructor(cfg:INode,process:NPageProcess){
        this.name = cfg.name;
        this.process = process;
    }

    /**
     * 执行函数
     */
    run(){};
}