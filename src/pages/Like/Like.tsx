import { useState, useEffect } from "react";
import { getLikeList } from "../../hooks/api/getLikeList";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import NailSnapCard from "../../components/NailCard/NailSnapCard";
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import NailData from "../../types/NailData";
import { SortType } from "../../types/Sorttype";

const Like = () => {
  const [nailData, setNailData] = useState<NailData[] | null>(null);
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
        if (res !== null && res !== undefined) setNailData(res);
      } catch (err) {
        console.error("Error fetching like list:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Header subTitle="좋아요" />
      <ListView
        title="내가 좋아요한 네일아트"
        sortType={sortType}
        setSortType={setSortType}
        noContent={{
          title: "아직 좋아요한 네일아트가 없어요.",
          subtitle: "'홈 화면'에서 좋아하는 네일아트를 찾아보세요.",
        }}
      >
        {currentData
          ? currentData.map(
              ({
                design_key,
                design_url,
                like_active,
                is_active,
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
            )
          : null}
      </ListView>
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default Like;
