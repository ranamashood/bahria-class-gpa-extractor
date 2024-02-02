import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState<string>("");

  return (
    <div>
      <FileUpload setResult={setResult} />
      {result && <Result result={result} setResult={setResult} />}
    </div>
  );
}

export default App;
