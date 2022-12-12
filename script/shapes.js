const section = document.querySelector(".shapes");

const engine = Matter.Engine.create();
const renderer = Matter.Render.create({
  element: section,
  engine: engine,
});

Matter.Engine.run(engine);
Matter.Render.run(renderer);
