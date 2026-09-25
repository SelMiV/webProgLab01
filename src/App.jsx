import React from 'react'

function App() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    // устанавливаем слушатель


    // удаляем слушатель при изменении компонента
    return () => {
      window.removeEventListener("mousemove", event => {
        const { pageX, pageY } = event;
        setMousePosition({ x: pageX, y: pageY });
      });
    };
  }, []);

  return (
    <div>
      <h1>The current mouse position is:</h1>
      <p>
        X: {mousePosition.x}, Y: {mousePosition.y}
      </p>
    </div>
  );
}

export default App
