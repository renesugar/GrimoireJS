import GomlTreeNodeBase from "../../Goml/GomlTreeNodeBase";
import JThreeContext from "../../JThreeContext";
import ContextComponents from "../../ContextComponents";
import NodeManager from "../../Goml/NodeManager";

class NodeOperation {
  public static insert(targets: GomlTreeNodeBase[], contents: GomlTreeNodeBase[], index?: number): void {
    const nodeManager = JThreeContext.getContextComponent<NodeManager>(ContextComponents.NodeManager);
    targets.forEach((target, i) => {
      let nodeOpMethod = nodeManager.insertNode;
      if (i === targets.length) {
        nodeOpMethod = nodeManager.moveNode;
      }
      contents.forEach((content, j) => {
        nodeOpMethod(content, target, typeof index === "undefined" ? void 0 : index + j);
      });
    });
  }

  public static remove(targets: GomlTreeNodeBase[]): void {
    const nodeManager = JThreeContext.getContextComponent<NodeManager>(ContextComponents.NodeManager);
    targets.forEach((target, i) => {
      nodeManager.removeNode(target);
    });
  }
}

export default NodeOperation;
