const { Engine, Render, Bodies, World, MouseConstraint } = Matter;

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
  return Bodies.rectangle(x, y, 77, 101, {
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
]);

document.addEventListener("click", (event) => {
  const shape = createShape(event.pageX, event.pageY);
  World.add(engine.world, shape);
});

Engine.run(engine);
Render.run(renderer);
