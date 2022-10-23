import { NModuleNode } from "./node/nmodulenode";
import { NEndNode } from "./node/nendnode";
import { NNode } from "./node/nnode";
import { NSequenceNode } from "./node/nsequencenode";
import { NStartNode } from "./node/nstartnode";
import { ENodeType, INode } from "./types";
import { NExclusiveNode } from "./node/nexclusivenode";
import { NInclusiveNode } from "./node/ninclusivenode";
import { NParallelNode } from "./node/nparallelnode";
export class NPageProcess{
    /**
     * 流程id
     */
    private id:number;
    /**
     * 流程名
     */
    private name:string;
    /**
     * 流程标题
     */
    private title:string;

    /**
     * 流程节点集合
     */
    private nodes: NNode[];

    /**
     * 当前节点
     */
    private currentNode:NNode;

    /**
     * 流程参数
     */
    private params:any = {};

    /**
     * 结束标志
     */
    private finished:boolean;

    /**
     * 容器
     */
    container:HTMLElement;
    
    constructor(id,cfg,container){
        this.id = id;
        this.name = cfg.name;
        this.title = cfg.title;
        this.container = container;
        this.handleNodes(cfg.nodes);
    }

    /**
     * 处理节点
     * @param nodes 
     * @returns 
     */
    handleNodes(nodes:INode[]){
        const rNodes = [];
        for(let n of nodes){
            let node;
            switch(n.type){
                case ENodeType.START:
                    node = new NStartNode(n,this);
                    break;
                case ENodeType.END:
                    node = new NEndNode(n,this);
                    break;
                case ENodeType.MODULE:
                    node = new NModuleNode(n,this);
                    break;
                case ENodeType.SEQUENCE:
                    node = new NSequenceNode(n,this);
                    break;
                case ENodeType.EXCLUSIVE:
                    node = new NExclusiveNode(n,this);
                    break;
                case ENodeType.INCLUSIVE:
                    node = new NInclusiveNode(n,this);
                    break;
                case ENodeType.PARALLEL:
                    node = new NParallelNode(n,this);
                    break;
            }
            rNodes.push(node);
        }
        this.nodes = rNodes;
        //执行节点初始化
        this.doNodeInit();
        console.log(this.nodes);
    }

    /**
     * 对有init方法的节点执行init
     */
    doNodeInit(){
        for(let node of this.nodes){
            if(node['init']){
                node['init'].apply(node);
            }   
        }
    }

    /**
     * 获取参数
     * @param key   参数名，如果没有则表示整个参数对象
     */
    getParam(key?:string){
        if(!this.params){
            return;
        }
        if(key){
            return this.params[key];
        }
        return this.params;
    }

    /**
     * 保存参数
     * @param key       key
     * @param value     值
     */
    setParam(key:string,value:any){
        if(key){
            this.params[key] = value;
        }else{
            this.params = value;
        }
    }

    /**
     * 开始流传
     */
    start(){
        const node = this.nodes.find(item=>item instanceof NStartNode);
        if(!node){
            throw "流程无开始节点";
        }
        node.run();
    }

    /**
     * 结束
     */
    end(){
        delete this.currentNode;
        this.finished = true;
    }

    /**
     * 获取节点
     * @param name  节点名称 
     * @returns     节点
     */
    getNode(name:string):NNode{
        return this.nodes.find(item=>item.name === name);
    }

    /**
     * 设置当前节点
     * @param node 
     */
    setCurrentNode(node:NNode){
        //解挂载当前节点
        if(this.currentNode && this.currentNode instanceof NModuleNode){
            this.currentNode.module.unmount();
        }
        this.currentNode = node;
    }

    /**
     * 执行下一个节点
     * @returns 
     */
    next(){
        if(!this.currentNode){
            return;
        }
        //执行下个流程节点
        let seq = this.getSequenceNode(this.currentNode.name);
        if(seq){
            seq.run();
        }
    }

    /**
     * 获取顺序流节点
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNode(name:string,isDst?:boolean):NSequenceNode{
        if(isDst){
            return <NSequenceNode>this.nodes.find(item=>item['dst'] === name);
        }
        return <NSequenceNode>this.nodes.find(item=>item['src'] === name);
    }

    /**
     * 获取顺序流节点集合，主要用于网关
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
     getSequenceNodes(name:string,isDst?:boolean):NSequenceNode[]{
        if(isDst){
            return <NSequenceNode[]>this.nodes.filter(item=>item['dst'] === name);
        }
        return <NSequenceNode[]>this.nodes.filter(item=>item['src'] === name);
    }
}