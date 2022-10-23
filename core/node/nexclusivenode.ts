import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NPageProcess } from "../npageprocess";


export class NExclusiveNode extends NNode{
    /**
     * 出口顺序流
     */
    outSequences:NSequenceNode[];
    
    constructor(cfg:INode,process:NPageProcess){
        super(cfg,process);
    }
    
    async run() {
        //第一个满足则结束
        for(let node of this.outSequences){
            if(node.run()){
                break;
            }
        }
    }

    init(){
        this.outSequences = this.process.getSequenceNodes(this.name);
        if(!this.outSequences || this.outSequences.length === 0){
            throw `节点'${this.name}'配置错误!`;
        }
    }
}