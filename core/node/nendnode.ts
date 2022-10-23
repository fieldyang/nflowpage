import { NExpression } from "../expression";
import { NNode } from "./nnode";

export class NEndNode extends NNode{
    run(){
        this.process.end();
    }
}