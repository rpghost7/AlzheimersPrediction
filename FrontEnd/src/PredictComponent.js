import { useState } from "react";

function PredictComponent() {
  const [inputData, setInputData] = useState(Array(23).fill(0.5));
  const [prediction, setPrediction] = useState(null);
  const featureNames = [
    "Glu", "Cho", "TG", "LDL", "Homoc", "Transf", "ferrit", "Hb",
    "CardiolIGG", "CardioIGM", "TP", "Fifrinogeno", "T3", "TSH",
    "T4", "B12", "FOLICO", "IGF1", "BDNF", "NGF", "Nitritos",
    "TNF", "IL6"
  ];
  const featureRanges = [
    { min: 38, max: 251 },      // Glu
    { min: 1.9, max: 343 },     // Cho
    { min: 39, max: 619 },      // TG
    { min: 0, max: 242 },       // LDL
    { min: 8.3, max: 138 },     // Homoc
    { min: 152, max: 474 },     // Transf
    { min: 7, max: 675 },       // ferrit
    { min: 7.4, max: 17.9 },    // Hb
    { min: 0.5, max: 21.0 },    // CardiolIGG
    { min: 0, max: 35 },        // CardioIGM
    { min: 4, max: 130 },       // TP
    { min: 241.7, max: 806.4 }, // Fifrinogeno
    { min: 1.07, max: 15.80 },  // T3
    { min: 0.10, max: 12.65 },  // TSH
    { min: 0.79, max: 1.67 },   // T4
    { min: 34.86, max: 15551.0 },// B12
    { min: 1.57, max: 815 },    // FOLICO
    { min: 23, max: 236 },      // IGF1
    { min: 3711.818, max: 33757.895 }, // BDNF
    { min: 2808.372, max: 22182.769 }, // NGF
    { min: -9.4423, max: 24.9472 },    // Nitritos
    { min: -0.2483742, max: 12.7917180 }, // TNF
    { min: -2.817, max: 56.448 }       // IL6
  ];
  const initialValues = featureRanges.map(range => 
    (range.max + range.min) / 2
  );
  const handleSliderChange = (index, value) => {
    const newInputData = [...inputData];
    newInputData[index] = parseFloat(value);
    setInputData(newInputData);
  };

  const handlePredict = async () => {
    try {
      // console.log("Sending data:", inputData); // Debug log
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: inputData }),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received prediction:", data);
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };
  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center py-8">
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl px-4">
        <h2 className="text-white text-2xl ">Let's use your data to predict your risk of having Alzheimer's</h2>
        
        <div className="w-full space-y-2">
          {inputData.map((value, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-white w-32">{featureNames[index]}:</span>
              <input
                type="range"
                min={featureRanges[index].min}
                max={featureRanges[index].max}
                step={(featureRanges[index].max - featureRanges[index].min) / 100}
                value={value}
                onChange={(e) => handleSliderChange(index, e.target.value)}
                className="flex-grow"
              />
              <span className="text-white w-16">{value.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handlePredict}
        >
          Get Prediction
        </button>
        {prediction !== null && <p className="text-white">Prediction: {prediction}</p>}
      </div>
    </div>
  );
}

export default PredictComponent;
