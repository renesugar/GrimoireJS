import TextureBase from "../../Resources/Texture/TextureBase";
import BasicRenderStage from "./Base/BasicRenderStage";
import SceneObject from "../../SceneObjects/SceneObject";
import BufferInput from "../BufferInput";
import Scene from "../../Scene";
import Q from "q";

interface HitTestQuery {
  x: number;
  y: number;
  deferred: Q.Deferred<SceneObject>;
}

class HitAreaRenderStage extends BasicRenderStage {
  constructor(renderer) {
    super(renderer, require("./BuiltIn/HitAreaRenderingStage.rsml"));
    this.Renderer.on("mouse-move", (e) => {
      this.queryHitTest(e.mouseX, e.mouseY).then((object) => {
        console.log(object);
      });
    });
  }

  /**
   * Object index for rendering hit area.
   * (This is internal use)
   * @type {number}
   */
  public objectIndex: number = 1;

  public indexObjectPair: { [key: number]: SceneObject } = {};

  public hitTestQueries: HitTestQuery[] = [];

  public preTechnique(scene: Scene, techniqueIndex: number, texs: BufferInput): void {
    super.preTechnique(scene, techniqueIndex, texs);
    this.objectIndex = 1;
  }

  public render(scene: Scene, object: SceneObject, techniqueCount: number, techniqueIndex: number, texs: BufferInput): void {
    this.indexObjectPair[this.objectIndex] = object;
    super.render(scene, object, techniqueCount, techniqueIndex, texs);
    this.objectIndex++;
  }

  public postTechnique(scene: Scene, techniqueIndex: number, texs: BufferInput): void {
    if (texs["OUT"]) {
      if (!(texs["OUT"] instanceof TextureBase)) {
        throw new Error("OUT argument cannnot acceptable except TextureBase");
      }
      const canvas = this.Renderer.Canvas;
      for (let i = 0; i < this.hitTestQueries.length; i++) {
        const query = this.hitTestQueries[i];
        const fetchedPixel = (texs["OUT"] as TextureBase).getForContext(canvas).getPixel(query.x, this.Renderer.region.Height - query.y);
        const object = this._fetchRelatedObject(fetchedPixel);
        query.deferred.resolve(object);
      }
      this.hitTestQueries.splice(0);
    }
  }

  public queryHitTest(x: number, y: number): Q.IPromise<SceneObject> {
    const deferred = Q.defer<SceneObject>();
    this.hitTestQueries.push({
      x: x,
      y: y,
      deferred: deferred
    });
    return deferred.promise;
  }

  private _fetchRelatedObject(pixel: ArrayBufferView): SceneObject {
    const id = (pixel[0] << 16) | pixel[1];
    return this.indexObjectPair[id];
  }
}

export default HitAreaRenderStage;
