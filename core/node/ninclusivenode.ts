import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NPageProcess } from "../npageprocess";

/**
 * 并行网关
 */
export class NInclusiveNode extends NNode{
    outSequences:NSequenceNode[];
    inSequences:NSequenceNode[];    
    /**
     * 出口顺序流
     */
    sequences:NSequenceNode[];

    /**
     * 执行剩余数量
     */
    inCount:number;

    constructor(cfg:INode,process:NPageProcess){
        super(cfg,process);
    }
    
    async run() {
        //执行一次，则计数器-1，到0时，表示网关可以进行下一步
        if(--this.inCount === 0){
            for(let node of this.outSequences){
                node.run();
            }
        }
    }

    init(){
        this.outSequences = this.process.getSequenceNodes(this.name);
        this.inSequences = this.process.getSequenceNodes(this.name,true);
        if(!this.outSequences || this.outSequences.length === 0 || !this.inSequences || this.inSequences.length === 0){
            throw `节点'${this.name}'配置错误!`;
        }
        this.inCount = this.inSequences.length;
    }
}