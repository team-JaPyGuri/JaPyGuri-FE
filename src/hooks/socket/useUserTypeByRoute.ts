import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateUser } from "../../stores/stateUser";

const useUserTypeByRoute = () => {
  const location = useLocation();
  const user = useRecoilValue(stateUser);
  const setUser = useSetRecoilState(stateUser);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setUser({ userType: "shop", userId: import.meta.env.VITE_API_SHOP_ID });
    } else {
      if (user === null || user.userType === "shop") {
        setUser({
          userType: "customer",
          userId: import.meta.env.VITE_API_USER_ID,
        });
        console.log(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setUser]);
};

export default useUserTypeByRoute;
