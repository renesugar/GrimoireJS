import test from 'ava';
import GomlParser from "../../lib-es5/Core/Node/GomlParser";
import xmldom from 'xmldom';
import DefaultPluginRegister from "../../lib-es5/Core/Node/DefaultPluginRegister"
import NamespacedSet from "../../lib-es5/Core/Base/NamespacedSet"
import NamespacedIdentity from "../../lib-es5/Core/Base/NamespacedIdentity"

// function loadFromTestResource(path){
//   return require("./_TestResource/"+path);
// }
//
// function obtainElementTag(path){
//   const DOMParser = xmldom.DOMParser;
//   const parser = new DOMParser();
//   return parser.parseFromString(loadFromTestResource(path),"text/xml").documentElement;
// }

// DefaultPluginRegister.register();

test('test parse for goml parser',(t)=>{
  // const element = obtainElementTag("GOMLParserTest_Case1.goml");
  // GomlParser.parse(element);
  // console.log(element);
  const name = new NamespacedIdentity("namespace1","name1");
  const set = new NamespacedSet();
  set.push(name);
  const array = set.toArray();
  t.truthy(array.length === 1);
  t.truthy(array[0].name === "NAME1");

});
