import { Social } from "../../components/Social/Social";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [social, setSocial] = useState<SocialProps>();
  const navigate = useNavigate();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocial() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocial({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    loadSocial();
  }, []);

  async function handleLogin() {
    navigate("/admin");
  }

  return (
    <div>
      <header className="relative w-full h-12 flex items-center">
        <button
          onClick={handleLogin}
          className="absolute right-3 w-auto h-12 flex items-center"
        >
          <BiLogIn size={28} color="white" />
        </button>
      </header>

      <div className="flex flex-col w-full py-4 items-center justify-center">
        <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
          Alanzoka
        </h1>
        <span className="text-white mb-6 mt-6">
          👇🏼 Links{" "}
          <span
            className="flipped-emoji"
            style={{ display: "inline-block", transform: "scaleX(-1)" }}
          >
            👇🏼
          </span>
        </span>

        <main className="flex flex-col w-11/12 max-w-xl text-center">
          {links.map((Link) => (
            <section
              key={Link.id}
              style={{ backgroundColor: Link.bg }}
              className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
            >
              <a href={Link.url} target="_blank">
                <p
                  className="text-base md:text-lg"
                  style={{ color: Link.color }}
                >
                  {Link.name}
                </p>
              </a>
            </section>
          ))}

          {social && Object.keys(social).length > 0 && (
            <footer className="flex justify-center gap-4 my-4">
              <Social url={social?.facebook}>
                <FaFacebook size={35} color="white" />
              </Social>
              <Social url={social?.youtube}>
                <FaYoutube size={35} color="white" />
              </Social>
              <Social url={social?.instagram}>
                <FaInstagram size={35} color="white" />
              </Social>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}
