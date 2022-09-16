import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient rounded-lg overflow-hidden mt-8 w-full flex">
      <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center w-full">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        {/* O TRIGGER SERIA O BOTAO QUE DISPARA O MODAL */}
        <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex item-center gap-2">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
