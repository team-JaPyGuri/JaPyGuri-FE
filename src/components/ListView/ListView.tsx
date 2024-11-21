import { useState } from "react";
import ToggleHeader from "./components/ToggleHeader";
import NailSnapCard from "../NailCard/NailSnapCard";

interface ListViewProps {
  title: string;
  data: Array<{ id: number; img: string; tags: string[]; like: number }>;
}

type SortType = "byDate" | "byPopularity";

const ListView = ({ title, data }: ListViewProps) => {
  const [sortType, setSortType] = useState<SortType>("byDate");

  return (
    <>
      <ToggleHeader
        title={title}
        sortType={sortType}
        setSortType={setSortType}
      />
      <div className="mb-32 flex w-full flex-wrap justify-start">
        {data &&
          data.map(({ id, img, tags, like }) => (
            <NailSnapCard key={id} img={img} tags={tags} like={like} />
          ))}
      </div>
    </>
  );
};

export default ListView;
