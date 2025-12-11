import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/food", {
        withCredentials: true,
      });
      const items = response?.data?.foodItems ?? [];
      if (Array.isArray(items) && items.length > 0) {
        setVideos(items);
        setIsDemo(false);
      } else {
        // fallback to demo content so users see the UI and can interact
        setVideos(demoVideos);
        setIsDemo(true);
      }
    } catch (err) {
      // network/server error -> show demo content and let user retry
      console.error("Failed to fetch videos", err);
      setVideos(demoVideos);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  async function likeVideo(item) {
    // optimistic UI updates for demo items (no backend)
    if (isDemo) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
        )
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );
      if (response.data.like) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
          )
        );
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, likeCount: Math.max(0, (v.likeCount || 1) - 1) }
              : v
          )
        );
      }
    } catch (err) {
      console.error("Like request failed", err);
    }
  }

  async function saveVideo(item) {
    if (isDemo) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v
        )
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );
      if (response.data.save) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: (v.savesCount || 0) + 1 }
              : v
          )
        );
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: Math.max(0, (v.savesCount || 1) - 1) }
              : v
          )
        );
      }
    } catch (err) {
      console.error("Save request failed", err);
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage={loading ? "Loading videos..." : "No videos available."}
      onRetry={fetchVideos}
      isDemo={isDemo}
    />
  );
};

export default Home;
