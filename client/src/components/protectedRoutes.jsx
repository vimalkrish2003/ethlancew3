import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authUserContext";
export default function ProtectedRoute({ children }) {
  const user=useAuth();
  const navigate=useNavigate();
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/',{replace:true});
    }
  },[user.isAuthenticated,navigate]);
  return children;
    
}