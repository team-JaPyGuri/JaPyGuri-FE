import Layout from "../../components/Layout/Layout";
import SubHeader from "../../components/Header/SubHeader";
import ListView from "../../components/ListView/ListView";

import { useState, useEffect } from "react";
import { getLikeList } from "../../hooks/api/getLikeList";

const SelectNail = () => {
  const [nailData, setNailData] = useState([]);

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
        sort={true}
        noContent={{
          title: "아직 생성된 AI 피팅이 없어요.",
          subtitle: "하단 ‘시작하기’ 버튼을 눌러 체험해보세요.",
        }}
        data={nailData}
      />
    </Layout>
  );
};

export default SelectNail;
