import { NavLink } from "react-router-dom";
import { auth, db } from "../firebase/firebase_auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import pokeheader from "../assets/pokeball_header.png";
import favoritesnav from "../assets/favorites_nav.png";
import home from "../assets/home_nav.png";
import cards from "../assets/cards_nav.png";
import "../styles/login_btn.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useDetails from "../hooks/useDetails";
import { setUserDetails } from "../redux/userSlice";
import Swal from "sweetalert2";

function logout() {
  signOut(auth)
    .then(() => {
      Swal.fire("Successfully Logged Out!");
      setTimeout(() => window.location.reload(), 1000);
    })
    .catch((error) => {
      alert(error);
    });
}
async function login() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const docRef = doc(db, "Users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return setDoc(doc(db, "Users", user?.uid), {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          favorites: [],
        })
          .then((log) => log)
          .catch((err) => err);
      }
      Swal.fire("Successfully Logged In!");
      setTimeout(() => window.location.reload(), 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
}

function Nav() {
  const dispatch = useDispatch();
  const { name, photo } = useDetails();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user?.uid);
        const data = (await getDoc(docRef)).data();
        dispatch(
          setUserDetails({
            name: data?.name,
            photo: data?.photo,
            favorites: data?.favorites,
            id: user?.uid,
          })
        );
      } else {
        dispatch(
          setUserDetails({
            name: null,
            photo: null,
            favorites: [],
            id: null,
          })
        );
      }
    });
  }, []);

  return (
    <nav className="flex h-max z-50 w-full justify-between items-center md:px-40 text-white font-bold fixed top-0 p-3">
      <div className="flex gap-1 justify-center items-center mix-blend-difference">
        <img className="w-12" src={pokeheader} alt="poke-header" />
        <h1 className="text-[#F15B6C] text-3xl">Pokédex</h1>
      </div>
      <ul className="flex bg-[#222222] px-5 py-3 gap-5 rounded-xl border border-[#222222]">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/"
          >
            <img
              src={home}
              alt="pokeball"
              loading="lazy"
              className="w-8 hover:scale-125 transition-all"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/library"
          >
            <img
              src={cards}
              alt="cards"
              loading="lazy"
              className="w-8 hover:scale-125 transition-all"
            />
          </NavLink>
        </li>
        {name && (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/favorites"
            >
              <img
                src={favoritesnav}
                alt="favorites"
                loading="lazy"
                className="w-8 hover:scale-125 transition-all"
              />
            </NavLink>
          </li>
        )}
      </ul>
      {name ? (
        <div className="flex justify-center items-center">
          <div className="buttons">
            <button className="btn" onClick={logout}>
              <span></span>
              <p
                data-start="good luck!"
                data-text="Quit"
                data-title="Sign Out"
              ></p>
            </button>
          </div>
          <img
            src={photo}
            alt="profile-pic"
            className="rounded-full mr-2"
            width={50}
          />
          <h1 className="text-white">{name}</h1>
        </div>
      ) : (
        <div className="buttons">
          <button className="btn" onClick={login}>
            <span></span>
            <p
              data-start="good luck!"
              data-text="Catch ém"
              data-title="Sign In"
            ></p>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
