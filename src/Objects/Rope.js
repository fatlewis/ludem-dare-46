import 'phaser';

export default class Rope {
  constructor(ropePoints, initialJoint, finalJoint) {
    this.ropePoints = ropePoints;
    this.initialJoint = initialJoint;
    this.finalJoint = finalJoint;
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

    const xDistance = Math.abs(start.x - end.x);
    const yDistance = Math.abs(start.y - end.y);
    const distance = Math.sqrt((xDistance ** 2) + (yDistance ** 2));

    // Ensure each segment has a distance of <= segmentLength
    const numberOfPoints = distance / segmentLength;
    let xSpacingDistance = xDistance / numberOfPoints;
    if (start.x > end.x) { xSpacingDistance *= -1; }
    let ySpacingDistance = yDistance / numberOfPoints;
    if (start.y > end.y) { ySpacingDistance *= -1; }

    // Add initial point and connect it to object
    const initialPoint = Rope.createPoint(scene, start.x, start.y);
    const initialJoint = scene.matter.add.joint(
      firstObject,
      initialPoint,
      0,
      undefined,
      (options && options.pointA) ? { pointA: options.pointA } : undefined,
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
      const newPoint = Rope.createPoint(scene, nextX, nextY);
      scene.matter.add.joint(prevPoint, newPoint, segmentLength);
      ropePoints.push(newPoint);
      prevPoint = newPoint;
    }

    // Add final point and connect it to object
    const finalPoint = Rope.createPoint(scene, end.x, end.y);
    ropePoints.push(finalPoint);
    scene.matter.add.joint(prevPoint, finalPoint, segmentLength);
    const finalJoint = scene.matter.add.joint(
      finalPoint,
      secondObject,
      0,
      undefined,
      (options && options.pointB) ? { pointB: options.pointB } : undefined,
    );

    // Return an instance with the list of rope points
    return new Rope(ropePoints, initialJoint, finalJoint);
  }

  static createPoint(scene, x, y) {
    return scene.matter.add.circle(x, y, 1, { mass: 0.1 });
  }
}
