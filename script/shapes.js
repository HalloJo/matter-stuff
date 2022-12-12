const { Engine, Render, Bodies, World } = Matter;

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
  return Bodies.circle(x, y, 20 + 20 * Math.random(), {
    render: {
      fillStyle: "#000",
    },
  });
};

document.addEventListener("click", (event) => {
  const shape = createShape(event.pageX, event.pageY);
  World.add(engine.world, shape);
});

Engine.run(engine);
Render.run(renderer);
