import 'phaser';

export default class Rope {
  constructor(ropePoints) {
    this.ropePoints = ropePoints;
  }

  drawCurve(scene) {
    const points = [];
    this.ropePoints.forEach((p) => {
      points.push(new Phaser.Math.Vector2(p.position.x, p.position.y));
    });
    const ropeCurve = new Phaser.Curves.Spline(points);
    ropeCurve.draw(scene.graphics, 64);
  }

  static createBetweenObjects(scene, firstObject, secondObject, segmentLength, options) {
    // Find distance between objects
    const start = firstObject.body.position;
    const end = secondObject.body.position;

console.log(start, end);

    const xDistance = Math.abs(start.x - end.x);
    const yDistance = Math.abs(start.y - end.y);
    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

    // Ensure each segment has a distance of <= segmentLength
    const numberOfPoints = distance / segmentLength;
    let xSpacingDistance = xDistance / numberOfPoints;
    if (start.x > end.x) { xSpacingDistance = xSpacingDistance * -1 }
    let ySpacingDistance = yDistance / numberOfPoints;
    if (start.y > end.y) { ySpacingDistance = ySpacingDistance * -1 }

    // Add initial point and connect it to object
    const initialPoint = scene.matter.add.circle(start.x, start.y, 1, { mass: 0.1 });
    scene.matter.add.joint(
      firstObject,
      initialPoint,
      0,
      undefined,
      (options && options.pointA) ? { pointA: options.pointA } : undefined
    );

    let nextX;
    let nextY;
    let prevPoint = initialPoint;
    const ropePoints = [initialPoint];

    for (let i = 1; i < numberOfPoints; i += 1) {
      // Calculate next point x and y
      nextX = start.x + (xSpacingDistance * i);
      nextY = start.y + (ySpacingDistance * i);

      // Add new point
      const newPoint = scene.matter.add.circle(nextX, nextY, 1, { mass: 0.1 });
      scene.matter.add.joint(prevPoint, newPoint, segmentLength);
      ropePoints.push(newPoint);
      prevPoint = newPoint;
    }

    // Add final point and connect it to object
    const finalPoint = scene.matter.add.circle(end.x, end.y, 1, { mass: 0.1 });
    ropePoints.push(finalPoint);
    scene.matter.add.joint(prevPoint, finalPoint, segmentLength);
    scene.matter.add.joint(
      finalPoint,
      secondObject,
      0,
      undefined,
      (options && options.pointB) ? { pointB: options.pointB } : undefined
    );

    // Return an instance with the list of rope points
    return new Rope(ropePoints);
  }
}
