import "./styles/global.css";

import logoImg from "./assets/logo-nlw-esports.svg";

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="logo-nlw-esports" />
    </div>
  );
}

export default App;
