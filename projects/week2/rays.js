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
};


class ray2D{
    origin = new vec2(0,0);
    direction = new vec2(1,0);

    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    pointAt(t){
        return new vec2(this.origin.x + t * this.direction.x,this.origin.y + t * this.direction.y);
    }
};



class Line{
    point1;
    point2;

    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    normal() {
        return new vec2(this.point2.y - this.point1.y, this.point1.x - this.point2.x).normalize();
    };

    //calculate the intersection point
    intersect(ray){
        let normal = this.normal();
        let dot = ray.direction.x * normal.x + ray.direction.y * normal.y;
        if (dot == 0) {
            return null;
        }
        let t = ((this.point1.x - ray.origin.x) * normal.x + (this.point1.y - ray.origin.y) * normal.y) / dot;
        if (t < 0) {
            return null;
        }
        return ray.pointAt(t);
    }
};

