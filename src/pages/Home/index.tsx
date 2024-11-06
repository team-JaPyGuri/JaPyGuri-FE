import { useRecoilState } from "recoil";
import { stateCouonter } from "../../stores/stateCounter";

const Home = () => {
  const [count, setCount] = useRecoilState(stateCouonter);

  return (
    <div>
      <h1 className="text-red">This is the Home page</h1>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </div>
  );
};

export default Home;
