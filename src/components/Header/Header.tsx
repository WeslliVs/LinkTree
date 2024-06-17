import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function Header() {
  async function handleLogout() {
    signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-4">
        <div className="flex gap-5 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/social">Redes Sociais</Link>
        </div>
        <button onClick={handleLogout}>
          <BiLogOut size={28} color="#eb2629" />
        </button>
      </nav>
    </header>
  );
}
