//given a ray, the scene objects, generate a list of intersection points
function trace(ray, scene, max_depth, intersections){
    if (max_depth < 0) {
        return;
    }

    let closest = null;
    let closestT = Infinity;

    for (let i = 0; i < scene.length; i++) {
        let intersection = scene[i].intersect(ray);
        if (intersection != null && intersection.t < closestT) {
            closest = intersection;
            closestT = intersection.t;
        }
    };

    if (closest == null) {
        return;
    }

    intersections.push(closest);
    trace(closest.outray, scene, max_depth-1, intersections);
}