import { useEffect, useState } from "react";
import ToggleHeader from "./components/ToggleHeader";
import NailSnapCard from "../NailCard/NailSnapCard";
import NoContents from "../NoContents/NoContents";

interface ListViewProps {
  title: string;
  sort?: boolean;
  noContent: {
    title: string;
    subtitle: string;
  };
  data: Array<{
    design_key: string;
    design_url: string;
    is_active: boolean;
    price: string;
    like_count: number;
  }> | null;
}

type SortType = "byDate" | "byPopularity";

const ListView = ({ title, noContent, data, sort = false }: ListViewProps) => {
  const [sortType, setSortType] = useState<SortType>("byDate");
  const [showData, setShowData] = useState(data);

  useEffect(() => {
    if (data) {
      setShowData((prevData) => {
        if (sortType === "byDate") prevData = data;
        else prevData?.sort((a, b) => b.like_count - a.like_count);
        return prevData;
      });
    }
  }, [data, sortType]);

  return (
    <>
      <ToggleHeader
        title={title}
        sort={sort}
        sortType={sortType}
        setSortType={setSortType}
      />
      <div className="mb-32 flex w-full flex-wrap justify-start">
        {showData?.length ? (
          showData.map(
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
          )
        ) : (
          <NoContents title={noContent.title} subtitle={noContent.subtitle} />
        )}
      </div>
    </>
  );
};

export default ListView;
