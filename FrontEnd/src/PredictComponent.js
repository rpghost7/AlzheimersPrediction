import { useState } from "react";

function PredictComponent() {
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

  // Calculate initial values as midpoints of ranges
  const initialValues = featureRanges.map(range => 
    (range.max + range.min) / 2
  );

  const [inputData, setInputData] = useState(initialValues);
  const [prediction, setPrediction] = useState(null);
  const [inputStrings, setInputStrings] = useState(initialValues.map(val => val.toString()));
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index, stringValue) => {
    // Update the string value immediately for smooth typing
    const newInputStrings = [...inputStrings];
    newInputStrings[index] = stringValue;
    setInputStrings(newInputStrings);

    // Convert to number and update if valid
    const numValue = parseFloat(stringValue);
    if (!isNaN(numValue) && 
        numValue >= featureRanges[index].min && 
        numValue <= featureRanges[index].max) {
      const newInputData = [...inputData];
      newInputData[index] = numValue;
      setInputData(newInputData);
    }
  };

  const handlePredict = async () => {
    try {
      // Validate all inputs before sending
      const invalidInputs = inputData.some((value, index) => 
        isNaN(value) || 
        value < featureRanges[index].min || 
        value > featureRanges[index].max
      );

      if (invalidInputs) {
        alert("Please ensure all inputs are valid numbers within their specified ranges");
        return;
      }

      setIsLoading(true);
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: inputData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error making prediction. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center py-8">
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl px-4">
        <h2 className="text-white text-2xl">
         Here is our prediction model for Alzheimer's
        </h2>
        
        <div className="w-full space-y-2">
          {inputData.map((value, index) => (
            <div key={index} className="flex items-center space-x-4 bg-gray-800/30 p-4 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              <span className="text-white w-32">{featureNames[index]}:</span>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={inputStrings[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  aria-label={`Enter value for ${featureNames[index]}`}
                  aria-describedby={`range-info-${index}`}
                  className="w-24 bg-gray-700 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span 
                  id={`range-info-${index}`}
                  className="text-gray-400 text-sm"
                >
                  Range: {featureRanges[index].min} - {featureRanges[index].max}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button 
          className={`px-4 py-2 rounded-md ${
            isLoading 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          onClick={handlePredict}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Get Prediction'}
        </button>

        {prediction !== null && (
          <div className={`text-white text-center text-2xl p-2 rounded-lg ${
            prediction === 0 ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {prediction === 0 
              ? "Congratulations! You don't have Alzheimer's" 
              : "According to the model you have Alzheimer's, so please consult your nearest doctor at the earliest."}
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictComponent;