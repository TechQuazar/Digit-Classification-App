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
    event.preventDefault();
    isDrawing = true;
    const coordinates = getEventCoordinates(event);
    context.beginPath();
    context.moveTo(coordinates.x, coordinates.y);
    if (event.type === "touchstart") {
      event.currentTarget.addEventListener("touchmove", draw);
      event.currentTarget.addEventListener("touchend", stopDrawing);
      event.currentTarget.addEventListener("touchcancel", stopDrawing);
    }
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing) return;
    const coordinates = getEventCoordinates(event);
    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();
  };

  const stopDrawing = (event) => {
    event.preventDefault();
    isDrawing = false;
    if (event.type === "touchend" || event.type === "touchcancel") {
      event.currentTarget.removeEventListener("touchmove", draw);
      event.currentTarget.removeEventListener("touchend", stopDrawing);
      event.currentTarget.removeEventListener("touchcancel", stopDrawing);
    }
  };

  const getEventCoordinates = (event) => {
    let x, y;
    if (event.type.startsWith("mouse")) {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    } else if (event.type.startsWith("touch")) {
      const touch = event.touches[0];
      const rect = event.currentTarget.getBoundingClientRect();
      const scaleX = event.currentTarget.width / rect.width;
      const scaleY = event.currentTarget.height / rect.height;
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
      style={{ touchAction: "none" }}
    ></canvas>
  );
};

export default DrawingCanvas;
