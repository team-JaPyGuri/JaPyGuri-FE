import NoImageWebp from "../assets/webp/noImage.webp";

export const onErrorImg = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  e.currentTarget.src = NoImageWebp;
};
