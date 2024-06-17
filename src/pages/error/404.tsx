import { Link } from "react-router-dom";

export function Error404() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className="font-bold text-6xl mb-4">Erro 404</h1>
      <h1 className="font-bold text-4xl mb-8">Página não encontrada</h1>
      <Link className="bg-gray-50/25 py-1 px-4 rounded-md" to="/">
        Voltar para a Home
      </Link>
    </div>
  );
}
