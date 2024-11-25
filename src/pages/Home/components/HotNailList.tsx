import NailInfoCard from "../../../components/NailCard/NailInfoCard";

interface HotNailListProps {
  data: Array<{
    design_key: string;
    design_url: string;
    is_active: boolean;
    price: string;
    like_count: number;
  }> | null;
}

const HotNailList = ({ data }: HotNailListProps) => {
  return (
    <div className="flex w-full flex-row justify-start overflow-x-scroll scrollbar-hide">
      {data &&
        data.map(({ design_key, design_url, is_active, price, like_count }) => (
          <NailInfoCard
            key={design_key}
            id={design_key}
            img={design_url}
            likeDefault={is_active}
            price={price}
            like={like_count}
            rowScroll={true}
          />
        ))}
    </div>
  );
};

export default HotNailList;
