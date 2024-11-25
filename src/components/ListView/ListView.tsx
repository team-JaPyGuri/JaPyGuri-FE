import { useState } from "react";
import ToggleHeader from "./components/ToggleHeader";
import NailSnapCard from "../NailCard/NailSnapCard";

interface ListViewProps {
  title: string;
  data: Array<{
    design_key: string;
    design_url: string;
    is_active: boolean;
    price: string;
    like_count: number;
  }> | null;
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
          data.map(
            ({ design_key, design_url, is_active, price, like_count }) => (
              <NailSnapCard
                key={design_key}
                id={design_key}
                img={design_url}
                likeDefault={is_active}
                price={price}
                like={like_count}
              />
            ),
          )}
      </div>
    </>
  );
};

export default ListView;
