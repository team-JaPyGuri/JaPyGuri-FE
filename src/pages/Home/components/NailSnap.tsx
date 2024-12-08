import NailSnapCard from "../../../components/NailCard/NailSnapCard";
interface NailSnapProps {
  data: Array<{
    design_key: string;
    design_url: string;
    is_active: boolean;
    like_active: boolean;
    price: string;
    like_count: number;
  }> | null;
}

const NailSnap = ({ data }: NailSnapProps) => {
  return (
    <div className="mb-32 flex w-full flex-wrap justify-start">
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
            <NailSnapCard
              key={design_key}
              id={design_key}
              img={design_url}
              likeDefault={like_active}
              aiFitActive={is_active}
              price={price}
              like={like_count}
            />
          ),
        )}
    </div>
  );
};

export default NailSnap;
