import React, { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiMenu,
  FiDownload,
  FiSearch,
  FiChevronDown,
  FiVideo,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { BsTranslate } from "react-icons/bs";
import BrideIcon from "../assets/icons/bride.png";
import GroomIcon from "../assets/icons/groom.png";
import RegistryIcon from "../assets/icons/registry.png";
import PreWeddingIcon from "../assets/icons/prewedding.png";
import TurmericIcon from "../assets/icons/turmeric.png";
import WeddingIcon from "../assets/icons/wedding.png";
import PostWeddingIcon from "../assets/icons/postwedding.png";

const translations = {
  en: {
    photo: "Photo",
    video: "Video",
    photos: "Photos",
    videos: "Videos",
    search: "Search",
    registry: "Registry",
    pre_wedding_feast: "Pre-wedding Feast",
    turmeric_ceremony: "Turmeric Ceremony",
    wedding: "Wedding",
    post_wedding_feast: "Post-wedding Feast",
    download: "Download",
    bride: "Bride",
    groom: "Groom",
    english: "English",
    bangla: "বাংলা",
  },
  bn: {
    photo: "ছবি",
    video: "ভিডিও",
    photos: "ছবি",
    videos: "ভিডিও",
    search: "খুঁজুন",
    registry: "নিবন্ধন",
    pre_wedding_feast: "আইবুড়োভাত",
    turmeric_ceremony: "গায়ে হলুদ",
    wedding: "বিবাহ",
    post_wedding_feast: "বউভাত",
    download: "ডাউনলোড",
    bride: "কনে",
    groom: "বর",
    english: "English",
    bangla: "বাংলা",
  },
};

const groupIconMap = {
  Registry: RegistryIcon,
  "Pre-wedding Feast": PreWeddingIcon,
  "Turmeric Ceremony": TurmericIcon,
  Wedding: WeddingIcon,
  "Post-wedding Feast": PostWeddingIcon,
};

const groupKeyMap = {
  Registry: "registry",
  "Pre-wedding Feast": "pre_wedding_feast",
  "Turmeric Ceremony": "turmeric_ceremony",
  Wedding: "wedding",
  "Post-wedding Feast": "post_wedding_feast",
};

const toBengaliNumber = (num) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((d) => (/\d/.test(d) ? bengaliDigits[d] : d))
    .join("");
};

/* ---------------- MEDIA IMPORTS ---------------- */

const photoGroups = {
  Bride: {
    Registry: import.meta.glob("../assets/photos/bride/registry/*.{jpg,jpeg,png,webp}", { eager: true }),
    "Pre-wedding Feast": import.meta.glob("../assets/photos/bride/pre-wedding-feast/*.{jpg,jpeg,png,webp}", { eager: true }),
    "Turmeric Ceremony": import.meta.glob("../assets/photos/bride/turmeric-ceremony/*.{jpg,jpeg,png,webp}", { eager: true }),
    Wedding: import.meta.glob("../assets/photos/bride/wedding/*.{jpg,jpeg,png,webp}", { eager: true }),
    "Post-wedding Feast": import.meta.glob("../assets/photos/bride/post-wedding-feast/*.{jpg,jpeg,png,webp}", { eager: true }),
  },
  Groom: {
    Registry: import.meta.glob("../assets/photos/groom/registry/*.{jpg,jpeg,png,webp}", { eager: true }),
    "Pre-wedding Feast": import.meta.glob("../assets/photos/groom/pre-wedding-feast/*.{jpg,jpeg,png,webp}", { eager: true }),
    "Turmeric Ceremony": import.meta.glob("../assets/photos/groom/turmeric-ceremony/*.{jpg,jpeg,png,webp}", { eager: true }),
    Wedding: import.meta.glob("../assets/photos/groom/wedding/*.{jpg,jpeg,png,webp}", { eager: true }),
    "Post-wedding Feast": import.meta.glob("../assets/photos/groom/post-wedding-feast/*.{jpg,jpeg,png,webp}", { eager: true }),
  },
};

const videoGroups = {
  Bride: {
    Registry: import.meta.glob("../assets/videos/bride/registry/*.{mp4,webm}", { eager: true }),
    "Pre-wedding Feast": import.meta.glob("../assets/videos/bride/pre-wedding-feast/*.{mp4,webm}", { eager: true }),
    "Turmeric Ceremony": import.meta.glob("../assets/videos/bride/turmeric-ceremony/*.{mp4,webm}", { eager: true }),
    Wedding: import.meta.glob("../assets/videos/bride/wedding/*.{mp4,webm}", { eager: true }),
    "Post-wedding Feast": import.meta.glob("../assets/videos/bride/post-wedding-feast/*.{mp4,webm}", { eager: true }),
  },
  Groom: {
    Registry: import.meta.glob("../assets/videos/groom/registry/*.{mp4,webm}", { eager: true }),
    "Pre-wedding Feast": import.meta.glob("../assets/videos/groom/pre-wedding-feast/*.{mp4,webm}", { eager: true }),
    "Turmeric Ceremony": import.meta.glob("../assets/videos/groom/turmeric-ceremony/*.{mp4,webm}", { eager: true }),
    Wedding: import.meta.glob("../assets/videos/groom/wedding/*.{mp4,webm}", { eager: true }),
    "Post-wedding Feast": import.meta.glob("../assets/videos/groom/post-wedding-feast/*.{mp4,webm}", { eager: true }),
  },
};

const getMedia = (type, group, personType, t, language) => {
  const source =
    type === "Photos"
      ? photoGroups[personType]?.[group]
      : videoGroups[personType]?.[group];

  if (!source) return [];

  const personLabel = personType === "Bride" ? t.bride : t.groom;
  const mediaLabel = type === "Photos" ? t.photo : t.video;

  return Object.values(source).map((file, index) => {
    const count = index + 1;
    const displayCount =
      language === "bn" ? toBengaliNumber(count) : count;

    return {
      id: count,
      src: file.default,
      avatar: groupIconMap[group],
      author: `${personLabel} – ${t[groupKeyMap[group]] || group} ( ${mediaLabel} ${displayCount} )`,
    };
  });
};

/* ---------------- LOVE BUTTON ---------------- */

function LoveButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)} className="text-2xl">
      {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
    </button>
  );
}

/* ---------------- VIDEO PLAYER ---------------- */

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef(null);

  const speeds = [1, 1.25, 1.5, 1.75, 2];
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const changeSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const [volume, setVolume] = useState(1); // 0 to 1
  const [muted, setMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragging, setDragging] = useState(false);

  /* ---------- SHOW / HIDE CONTROLS ---------- */
  const showControlsTemporarily = () => {
    setShowControls(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  /* ---------- PLAY / PAUSE ---------- */
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  /* ---------- UPDATE PROGRESS ---------- */
  const updateProgress = () => {
    if (!dragging) {
      const v = videoRef.current;
      setProgress((v.currentTime / v.duration) * 100);
      setCurrentTime(v.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  /* ---------- SEEK ---------- */
  const seek = (clientX) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(
      Math.max(((clientX - rect.left) / rect.width) * 100, 0),
      100
    );

    const video = videoRef.current;
    video.currentTime = (percent / 100) * video.duration;
    setProgress(percent);
  };

  /* ---------- TIMELINE EVENTS ---------- */
  const handleMouseDown = (e) => {
    setDragging(true);
    seek(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (dragging) seek(e.clientX);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  /* ---------- FULLSCREEN TOGGLE ---------- */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  /* ---------- MUTE TOGGLE ---------- */
  const toggleMute = () => {
    const video = videoRef.current;
    const newMuted = !muted;
    video.muted = newMuted;
    setMuted(newMuted);
  };

  /* ---------- VOLUME CONTROL ---------- */
  const changeVolume = (e) => {
    const value = parseFloat(e.target.value);
    const video = videoRef.current;
    video.volume = value;
    setVolume(value);

    if (value === 0) {
      video.muted = true;
      setMuted(true);
    } else {
      video.muted = false;
      setMuted(false);
    }
  };

  /* ---------- DOUBLE CLICK SEEK ---------- */
  const handleDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      videoRef.current.currentTime -= 10;
    } else {
      videoRef.current.currentTime += 10;
    }
  };

  /* ---------- CLEANUP ---------- */
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden
        ${showControls ? "cursor-default" : "cursor-none"}
      `}
      onDoubleClick={handleDoubleClick}
      onMouseMove={showControlsTemporarily}
      onClick={showControlsTemporarily}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={src}
        className="w-full cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* CENTER PLAY / PAUSE */}
      <button
        onClick={togglePlay}
        className={`absolute inset-0 flex items-center justify-center
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center">
          {playing ? (
            <FiPause className="text-red-500 text-5xl" />
          ) : (
            <FiPlay className="text-red-500 text-5xl ml-1" />
          )}
        </div>
      </button>

      {/* CONTROLS */}
      {showControls && (
        <div
        className={`absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-3
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
          {/* TIMELINE */}
          <div
            ref={progressRef}
            className="relative h-[4px] bg-black cursor-pointer"
            onMouseDown={handleMouseDown}
          >
            <div
              className="absolute top-0 left-0 h-full bg-red-500"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 w-3 h-3 bg-red-500 rounded-full -translate-y-1/2"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          {/* BUTTON ROW */}
          <div className="flex items-center justify-between mt-3 text-red-500">
            {/* LEFT: Play + Volume + Time */}
            <div className="flex items-center gap-4">
              <button onClick={togglePlay}>
                {playing ? <FiPause /> : <FiPlay />}
              </button>

              <button onClick={toggleMute}>
                {muted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={changeVolume}
                className="w-24 h-[2px] accent-red-500 cursor-pointer"
              />

              <span className="text-xs text-white/80 min-w-[70px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* RIGHT: Speed + Fullscreen */}
            <div className="flex items-center gap-4 relative">
              {/* Speed control */}
              <div className="relative">
                <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="text-sm font-medium">
                  {playbackSpeed}x
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-8 right-0 bg-black/80 rounded-md overflow-hidden">
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`block w-full px-4 py-2 text-sm text-left
                          ${playbackSpeed === speed ? "text-red-500" : "text-white"}
                          hover:bg-black/60`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={toggleFullscreen}>
                {isFullscreen ? <FiMinimize /> : <FiMaximize />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function FullscreenImage({ src, alt }) {
  const containerRef = React.useRef(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  React.useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={toggleFullscreen}
      className={`cursor-pointer ${
        isFullscreen ? "bg-black flex items-center justify-center" : ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        className={`rounded-lg w-full ${
          isFullscreen ? "max-h-screen object-contain" : ""
        }`}
      />
    </div>
  );
}

/* ---------------- APP ---------------- */

export default function HomePage() {
  // const tabs = ["Featured", "The Holidays", "Wallpapers", "3D Renders"];
  const tabsKeys = ["Registry", "Pre-wedding Feast", "Turmeric Ceremony", "Wedding", "Post-wedding Feast"];
  const [activeTab, setActiveTab] = useState("Pre-wedding Feast");
  const [mediaType, setMediaType] = useState("Photos");
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [personType, setPersonType] = useState("Bride");
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);


  const t = translations[language];

  const tabs = [
    { key: "Registry", label: t.registry },
    { key: "Pre-wedding Feast", label: t.pre_wedding_feast },
    { key: "Turmeric Ceremony", label: t.turmeric_ceremony },
    { key: "Wedding", label: t.wedding },
    { key: "Post-wedding Feast", label: t.post_wedding_feast },
  ];

  const media = getMedia(mediaType, activeTab, personType, t, language);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* FIXED TOP */}
      <div className="sticky top-0 z-50 bg-white">
        <header className="flex justify-between items-center px-4 py-3">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 font-semibold text-lg"
            >
              {mediaType === "Photos" ? (
                <HiOutlinePhotograph className="text-red-500 text-xl" />
              ) : (
                <FiVideo className="text-red-500 text-xl" />
              )}
              {mediaType === "Photos" ? t.photos : t.videos}
              <FiChevronDown />
            </button>

            {showDropdown && (
            <div className="absolute mt-2 w-36 bg-white rounded shadow-lg z-50">
              {["Photos", "Videos"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setMediaType(type);
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  <span className="w-4">
                    {mediaType === type && (
                      <span className="text-red-500 font-bold">✓</span>
                    )}
                  </span>

                  <span>
                    {type === "Photos" ? t.photos : t.videos}
                  </span>
                </button>
              ))}
            </div>
          )}
          </div>

          <div className="flex gap-5 text-xl text-gray-700">
            {/* BRIDE / GROOM DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setShowPersonDropdown(!showPersonDropdown)}
                className="text-xl"
              >
                {personType === "Bride" ? (
                  <div className="flex gap-4 items-center">
                    <img src={BrideIcon} className="w-6 h-6" alt="Bride" />
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <img src={GroomIcon} className="w-6 h-6" alt="Groom" />
                  </div>
                )}
              </button>

              {showPersonDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg z-50">
                  {["Bride", "Groom"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setPersonType(type);
                        setShowPersonDropdown(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <span className="w-4">
                        {personType === type && (
                          <span className="text-red-500 font-bold">✓</span>
                        )}
                      </span>

                      <span>
                        {type === "Bride" ? t.bride : t.groom}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LANGUAGE DROPDOWN */}
            <div className="relative">
              <button onClick={() => setShowLangDropdown(!showLangDropdown)}>
                <BsTranslate />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-50">
                  {/* ENGLISH */}
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setShowLangDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <span className="w-4">
                      {language === "en" && (
                        <span className="text-red-500 font-bold">✓</span>
                      )}
                    </span>
                    {t.english}
                  </button>

                  {/* BANGLA */}
                  <button
                    onClick={() => {
                      setLanguage("bn");
                      setShowLangDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <span className="w-4">
                      {language === "bn" && (
                        <span className="text-red-500 font-bold">✓</span>
                      )}
                    </span>
                    {t.bangla}
                  </button>
                </div>
              )}
            </div>
            <FiMenu />
          </div>
        </header>

        <div className="px-4 py-3 relative">
          <FiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            className="w-full pl-12 pr-4 py-2 rounded-full bg-gray-100"
            placeholder={`${t.search} ${mediaType === "Photos" ? t.photos : t.videos}`}
          />
        </div>

        <div className="flex gap-6 px-4 text-sm mb-3 overflow-x-auto whitespace-nowrap no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative pb-2 flex-shrink-0 ${
                activeTab === tab.key
                  ? "font-semibold text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {tab.label}

              {activeTab === tab.key && (
                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SCROLLABLE MEDIA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-10">
        {media.map((item) => (
          <div key={item.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={activeTab}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{item.author}</span>
            </div>

            {mediaType === "Photos" ? (
              <FullscreenImage src={item.src} alt={item.author} />
            ) : (
              <VideoPlayer src={item.src} />
            )}

            <div className="flex justify-between items-center">
              <LoveButton />
              <a
                href={item.src}
                download
                className="
                  flex items-center gap-2 px-4 py-2
                  border border-red-500 rounded-md text-sm font-medium
                  text-red-500
                  hover:bg-red-500 hover:text-white
                  transition-colors duration-200
                "
              >
                <FiDownload /> {t.download}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}