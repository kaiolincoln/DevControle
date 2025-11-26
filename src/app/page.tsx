import Image from "next/image";
import heroImg from '../assets/hero.svg'

export default function Home() {
  return (
    <div>
      <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
        <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
        <h1 className="font-bold text-3xl mb-8 text-cyan-300 md:text-4xl">Atendimentos, clientes</h1>
        <Image
           src={heroImg}
           alt="Imagem hero do dev controle"
           width={600}
           className="max-w-sm md:max-w-xl"
        />
      </main>
    </div>
  );
}
