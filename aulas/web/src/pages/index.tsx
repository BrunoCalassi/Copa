import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import userAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;

}
export default function Home(props: HomeProps) {
  const [poolTitle,setPollTitle] = useState('')

  async function createPoll(event:FormEvent){
    event.preventDefault()
    try {
      const response = await api.post('/pools',{
        title:poolTitle, 
      });
      const{code}=response.data
      await navigator.clipboard.writeText(code)
      alert('testa o control v')
      setPollTitle('')
      
    } catch (error) {
      alert('falhou')
    }
    
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="logo" quality={100} />
        <h1 className="mt-14 text-green-700 text-5xl font-bold leading-tight">
          Criar o bolão
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatarExampleImg} alt="avatar" quality={100} />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
          </strong>
        </div>

        <form onSubmit={createPoll} className="mt-10 flex gap-2" action="">
          <input
            className="flex-1 px-6  py-4 rounded bg-gray-600 border border-gray-500 text-sm text-gray-100"
            type="text"
            required
            placeholder="Nome do bolão"
            onChange={event=>setPollTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-yellow-500  px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar o bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Texto de anotação
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap 6">
            <Image src={iconCheckImg} alt="icone" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Boloes criados</span>
            </div>
          </div>
          <div className=" w-px h-14 bg-green-900" />
          <div className="flex items-center gap 6">
            <Image src={iconCheckImg} alt="icone" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>chutes chutados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} alt="celular previa" quality={100} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse,usersCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count"),

  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: usersCountResponse.data.count,

    },
  };
};
