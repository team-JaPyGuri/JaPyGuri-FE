import NailInfoCard from "../../../components/NailCard/NailInfoCard";

interface HotNailListProps {
  data: Array<{ id: number; img: string; tags: string[]; like: number }> | null;
}

const HotNailList = ({ data }: HotNailListProps) => {
  return (
    <div className="flex w-full flex-row justify-start overflow-x-scroll scrollbar-hide">
      {data &&
        data.map(({ id, img, tags, like }) => (
          <NailInfoCard
            key={id}
            img={img}
            tags={tags}
            likes={like}
            rowScroll={true}
          />
        ))}
    </div>
  );
};

export default HotNailList;
