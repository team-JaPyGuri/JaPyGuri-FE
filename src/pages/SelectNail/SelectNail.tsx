import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import SubHeader from "../../components/Header/SubHeader";
import ListView from "../../components/ListView/ListView";

import NailData from "../../types/NailData";
import { SortType } from "../../types/Sorttype";

import { getLikeList } from "../../hooks/api/getLikeList";
import NailLikeCard from "../../components/NailCard/NailLikeCard";

const SelectNail = () => {
  const [nailData, setNailData] = useState([]);
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
        const res = await getLikeList();
        setNailData(res);
      } catch (err) {
        console.error("Error fetching like list:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <SubHeader title="네일아트 선택" />
      <div className="flex w-full flex-row justify-start px-4 py-2">
        <span className="medium-13">
          좋아요 표시한 네일아트 중에서
          <br />
          원하는 네일아트를 골라주세요.
        </span>
      </div>
      <ListView
        title="내가 좋아요한 네일아트"
        sortType={sortType}
        setSortType={setSortType}
        noContent={{
          title: "아직 생성된 AI 피팅이 없어요.",
          subtitle: "하단 ‘시작하기’ 버튼을 눌러 체험해보세요.",
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
