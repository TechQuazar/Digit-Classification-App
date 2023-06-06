import React, { useState } from "react";
import axios from "axios";
import DrawingCanvas from "./DrawingCanvas";

const DigitClassificationApp = () => {
  const [classificationResult, setClassificationResult] = useState("");

  const reloadWindow = () => {
    window.location.reload();
  };

  const handleDigitSubmit = async (event) => {
    event.preventDefault();

    const canvas = document.querySelector("canvas");
    const image = canvas.toDataURL();
    // console.log("Image", image);

    try {
      const response = await axios.post(
        "https://digit-classification-backend.onrender.com/upload",
        {
          image: image,
        }
      );
      setClassificationResult(response.data.output);
    } catch (error) {
      console.error("Error occurred while classifying digit:", error);
    }
  };

  return (
    <div style={styles.outercontainer}>
      <DrawingCanvas />
      <form onSubmit={handleDigitSubmit}>
        <button type="submit" style={styles.btn}>
          Recognize
        </button>
        <button onClick={reloadWindow}>Reset</button>
      </form>
      {classificationResult && (
        <p style={styles.result}>
          Classification Result: {classificationResult}
        </p>
      )}
    </div>
  );
};

const styles = {
  outercontainer: {
    marginTop: "20px",
  },
  result: {
    fontSize: "20px",
  },
  btn: {
    marginRight: "10px",
  },
};

export default DigitClassificationApp;
