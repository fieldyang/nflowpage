/**
 * 节点类型
 */
export declare enum ENodeType {
    SEQUENCE = "sequence",
    START = "start",
    END = "end",
    EXCLUSIVE = "exclusive",
    PARALLEL = "parallel",
    INCLUSIVE = "inclusive",
    MODULE = "module"
}
export interface INode {
    /**
     * 节点名，全流程唯一
     */
    name: string;
    /**
     * 类型
     */
    type: ENodeType;
    /**
     * 条件，对sequence有效
     */
    cond?: string;
    /**
     * 路径，对module有效
     */
    path?: string;
    /**
     * 来源节点，对sequence有效
     */
    src?: string;
    /**
     * 目标节点，对sequence有效
     */
    dst?: string;
}
