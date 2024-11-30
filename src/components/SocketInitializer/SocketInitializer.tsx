import { useRecoilValue } from "recoil";
import { socketSelector } from "./../../stores/stateSocket";
import useUserTypeByRoute from "../../hooks/socket/useUserTypeByRoute";

const SocketInitializer = () => {
  useUserTypeByRoute();
  useRecoilValue(socketSelector);
  return null;
};

export default SocketInitializer;
