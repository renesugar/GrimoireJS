import { StandardAttribute } from "../Core/Attribute";
import Component from "../Core/Component";
import GomlNode from "../Core/GomlNode";
import Ensure from "../Tool/Ensure";
import { Undef } from "../Tool/Types";

export interface IComponentConverter<T> {
  name: string;
  verify(attr: StandardAttribute): void;
  convert(val: any, attr: StandardAttribute): Undef<T>;
}

export function getGenericComponentConverter<T>(): IComponentConverter<T> {
  return ComponentConverter as any as IComponentConverter<T>;
}

/**
 * コンポーネントのためのコンバータです。
 * 属性宣言に`target`パラメータの指定が必要です。
 * `gomlnode`に対しては、`target`パラメータの値で`getComponent`した結果を返します。
 * `Component`に対しては、`target`パラメータと型が一致していればそのまま返します。そうでなければ、例外を投げます。
 * 文字列の場合、ノードに対するクエリとして解釈され、取得されたノードに対して`getComponent`されます。
 */
export const ComponentConverter = {
  name: "Component",

  /**
   * verify
   * @param attr
   */
  verify(attr: StandardAttribute) {
    if (!attr.declaration["target"]) {
      throw new Error("Component converter require to be specified target");
    }
  },
  /**
   * convert
   * @param val
   * @param attr
   */
  convert(val: any, attr: StandardAttribute): Undef<Component> {
    if (val instanceof GomlNode) {
      return val.getComponent<Component>(attr.declaration["target"]);
    } else if (val instanceof Component) {
      if (val.name.fqn === Ensure.tobeIdentity(attr.declaration["target"]).fqn) {
        return val;
      } else {
        throw new Error(`Specified component must be ${attr.declaration["target"]}`);
      }
    } else {
      const n = attr.tree!(val).first();
      if (n) {
        return n.getComponent<Component>(attr.declaration["target"]);
      }
      return null;
    }
  },
};

export default ComponentConverter;