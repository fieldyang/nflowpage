import { NExpression } from "../expression";
import { NNode } from "./nnode";

export class NStartNode extends NNode{
    run(){
        const node = this.process.getSequenceNode(this.name);
        if(node){
            node.run();
        }
    }
}