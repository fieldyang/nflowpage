import { NNode } from "./node/nnode";
import { NSequenceNode } from "./node/nsequencenode";
import { INode } from "./types";
export declare class NPageProcess {
    /**
     * 流程id
     */
    private id;
    /**
     * 流程名
     */
    private name;
    /**
     * 流程标题
     */
    private title;
    /**
     * 流程节点集合
     */
    private nodes;
    /**
     * 当前节点
     */
    private currentNode;
    /**
     * 流程参数
     */
    private params;
    /**
     * 结束标志
     */
    private finished;
    /**
     * 容器
     */
    container: HTMLElement;
    constructor(id: any, cfg: any, container: any);
    /**
     * 处理节点
     * @param nodes
     * @returns
     */
    handleNodes(nodes: INode[]): void;
    /**
     * 对有init方法的节点执行init
     */
    doNodeInit(): void;
    /**
     * 获取参数
     * @param key   参数名，如果没有则表示整个参数对象
     */
    getParam(key?: string): any;
    /**
     * 保存参数
     * @param key       key
     * @param value     值
     */
    setParam(key: string, value: any): void;
    /**
     * 开始流传
     */
    start(): void;
    /**
     * 结束
     */
    end(): void;
    /**
     * 获取节点
     * @param name  节点名称
     * @returns     节点
     */
    getNode(name: string): NNode;
    /**
     * 设置当前节点
     * @param node
     */
    setCurrentNode(node: NNode): void;
    /**
     * 执行下一个节点
     * @returns
     */
    next(): void;
    /**
     * 获取顺序流节点
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNode(name: string, isDst?: boolean): NSequenceNode;
    /**
     * 获取顺序流节点集合，主要用于网关
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNodes(name: string, isDst?: boolean): NSequenceNode[];
}
