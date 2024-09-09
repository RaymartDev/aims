import { useAppSelector } from "@/store/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfNotAuth = (redirectPath: string) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate(`${redirectPath}`);
    }
  }, [user.isLoggedIn, navigate, redirectPath])
}

export default useRedirectIfNotAuth;