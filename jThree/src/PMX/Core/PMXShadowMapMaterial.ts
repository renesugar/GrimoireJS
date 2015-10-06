import Material = require('../../Core/Materials/Material');
import Program = require("../../Core/Resources/Program/Program");
import RendererBase = require("../../Core/Renderers/RendererBase");
import Geometry = require("../../Core/Geometries/Geometry");
import SceneObject = require("../../Core/SceneObject");
import Matrix = require("../../Math/Matrix");
import GLFeatureType = require("../../Wrapper/GLFeatureType");
import Scene = require('../../Core/Scene');
import PMXMaterial = require('./PMXMaterial');
import ResolvedChainInfo = require('../../Core/Renderers/ResolvedChainInfo');
import PMXGeometry = require('./PMXGeometry');
import Vector4 = require("../../Math/Vector4");
import PMXMaterialParamContainer = require("./PMXMaterialMorphParamContainer");

declare function require(string): string;
/**
 * the materials for PMX.
 */
class PMXShadowMapMaterial extends Material
{
    protected program: Program;

    protected associatedMaterial: PMXMaterial;

    /**
     * Count of verticies
     */
    public get VerticiesCount()
    {
        return this.associatedMaterial.VerticiesCount;
    }

    /**
     * Offset of verticies in index buffer
     */
    public get VerticiesOffset()
    {
        return this.associatedMaterial.VerticiesOffset;
    }

    constructor(material: PMXMaterial)
    {
        super();
        this.associatedMaterial = material;
        var vs = require('../Shader/PMXShadowMapVertex.glsl');
        var fs = require('../Shader/PMXShadowMapFragment.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.pmx.shadowmap", "jthree.shaders.fragment.pmx.shadowmap", "jthree.programs.pmx.shadowmap", vs, fs);
        this.setLoaded();
    }

    public configureMaterial(scene: Scene, renderer: RendererBase, object: SceneObject, texs: ResolvedChainInfo,techniqueIndex:number,passIndex:number): void {
        if (!this.program||this.associatedMaterial.Diffuse.A<1.0E-3) return;
        super.configureMaterial(scene, renderer, object, texs,techniqueIndex,passIndex);
        var geometry = <PMXGeometry>object.Geometry;
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        var v = Matrix.multiply(renderer.Camera.projectionMatrix, renderer.Camera.viewMatrix);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer,
            },
            uniforms: {
                boneMatricies: { type: "texture", value: this.associatedMaterial.ParentModel.Skeleton.MatrixTexture, register: 0 },
                matLW:{type:"matrix",value:scene.LightRegister.shadowDroppableLights[techniqueIndex].matLightProjection},
                boneCount: { type: "float", value: this.associatedMaterial.ParentModel.Skeleton.BoneCount }
            }
        });
        object.Geometry.bindIndexBuffer(renderer.ContextManager);
    }


    public get Priorty(): number
    {
        return 100;
    }

    public getDrawGeometryLength(geo: Geometry): number
    {
        return this.associatedMaterial.Diffuse.A > 0 ? this.VerticiesCount : 0;
    }

    public getDrawGeometryOffset(geo: Geometry): number
    {
        return this.VerticiesOffset * 4;
    }

    public get MaterialGroup(): string
    {
        return "jthree.materials.shadowmap";
    }
}

export =PMXShadowMapMaterial;