import { useEffect, useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePassword();
  }, []);
  //   useEffect(() => {
  //     generatePassword();
  //   }, [copied]);

  const generatePassword = () => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allChars = lowerCaseChars + upperCaseChars;
    if (includeNumbers) {
      allChars += numberChars;
    }
    if (includeSymbols) {
      allChars += symbolChars;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      newPassword += allChars[randomIndex];
    }
    setCopied(false);
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        setCopied(true); // Set the copied state to true after copying
      },
      () => {
        alert("Failed to copy!");
      }
    );
  };
  return (
    <div className="h-[100vh]  w-full flex items-center justify-center">
      <div className=" max-w-7xl rounded-md p-5   mx-auto text-[#bb6730]  md:w-1/3 bg-[#1d2532] ">
        <h1 className="text-center text-2xl font-semibold pb-5">
          Password Generator
        </h1>
        <div className="flex ">
          <input
            className="flex h-10 w-full rounded-l-md border border-black/30 bg-transparent px-3 font-medium py-2 text-sm bg-white placeholder:text-[#bb6730] focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            value={password}
            readOnly
          ></input>
          <button
            onClick={copyToClipboard}
            className="bg-[#1948db] rounded-r-md py-2 px-4  text-white"
          >
            {!copied ? " Copy" : "Copied!"}
          </button>
        </div>
        <button
          onClick={generatePassword}
          className="mt-4 bg-[#1948db] w-full rounded-md py-2 px-4  text-white "
        >
          {" "}
          Password Generator
        </button>
        <div className="flex mt-4  gap-2">
          <div className="flex items-center gap-1  font-medium">
            <input
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="10"
              max="20"
              className=" leading-tight"
              type="range"
            />
            <span className="text-sm">length ({length})</span>
          </div>
          <div className="flex items-center  gap-1  font-medium">
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className=" leading-tight"
              type="checkbox"
            />
            <span className="text-sm">Characters</span>
          </div>
          <div className="flex items-center  gap-1 font-medium">
            <input
              className="text-sm"
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span>Numbers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
