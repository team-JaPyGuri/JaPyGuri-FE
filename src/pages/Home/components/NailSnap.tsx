import NailSnapCard from "../../../components/NailCard/NailSnapCard";

interface NailSnapProps {
  data: Array<{ id: number; img: string; tags: string[]; like: number }>;
}

const NailSnap = ({ data }: NailSnapProps) => {
  return (
    <div className="mb-32 flex w-full flex-wrap justify-start">
      {data &&
        data.map(({ id, img, tags, like }) => (
          <NailSnapCard key={id} img={img} tags={tags} like={like} />
        ))}
    </div>
  );
};

export default NailSnap;
