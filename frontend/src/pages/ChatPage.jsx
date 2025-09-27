import React from 'react'
import {useAuthStore} from "../store/useAuthStore";

function ChatPage() {
  const { authUser, isLoggedIn, login } = useAuthStore();
  console.log("authUser in App.jsx: ", authUser, isLoggedIn);
  console.log("Calling login from App.jsx", login());
  return (

    <div>ChatPage</div>
  )
}

export default ChatPage