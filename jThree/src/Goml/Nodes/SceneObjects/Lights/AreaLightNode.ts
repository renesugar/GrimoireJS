import GomlTreeNodeBase = require("../../../GomlTreeNodeBase");
import GomlLoader = require("../../../GomlLoader");
import SceneObjectNodeBase = require("../SceneObjectNodeBase");
import GomlTreeSceneNode = require("../../SceneNode");
import LightNodeBase = require('./LightNodeBase');
import AreaLight = require("../../../../Core/Light/Impl/AreaLight");
import LightBase =require('../../../../Core/Light/LightBase');
import Vector3 = require("../../../../Math/Vector3");
class AreaLightNode extends LightNodeBase
{
	private targetLight:AreaLight;

	constructor(elem: HTMLElement, loader: GomlLoader, parent: GomlTreeNodeBase, parentSceneNode: GomlTreeSceneNode, parentObject: SceneObjectNodeBase) {
		super(elem, loader, parent, parentSceneNode, parentObject);
		this.attributes.defineAttribute({
			"intensity":{
				value:1,converter:"number",handler:(v)=>{this.targetLight.intensity=v.Value;}
			},
			"base":{
				value:Vector3.Zero,
				converter:"vector3",
				handler:(v)=>{
					this.targetLight.basePoint = v.Value;
				}
			},
			"right":{
				value: Vector3.XUnit,
				converter:"vector3",
				handler:(v)=>{
					this.targetLight.rightPoint = v.Value;
				}
			}
			,
			"top":{
				value: Vector3.YUnit,
				converter:"vector3",
				handler:(v)=>{
					this.targetLight.topPoint = v.Value;
				}
			}
			,
			"far":{
				value: Vector3.ZUnit,
				converter:"vector3",
				handler:(v)=>{
					this.targetLight.farPoint = v.Value;
				}
			}
		});
	}

	protected constructLight():LightBase
	{
		this.targetLight= new AreaLight(this.ContainedSceneNode.targetScene);
		return this.targetLight;
	}
}
export = AreaLightNode;