const PATH_REGEXP = /^\/(?!\/).*$/;

export const changeImgUrl = (prevUrl: string) => {
  if (PATH_REGEXP.test(prevUrl))
    return `${import.meta.env.VITE_NAILO_API_URL}${prevUrl}`;
  else return prevUrl;
};
