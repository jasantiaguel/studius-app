import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GroupCard from "@/components/GroupCard";
import Banner from "@/components/Banner";
import styles from "@/styles/Home.module.css";
import Tag from "@/components/Tag";
import Image from "next/image";
import { groups, schedGroups } from "@/data/groups.js";
import HeadArea from "@/components/HeadArea";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const data = groups;
  const schedData = schedGroups;
  const [selectedTags, setSelectedTags] = useState([]);

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const offset = x - startX;
      slider.scrollLeft = scrollLeft - offset;
    });
  }, []);

  function filter(groups) {
    if (selectedTags.length === 0) {
      return groups;
    } else {
      return groups.filter((group) =>
        group.tags.some((tag) => selectedTags.includes(tag))
      );
    }
  }

  return (
    <div className="frame">
      <div className={styles.bgImage}>
        <Image
          src="/images/topographic/graphic.topo4.svg"
          width={755}
          height={1095}
          className={styles.bgTopo}
        />
      </div>
      <HeadArea />
      <main className={styles.main}>
        <Header name="Home" />
        <section className={styles.homeWelcomeSection}>
          <div
            style={{
              backgroundColor: "gray",
              backgroundImage: "url('/images/greeting.profile-photo.png')",
              width: "40px",
              height: "40px",
              borderRadius: "40px",
              marginRight: "16px",
            }}
          ></div>
          <div className={styles.welcomeMessage}>
            <h1 style={{ margin: "0" }}>Good Morning Alira!</h1>
            <p style={{ fontSize: "var(--body-copy)" }}>
              Keep at it! You're doing amazing.
            </p>
          </div>
        </section>
        <Banner
          title3="Discover Your Perfect Study Method"
          title1="Take Our Short Quiz"
          buttonSpace="164px"
          buttonText="StudiUs Quiz"
          path="/quiz/home"
          bgImage="/images/home.banner-bg.png"
        />
        <section className={styles.filterSection}>
          <section className={styles.filterSectionScroll} ref={sliderRef}>
            <Tag
              tabIndex={2}
              text="Outgoing"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Tag
              tabIndex={2}
              text="Music"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Tag
              tabIndex={2}
              text="Coding"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Tag
              tabIndex={2}
              text="Coffee"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Tag
              tabIndex={2}
              text="Food"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Tag
              tabIndex={2}
              text="Anime"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Tag
              tabIndex={2}
              text="Pizza"
              type="homeFilter"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </section>
        </section>
        <h2 style={{ margin: "32px 0 16px" }}>Today</h2>
        {filter(data).map((group) => {
          return (
            <GroupCard group={group} selectedTags={selectedTags} tabIndex={3} />
          );
        })}
        <h2 style={{ margin: "8px 0 16px" }}>Upcoming</h2>
        {filter(schedData).map((schedGroup) => {
          return (
            <GroupCard
              group={schedGroup}
              selectedTags={selectedTags}
              tabIndex={3}
            />
          );
        })}
        {/* This is a filler section to make the bottom of page not cut off */}
        <section className={styles.bottomFiller} style={{ margin: "40px 0" }}>
          <p> </p>
        </section>
        <Footer />
      </main>
    </div>
  );
}
