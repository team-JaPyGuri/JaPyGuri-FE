interface ShopInfoProps {
  shopName: string;
  shopAdress: string;
  img: string;
}

const ShopInfo = ({ shopName, shopAdress, img }: ShopInfoProps) => {
  return (
    <div className="absolute left-0 top-0 z-10 flex w-full flex-row items-center justify-between gap-3 bg-grayscale-100 px-4 py-3">
      <div className="flex flex-col items-start justify-between py-1">
        <span className="semibold-16 text-grayscale-900">{shopName}</span>
        <span className="regular-13 text-grayscale-600">{shopAdress}</span>
        <span className="semibold-13 text-yellow">★ 별점 미제공</span>
      </div>
      <img
        src={img}
        alt="shop"
        className="aspect-square w-20 rounded-[4px] object-cover object-center"
      />
    </div>
  );
};

export default ShopInfo;
