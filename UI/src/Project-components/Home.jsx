import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  console.log("HOIME!")
  useEffect(() => {
    console.log("HOIME!22")

    //redirect
    navigate("/dashboard/catalog", { replace: true });
  }, []);
  return <div>HOME!</div>;
}
