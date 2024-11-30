import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stateUser } from "../../stores/stateUser";

const useUserTypeByRoute = () => {
  const location = useLocation();
  const user = useRecoilState(stateUser);
  const setUser = useSetRecoilState(stateUser);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      console.log(1);
      setUser({ userType: "shop", userId: import.meta.env.VITE_API_USER_ID });
    } else {
      if (user[0].userType === "shop") {
        setUser({
          userType: "customer",
          userId: import.meta.env.VITE_API_USER_ID,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setUser]);
};

export default useUserTypeByRoute;
