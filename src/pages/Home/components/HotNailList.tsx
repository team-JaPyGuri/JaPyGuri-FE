import NailInfoCard from "../../../components/NailCard/NailInfoCard";

interface HotNailListProps {
  data: Array<{
    design_key: string;
    design_url: string;
    is_active: boolean;
    like_active: boolean;
    price: number;
    like_count: number;
  }> | null;
}

const HotNailList = ({ data }: HotNailListProps) => {
  return (
    <div className="flex w-full flex-row justify-start overflow-x-scroll scrollbar-hide">
      {data &&
        data.map(
          ({
            design_key,
            design_url,
            is_active,
            like_active,
            price,
            like_count,
          }) => (
            <NailInfoCard
              key={design_key}
              id={design_key}
              img={design_url}
              likeDefault={like_active}
              aiFitActive={is_active}
              price={price}
              like={like_count}
              rowScroll={true}
            />
          ),
        )}
    </div>
  );
};

export default HotNailList;
