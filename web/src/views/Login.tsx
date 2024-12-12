import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatAPiService } from "../modules/chat.api.service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true)

  const navigate = useNavigate()

  const handleLogin = async () => {
    const apiReq = await ChatAPiService.login(username)

    console.log('resultado', apiReq)
    if(apiReq?.data?.email){
      const email = apiReq?.data?.email
      console.log(email)

      localStorage.setItem("user-chat", email)
      navigate("/")
    }
    // if (username === "user1@gmail.com" && password === "123456") {
    //   localStorage.setItem("user-chat", username);
    //   navigate("/")
    // }
    // if (username === "user2@gmail.com" && password === "123456") {
    //     localStorage.setItem("user-chat", username);
    //     navigate("/")
    //   }
  };


  const handleRegistar = async ()=> {
    const apiReq = await ChatAPiService.register({
      email: username,
      password: password
    })

    console.log('resultado', apiReq)
    if(apiReq?.data?.email){
      const email = apiReq?.data?.email
      console.log(email)

      localStorage.setItem("user-chat", email)
      navigate("/")
    }
  }

  return (
    <>
      <div className="border-[1px] rounded-md border-white p-16 flex flex-col gap-2 text-black">
        <label className="text-white">Email de usuário</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)}/>
        
        <label className="text-white">Senha</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button className="text-white border-[1px]  border-white rounded-md" onClick={handleLogin} >LOGIN</button>
        <button className="text-white border-[1px]  border-white rounded-md" onClick={handleRegistar} >REGISTRAR</button>
      </div>
    </>
  );
}
