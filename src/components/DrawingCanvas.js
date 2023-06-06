import React, { useRef, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  let isDrawing = false;
  let context = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.lineWidth = 10;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (event) => {
    event.preventDefault();
    isDrawing = true;
    const coordinates = getEventCoordinates(event);
    context.beginPath();
    context.moveTo(coordinates.x, coordinates.y);
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing) return;
    const coordinates = getEventCoordinates(event);
    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  const getEventCoordinates = (event) => {
    let x, y;
    if (event.type.startsWith("mouse")) {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    } else if (event.type.startsWith("touch")) {
      const touch = event.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      x = (touch.clientX - rect.left) * scaleX;
      y = (touch.clientY - rect.top) * scaleY;
    }
    return { x, y };
  };

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
    ></canvas>
  );
};

export default DrawingCanvas;
