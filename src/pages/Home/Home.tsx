import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { getLikeList } from "../../api/getLikeList";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import Banner from "./components/Banner";
import HotNailList from "./components/HotNailList";
import NailSnap from "./components/NailSnap";
import SubTitle from "./components/SubTitle";

interface NailData {
  design_key: string;
  design_url: string;
  is_active: boolean;
  price: string;
  like_count: number;
}

const Home = () => {
  const [hotNailList, setHotNailList] = useState<NailData[]>([]);
  const [nailSnapList, setNailSnapList] = useState<NailData[]>([]);
  const [nailLikeList, setNailLikeList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNailLikeList = async () => {
      try {
        const res = await getLikeList();
        const likedKeys = res.map((item: NailData) => item.design_key);
        setNailLikeList(likedKeys);
      } catch (err) {
        console.error("Error fetching like list:", err);
      }
    };

    fetchNailLikeList();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchHotNailList = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_NAILO_API_URL}/api/home/`,
          {
            headers: {
              "X-User-Type": "customer",
              "X-User-Id": "test_jpgr",
            },
            params: { type: "random" },
          },
        );
        const updatedList = res.data.map((item: NailData) => ({
          ...item,
          is_active: nailLikeList.includes(item.design_key),
        }));
        setHotNailList(updatedList);
      } catch (err) {
        console.error("Hot Nail List API Error:", err);
      }
    };

    fetchHotNailList();
  }, [nailLikeList]);

  useEffect(() => {
    setNailSnapList((prevList) =>
      prevList.map((item) => ({
        ...item,
        is_active: nailLikeList.includes(item.design_key),
      })),
    );
  }, [nailLikeList]);

  const loadNailSnapList = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_NAILO_API_URL}/api/home/`,
        {
          params: { type: "all", page },
        },
      );
      if (res.data.results.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedList = res.data.results.map((item: NailData) => ({
        ...item,
        is_active: nailLikeList.includes(item.design_key),
      }));

      setNailSnapList((prevList) => [...prevList, ...updatedList]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setHasMore(false);
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, nailLikeList]);

  useEffect(() => {
    const currentObserverTarget = observerRef.current;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        loadNailSnapList();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 1.0,
    });

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [loadNailSnapList, isLoading, hasMore]);

  return (
    <Layout>
      <Header />
      <Banner />
      <SubTitle title="HOT 인기 네일아트" className="mt-6" />
      <HotNailList data={hotNailList} />
      <SubTitle title="네일아트 스냅" className="mt-6" />
      <NailSnap data={nailSnapList} />
      <div ref={observerRef} className="h-1 w-full" />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default Home;
