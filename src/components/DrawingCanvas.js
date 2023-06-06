import React, { useRef, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  let isDrawing = false;
  let context = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    context = canvas.getContext("2d");
    context.lineWidth = 10;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (event) => {
    isDrawing = true;
    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    ></canvas>
  );
};

export default DrawingCanvas;
