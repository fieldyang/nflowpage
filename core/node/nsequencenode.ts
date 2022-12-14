import { NExpression } from "../expression";
import { NPageProcess } from "../npageprocess";
import { NNode } from "./nnode";
import { NParallelNode } from "./nparallelnode";

export class NSequenceNode extends NNode{
    /**
     * 表达式处理器
     */
    expr:NExpression;

    /**
     * 源节点
     */
    src:string;

    /**
     * 目标节点
     */
    dst:string;

    constructor(cfg,process:NPageProcess){
        super(cfg,process);
        this.src = cfg.src;
        this.dst = cfg.dst;
        if(cfg.cond){
            this.expr = new NExpression(cfg.cond);
        }
    }
    
    run(){
        const node = this.process.getNode(this.dst);
        if(!node){
            throw '目标节点不存在';
        }
        //并行网关，不执行条件
        if(node instanceof NParallelNode){
            node.run();
        }else if(!this.expr || this.expr.val(this.process.getParam())){
            node.run();
        }else{
            return false;
        }
        return true;
    }
}