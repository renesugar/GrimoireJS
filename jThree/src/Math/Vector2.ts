import VectorBase = require("./VectorBase");
import glm = require('glm');

class Vector2 extends VectorBase{

    public static get XUnit(): Vector2 {
        return new Vector2(1, 0);
    }

    public static get YUnit(): Vector2 {
        return new Vector2(0, 1);
    }

    public static get One(): Vector2 {
        return new Vector2(1, 1);
    }

    public static get Zero(): Vector2 {
        return new Vector2(0, 0);
    }
    
    constructor(x: number, y: number);
    constructor(x:glm.GLM.IArray);
    constructor(x: number|glm.GLM.IArray, y?: number) {
        super();
        if(typeof y ==='undefined')
        {
            this.targetVector=<glm.GLM.IArray>x;
            return;
        }
        this.targetVector=[<number>x,y];
    }
    
    public targetVector: glm.GLM.IArray;

    public get normalized()
    {
        return this.multiplyWith(1 / this.magnitude);
    }
    
    get X(): number {
        return this.targetVector[0];
    }

    get Y(): number {
        return this.targetVector[1];
    }

    set X(x: number)
    {
        this.targetVector[0] = x;
    }

    set Y(y: number)
    {
        this.targetVector[1] = y;
    }

    static dot(v1: Vector2, v2: Vector2): number {
        return glm.vec2.dot(v1.targetVector,v2.targetVector);
    }

    static add(v1: Vector2, v2: Vector2): Vector2 {
        var newVec=glm.vec2.create();
        return new Vector2(glm.vec2.add(newVec,v1.targetVector,v2.targetVector));
    }

    static subtract(v1: Vector2, v2: Vector2): Vector2 {
        var newVec=glm.vec2.create();
        return new Vector2(glm.vec2.sub(newVec,v1.targetVector,v2.targetVector));
    }

    static multiply(s: number, v: Vector2): Vector2 {
        var newVec=glm.vec2.create();
        return new Vector2(glm.vec2.scale(newVec,v.targetVector,s));
    }

    static negate(v1: Vector2): Vector2 {
        return Vector2.multiply(-1,v1);
    }

    static equal(v1: Vector2, v2: Vector2): boolean {
        return VectorBase.elementEqual(v1, v2);
    }

    static normalize(v1: Vector2): Vector2 {
        var newVec=glm.vec2.create();
        return new Vector2(glm.vec2.normalize(newVec,v1.targetVector));
    }

    dotWith(v: Vector2): number {
        return Vector2.dot(this, v);
    }

    addWith(v: Vector2): Vector2 {
        return Vector2.add(this, v);
    }

    subtractWith(v: Vector2): Vector2 {
        return Vector2.subtract(v, this);
    }

    multiplyWith(s: number): Vector2 {
        return Vector2.multiply(s, this);
    }

    negateThis(): Vector2 {
        return Vector2.negate(this);
    }

    equalWith(v: Vector2): boolean {
        return Vector2.equal(this, v);
    }

    normalizeThis(): Vector2 {
        return Vector2.normalize(this);
    }

    toString(): string {
        return `Vector2(x=${this.X}},y=${this.Y})`;
    }

    get ElementCount(): number { return 2; }

}

export=Vector2;
