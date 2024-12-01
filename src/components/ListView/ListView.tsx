import ToggleHeader from "./components/ToggleHeader";
import NoContents from "../NoContents/NoContents";

interface ListViewProps {
  title: string;
  sortType?: SortType;
  setSortType?: React.Dispatch<React.SetStateAction<SortType>> | null;
  noContent: {
    title: string;
    subtitle: string;
  };
  children?: React.ReactNode;
}

type SortType = "byDate" | "byPopularity";

const ListView = ({
  title,
  sortType = "byDate",
  setSortType = null,
  noContent,
  children,
}: ListViewProps) => {
  return (
    <>
      <ToggleHeader
        title={title}
        sortType={sortType}
        setSortType={setSortType}
      />
      <div className="mb-32 flex w-full flex-wrap justify-start">
        {children || (
          <NoContents title={noContent.title} subtitle={noContent.subtitle} />
        )}
      </div>
    </>
  );
};

export default ListView;
