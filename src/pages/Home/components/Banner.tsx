import BannerImage from "../../../assets/webp/banner.webp";

const Banner = () => {
  return (
    <div className="relative h-56 w-full overflow-hidden bg-grayscale-500">
      <img
        src={BannerImage}
        alt="Banner"
        loading="lazy"
        className="h-full w-full object-cover object-center"
      />
      <span className="semibold-20 absolute left-9 top-20 text-gray-100">
        오늘 고른 네일,
        <br />
        예약은 바로 내일로.
      </span>
      <span className="semibold-13 absolute bottom-4 right-8 text-grayscale-400">
        1 / 1 &gt;
      </span>
    </div>
  );
};

export default Banner;
