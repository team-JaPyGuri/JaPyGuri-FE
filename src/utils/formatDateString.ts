interface formatDateProps {
  date: Date;
  type: "full" | "short" | "none";
}

export const formatDateString = ({ date, type = "none" }: formatDateProps) => {
  const yy = String(date.getFullYear());
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  switch (type) {
    case "full":
      return `${yy}년 ${mm}월 ${dd}일 ${hh}시 ${min}분`;
    case "short":
      return `${yy}.${mm}.${dd}`;
    default:
      return `${yy}/${mm}/${dd} ${hh}:${min}`;
  }
};
