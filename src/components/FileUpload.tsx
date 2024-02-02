import { ChangeEvent } from "react";

interface Props {
  setResult: React.Dispatch<React.SetStateAction<string>>;
}

const FileUpload = ({ setResult }: Props) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const fileContent = event.target?.result;
      setResult(fileContent as string);
    };

    fileReader.readAsText(event.target.files![0]);
  };

  return <input type="file" onChange={changeHandler} />;
};

export default FileUpload;
