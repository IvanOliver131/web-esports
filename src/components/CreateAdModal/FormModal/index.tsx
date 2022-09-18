import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CaretDown, Check, GameController } from "phosphor-react";
import { InputForm } from "./InputForm";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function FormModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>(["0"]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // criar uma validação decente
    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      // usar o react toast
      alert("Anúncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar o anúncio");
    }
  }

  return (
    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">
          Qual o game?
        </label>
        <Select.Root name="game">
          <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 flex justify-between items-center ">
            <Select.Value placeholder="Selecione o game que deseja jogar" />
            <Select.Icon>
              <CaretDown size={20} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="bg-zinc-900 text-zinc-500 rounded-md overflow-hidden border border-slate-500">
              <Select.ScrollUpButton />
              <Select.Viewport className="p-1">
                <Select.Group className="p-3">
                  {games.map((game: Game) => {
                    return (
                      <div key={game.id}>
                        <Select.Item
                          value={game.id}
                          className="hover:cursor-pointer hover:bg-zinc-700 rounded p-1"
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      </div>
                    );
                  })}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name">Seu nome (ou nickname)</label>
        <InputForm
          name="name"
          id="name"
          placeholder="Como te chamam dentro do game?"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
          <InputForm
            name="yearsPlaying"
            id="yearsPlaying"
            type="number"
            placeholder="Tudo bem ser ZERO"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Qual seu discord?</label>
          <InputForm name="discord" id="discord " placeholder="Usuário#0000" />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays">Quando costuma jogar?</label>

          <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-1"
            value={weekDays}
            onValueChange={setWeekDays}
          >
            <ToggleGroup.Item
              value="0"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Domingo"
            >
              D
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="1"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Segunda"
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="2"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Terça"
            >
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="3"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Quarta"
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="4"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Quinta"
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="5"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Sexta"
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="6"
              className={`w-8 h-8 rounded  ${
                weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
              }`}
              title="Sábado"
            >
              S
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart">Qual horário do dia?</label>
          <div className="grid grid-cols-2 gap-2">
            <InputForm
              name="hourStart"
              id="hourStart"
              type="time"
              placeholder="De"
            />
            <InputForm
              name="hourEnd"
              id="hourEnd"
              type="time"
              placeholder="Até"
            />
          </div>
        </div>
      </div>

      <label className="mt-2 flex gap-2 text-sm items-center">
        <Checkbox.Root
          checked={useVoiceChannel}
          onCheckedChange={(checked) => {
            if (checked === true) {
              setUseVoiceChannel(true);
            } else {
              setUseVoiceChannel(false);
            }
          }}
          className="w-6 h-6 p-1 rounded bg-zinc-900"
        >
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400 " />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </label>

      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
        >
          Cancelar
        </Dialog.Close>
        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
        >
          <GameController size={24} />
          Encontrar Duo
        </button>
      </footer>
    </form>
  );
}
