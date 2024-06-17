import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { db } from "../../services/firebaseConnection";
import { doc, setDoc, getDoc } from "firebase/firestore";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data()?.facebook);
            setInstagram(snapshot.data()?.instagram);
            setYoutube(snapshot.data()?.youtube);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("CADASTRADOS COM SUCESSO");
      })
      .catch((error) => {
        console.error("ERRO AO SALVAR" + error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white font-medium text-2xl mt-10 mb-4">
        Minhas Redes Sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium my-2">Link do Facebook</label>
        <Input
          type="url"
          placeholder="https://www.facebook.com/perfil"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="text-white font-medium my-2">Link do Instagram</label>
        <Input
          type="url"
          placeholder="https://www.instagram.com/perfil"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium my-2">Link do Youtube</label>
        <Input
          type="url"
          placeholder="https://www.youtube.com/perfil"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mt-5 mb-7 font-medium"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
