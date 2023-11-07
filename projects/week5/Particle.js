class Particle{
    position;
    velocity;
    acceleration;
    size;
    color;

    constructor(radius, deg, idx){
        this.position = vec2.fromDegree(deg).scalar_mul(radius);
        this.velocity = new vec2(0,0);
        this.acceleration = this.position.copy().scalar_mul(Math.random()*5e-3);
        this.size = Math.random()*5*(idx+2);
        this.color = [200+55*Math.random(), 200+55*Math.random(), 200+55*Math.random()]
    }

    advance(){
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

    checkBoundary(p5){
        if(this.position.x<-p5.windowWidth/2 || this.position.x>p5.windowWidth/2 || this.position.y<-p5.windowHeight/2 || this.position.y>p5.windowHeight/2)
            return true;
        return false;
    }

    draw(p5){
        p5.fill(this.color);
        p5.noStroke();
        p5.circle(this.position.x+p5.windowWidth/2, this.position.y+p5.windowHeight/2, this.size);
    }

};
