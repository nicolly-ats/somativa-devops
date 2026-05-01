import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate("/");
        return;
      }

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchData();
  }, []);

  const sair = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Principal</h1>

        {userData && (
          <>
            <p>Nome: {userData.nome}</p>
            <p>Sobrenome: {userData.sobrenome}</p>
            <p>Nascimento: {userData.nascimento}</p>
          </>
        )}

        <button className="btn-danger" onClick={sair}>
          Sair
        </button>
      </div>
    </div>
  );
}