class vec2{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    x = 0;
    y = 0;

    set(x, y) {
        this.x = x;
        this.y = y;
    };

    normalize(){
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        return new vec2(this.x/length, this.y/length);
    };

    normalized(){
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x/=length;
        this.y/=length;
    };

    dot(v){
        return this.x * v.x + this.y * v.y;
    }

    add(v){
        return new vec2(this.x + v.x, this.y + v.y);
    }

    sub(v){
        return new vec2(this.x - v.x, this.y - v.y);
    }

    elem_mul(v){
        return new vec2(this.x * v.x, this.y * v.x);
    }

    elem_div(v){
        return new vec2(this.x / v.x, this.y / v.x);
    }

    scalar_mul(v){
        return new vec2(this.x * v, this.y * v);
    }

    scalar_div(v){
        return new vec2(this.x / v, this.y / v);
    }

};

//this is what happens when you don't have operator overloading
function reflect(v,n){
    v.normalize();
    n.normalize();
    return v.sub(n.scalar_mul(2 * v.dot(n)));
}

function refract(v,n,etai_over_etat){

    v.normalize();
    n.normalize();

    let dt = v.dot(n);
    let discriminant = 1.0 - etai_over_etat * etai_over_etat * (1 - dt * dt);
    if (discriminant > 0) {
        return v.sub(n.scalar_mul(dt)).scalar_mul(etai_over_etat).sub(n.scalar_mul(Math.sqrt(discriminant)));
    }
    else {
        //total internal reflection
        return reflect(v, n);
    }
}

class ray2D{
    origin = new vec2(0,0);
    direction = new vec2(1,0);

    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    pointAt(t){
        this.direction.normalize();
        return new vec2(this.origin.x + t * this.direction.x,this.origin.y + t * this.direction.y);
    }
};

class Line{
    point1 = new vec2(0,0);
    point2 = new vec2(0,0);
    refractRatio = 0.5;

    constructor(point1, point2, refractRatio) {
        this.point1 = point1;
        this.point2 = point2;
        this.refractRatio = refractRatio;
    }

    normal() {
        return new vec2(this.point2.y - this.point1.y, this.point1.x - this.point2.x).normalize();
    };

    //calculate the intersection point
    intersect(ray){        
        let normal = this.normal();
        let dot = ray.direction.x * normal.x + ray.direction.y * normal.y;
        //parallel
        if (dot == 0) {
            return null;
        }
        
        let t = ((this.point1.x - ray.origin.x) * normal.x + (this.point1.y - ray.origin.y) * normal.y) / dot;
        //behind
        if (t < 0.001||t>10000) {
            return null;
        }

        //not within the line segment
        let intersection = ray.pointAt(t);
        let v1 = intersection.sub(this.point1);
        let v2 = intersection.sub(this.point2);
        if (v1.dot(v2) > 0) {
            return null;
        }


        let outray = new ray2D();
        let isInside = ray.direction.dot(normal) < 0;
        let ior = isInside ? 1.5 : 1 / 1.5;

        if(Math.random()>this.refractRatio){
            outray.origin = ray.pointAt(t);
            outray.direction = reflect(ray.direction, normal);
        }
        else{
            outray.origin = ray.pointAt(t);
            outray.direction = refract(ray.direction, normal, ior);
        }

        return {
            point: ray.pointAt(t),
            outray: outray,
            t: t
        }
    }

    //call method from p5.js
    draw(){
        line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    }
};

class Circle{
    center = new vec2(0,0);
    radius = 1;
    refractRatio = 0.5;

    constructor(center, radius, refractRatio) {
        this.center = center;
        this.radius = radius;
        this.refractRatio = refractRatio;
    }

    normal(point){
        return point.sub(this.center).normalize();
    }

    //calculate the intersection point
    intersect(ray){
        ray.direction.normalize();
        let oc = new vec2(ray.origin.x - this.center.x, ray.origin.y - this.center.y);
        let a = ray.direction.x * ray.direction.x + ray.direction.y * ray.direction.y;
        let b = 2 * (oc.x * ray.direction.x + oc.y * ray.direction.y);
        let c = oc.x * oc.x + oc.y * oc.y - this.radius * this.radius;
        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return null;
        }
        //two solutions
        let t = (-b - Math.sqrt(discriminant)) / (2 * a);
        if (t < 0.001 || t>10000) {
            t = (-b + Math.sqrt(discriminant)) / (2 * a);
        }
        if (t < 0.001 || t>10000) {
            return null;
        }

        let normal = this.normal(ray.pointAt(t));
        let outray = new ray2D();
        let isInside = ray.direction.dot(normal) > 0;
        let ior = isInside ? 1.5 : 1 / 1.5;

        if(isInside){
            normal = normal.scalar_mul(-1);
        }

        if(Math.random() > this.refractRatio){
            outray.origin = ray.pointAt(t);
            outray.direction = reflect(ray.direction.normalize(), normal);
        }
        else{
            outray.origin = ray.pointAt(t);
            outray.direction = refract(ray.direction.normalize(), normal, ior);
        }

        //outray origin is on the circle, so we need to move it a little bit
        outray.origin = outray.origin.add(outray.direction.scalar_mul(0.001));

        return {
            point: ray.pointAt(t),
            outray: outray,
            t: t
        }
    }

    //call method from p5.js
    draw(){
        circle(this.center.x, this.center.y, 2*this.radius);
    }

};

