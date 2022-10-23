import { NNode } from "./nnode";
import { INode } from "../types";
import { NPageProcess } from "../npageprocess";
import { Renderer,ModuleFactory } from "nodom3";

export class NModuleNode extends NNode{
    /**
     * 模块路径
     */
    path:string;

    /**
     * 模块对象
     */
    module:any;

    constructor(cfg:INode,process:NPageProcess){
        super(cfg,process);
        this.path = cfg.path;
    }
    
    async run() {
        if(!this.module){
            await this.getModule();
        }
        if(!this.module){
            throw `module '${this.name}'不存在`;
        }
        this.module.setContainer(this.process.container);
        this.process.setCurrentNode(this);
        this.module.process = this.process;
        //加入渲染队列
        Renderer.add(this.module);
        
    }

    /**
     * 获取模块
     */
    async getModule(){
        const m = await import (this.path);
        //通过import的模块，查找模块类
        for(let k of Object.keys(m)){
            if(m[k].name){
                this.module = ModuleFactory.get(m[k]);
                return;
            }
        }
    }
}