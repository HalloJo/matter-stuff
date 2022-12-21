const { Engine, Render, Bodies, World, MouseConstraint, Composites } = Matter;

const section = document.querySelector(".shapes");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const engine = Engine.create();
const renderer = Render.create({
  element: section,
  engine: engine,
  options: {
    height: windowHeight,
    width: windowWidth,
    background: "#fff",
    wireframes: false,
    pixelRatio: window.devicePixelRatio,
  },
});

const createShape = (x, y) => {
  return Bodies.rectangle(x, y, 55, 72, {
    render: {
      sprite: {
        texture: "/assets/jorik.png",
        // xScale: 0.5,
        // yScale: 0.5,
      },
    },
  });
};

const bigShape = Bodies.circle(windowWidth / 2, windowHeight / 2, 250, {
  isStatic: true,
  render: {
    // strokeStyle: "#000",
    // lineWidth: 20,
    fillStyle: "#000",
  },
});

const wallOptions = {
  isStatic: true,
  render: {
    visible: false,
  },
};

const mouseControl = MouseConstraint.create(engine, {
  element: section,
  constraint: {
    render: {
      visible: false,
    },
  },
});

const initialShapes = Composites.stack(55, 72, 15, 5, 40, 40, (x, y) => {
  return createShape(x, y);
});

const ground = Bodies.rectangle(
  windowWidth / 2,
  windowHeight + 25,
  windowWidth,
  50,
  wallOptions
);
const ceiling = Bodies.rectangle(
  windowWidth / 2,
  -25,
  windowWidth,
  50,
  wallOptions
);
const leftWall = Bodies.rectangle(
  -50,
  windowHeight / 2,
  100,
  windowHeight + 100,
  wallOptions
);
const rightWall = Bodies.rectangle(
  windowWidth + 50,
  windowHeight / 2,
  100,
  windowHeight + 100,
  wallOptions
);

World.add(engine.world, [
  bigShape,
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  initialShapes,
]);

document.addEventListener("click", (event) => {
  const shape = createShape(event.pageX, event.pageY);
  World.add(engine.world, shape);
});

Engine.run(engine);
Render.run(renderer);

let time = 0;
const changeGravity = () => {
  time = time + 0.004;

  engine.world.gravity.x = Math.sin(time);
  engine.world.gravity.y = Math.cos(time);

  requestAnimationFrame(changeGravity);
};

changeGravity();
