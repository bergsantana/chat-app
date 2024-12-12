import { createHashRouter } from "react-router-dom";
import App from "../App";
import Chat from "../views/Chat";
import Login from "../views/Login";


const router = createHashRouter([
    {
        path: "",
        element: <App />,
        children: [
          {
            path: "",
            element: <Chat />,
          },
       
 
        ],
      },
    {
        path: "/login",
        element: <Login />

    }
])

export default router;
