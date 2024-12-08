import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import SubHeader from "../../components/Header/SubHeader";
import ListView from "../../components/ListView/ListView";
import { changeImgUrl } from "../../utils/changeImgUrl";
import axios from "axios";

import NailData from "../../types/NailData";
import { SortType } from "../../types/Sorttype";

import NailLikeCard from "../../components/NailCard/NailLikeCard";
import { getAllDesign } from "../../hooks/api/getAllDesign";

const SelectNail = () => {
  const [nailData, setNailData] = useState([] as NailData[]);
  const [sortType, setSortType] = useState<SortType>("byDate");
  const [currentData, setCurrentData] = useState<NailData[] | null>(null);

  useEffect(() => {
    if (nailData) {
      setCurrentData(() => {
        if (sortType === "byDate") return nailData;
        else
          return [...nailData].sort(
            (a: NailData, b: NailData) => b.like_count - a.like_count,
          );
      });
    }
  }, [nailData, sortType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllDesign();
        if (res === null) return;

        setNailData(res.filter((nail) => nail.is_active));
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <SubHeader title="네일아트 선택" />
      <div className="flex w-full flex-row justify-start px-4 py-2">
        <span className="medium-13">
          아래 네일아트 중에서
          <br />
          원하는 네일아트를 골라주세요.
        </span>
      </div>
      <ListView
        title="AI 피팅 이용 가능 네일아트"
        sortType={sortType}
        setSortType={setSortType}
        noContent={{
          title: "현재 이용 가능한 네일아트가 없어요.",
          subtitle: "다음에 다시 시도해주세요.",
        }}
      >
        {currentData
          ? currentData.map(({ design_key, design_url }) => (
              <NailLikeCard key={design_key} id={design_key} img={design_url} />
            ))
          : null}
      </ListView>
    </Layout>
  );
};

export default SelectNail;
