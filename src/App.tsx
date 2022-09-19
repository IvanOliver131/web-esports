import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import axios from "axios";

import "./styles/global.css";

import logoImg from "./assets/logo-nlw-esports.svg";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner.tsx";
import { CreateAdModal } from "./components/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo-nlw-esports" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-6">
        {games.map((game: Game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCounter={game._count.ads}
            />
          );
        })}
      </div>

      {/* DENTRO DO BANNER ESTA O COMPONENTE QUE DISPARA O MODAL */}
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
