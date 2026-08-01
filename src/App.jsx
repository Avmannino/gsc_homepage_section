import { useEffect, useRef, useState } from "react";
import "./App.css";
import membershipIcon from "./assets/memberships-icon.png";
import programsIcon from "./assets/programs-icon.png";
import locationIcon from "./assets/location-icon.png";
import crossbarIcon from "./assets/crossbar.png";
import gowingsLogo from "./assets/gowings-logo.png";

const MEDIA_BASE = `${import.meta.env.BASE_URL}media/`;

const LOGO_SRC = `${MEDIA_BASE}taking-it-outside-logo.png`;
const VIDEO_SRC = `${MEDIA_BASE}gsc-homepage-video.mp4`;

/*
  These currently use the Wix Studio test-site URL.

  When the final Greenwich Skating Club domain is connected,
  change SITE_BASE_URL below. The page paths can also be
  changed individually in the navigationLinks array.
*/
const SITE_BASE_URL =
  "https://wingsarenact.wixstudio.com/gscnewsite";

const navigationLinks = [
  {
    title: "Crossbar Login",
    description:
      "Log in to the GSC Crossbar Portal.",
    href: "https://www.greenwichskatingclub.org/login",
    icon: "crossbar",
    accent: "navy",
  },
  {
    title: "Membership",
    description:
      "Learn about memberships.",
    href: `${SITE_BASE_URL}/membership`,
    icon: "membership",
    accent: "red",
  },
  {
    title: "Programs",
    description:
      "See what’s happening on the ice.",
    href: `${SITE_BASE_URL}/programs`,
    icon: "programs",
    accent: "navy",
  },
  {
    title: "Board of Governors",
    description:
      "Meet the leaders guiding GSC.",
    href: `${SITE_BASE_URL}/board-of-governors`,
    icon: "board",
    accent: "red",
  },
  {
    title: "Contact Us",
    description:
      "Get in touch with us.",
    href: `${SITE_BASE_URL}/contact`,
    icon: "envelope",
    accent: "navy",
  },
  {
    title: "Directions",
    description:
      "Get directions to the club.",
    href: `${SITE_BASE_URL}/directions`,
    icon: "location",
    accent: "red",
  },
];

const iconArtwork = {
  envelope: (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </>
  ),

  board: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m12 7 1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4L12 7Z" />
    </>
  ),
};

const iconImages = {
  membership: membershipIcon,
  programs: programsIcon,
  location: locationIcon,
  crossbar: crossbarIcon,
};

const svgSizeModifiers = {
  board: "nav-card__svg--board",
};

function SectionIcon({ type }) {
  return (
    <svg
      className={`nav-card__svg ${svgSizeModifiers[type] ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconArtwork[type]}
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="nav-card__arrow-svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 3 6 7-6 7" />
    </svg>
  );
}

function App() {
  const [logoFailed, setLogoFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const bannerRef = useRef(null);

  /*
    Calculates only the angle of the diagonal banner.

    Logo sizing is handled entirely by responsive CSS so the
    JavaScript cannot unexpectedly shrink the logo.
  */
  useEffect(() => {
    const bannerElement = bannerRef.current;

    if (!bannerElement) {
      return undefined;
    }

    let animationFrameId = null;

    const updateBannerAngle = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const {
          width: bannerWidth,
          height: bannerHeight,
        } = bannerElement.getBoundingClientRect();

        if (bannerWidth <= 0 || bannerHeight <= 0) {
          return;
        }

        const angleInRadians = Math.atan2(
          bannerHeight,
          bannerWidth,
        );

        const angleInDegrees =
          angleInRadians * (180 / Math.PI);

        const ROTATION_OFFSET_DEGREES = -1;

        bannerElement.style.setProperty(
          "--wings-banner-angle",
          `${angleInDegrees + ROTATION_OFFSET_DEGREES}deg`,
        );
      });
    };

    updateBannerAngle();

    const resizeObserver = new ResizeObserver(
      updateBannerAngle,
    );

    resizeObserver.observe(bannerElement);

    window.addEventListener(
      "orientationchange",
      updateBannerAngle,
    );

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      resizeObserver.disconnect();

      window.removeEventListener(
        "orientationchange",
        updateBannerAngle,
      );
    };
  }, []);

  return (
    <main className="page-shell">
      <div
        className="wings-banner"
        ref={bannerRef}
        aria-hidden="true"
      >
        <div className="wings-banner__logo-positioner">
          <img
            className="wings-banner__logo"
            src={gowingsLogo}
            alt=""
          />
        </div>
      </div>

      <section
        className="gsc-home-section"
        aria-labelledby="gsc-home-section-title"
      >
        <div className="gsc-home-section__top">
          <div className="story">
            <div
              className="story__accent-line"
              aria-hidden="true"
            />

            <div className="story__content">
              <h1
                id="gsc-home-section-title"
                className="screen-reader-only"
              >
                Taking it outside since 1954
              </h1>

              <div className="story__logo-container">
                {!logoFailed ? (
                  <img
                    className="story__logo"
                    src={LOGO_SRC}
                    alt="Taking it outside since 1954"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <div className="story__logo-placeholder">
                    <span>
                      Taking it outside since 1954!
                    </span>

                    <small>
                      Add taking-it-outside-logo.png to
                      public/media
                    </small>
                  </div>
                )}
              </div>

              <div className="story__copy">
                <p>
                  Founded in 1954, Greenwich Skating Club is a
                  private, member-based club where families and
                  friends can spend time together both on and off
                  the ice. Over 250 families call GSC home,
                  creating a close-knit community centered around
                  skating, hockey, and shared traditions. With
                  programs for children and adults, the skating
                  club continues to bring people together and
                  strengthen the sense of community that has
                  defined GSC for generations.
                </p>

                <p>
                  A wide range of programs and club activities
                  gives members of all ages opportunities to enjoy
                  the ice, stay active, and connect with one
                  another throughout the year. It is this
                  combination of skating, community, and time
                  spent together that makes GSC such a special
                  place for its members.
                </p>
              </div>
            </div>
          </div>

          <div className="video-panel">
            {!videoFailed ? (
              <video
                className="video-panel__video"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="Greenwich Skating Club video"
                onError={() => setVideoFailed(true)}
              >
                <source
                  src={VIDEO_SRC}
                  type="video/mp4"
                />

                Your browser does not support embedded video.
              </video>
            ) : (
              <div className="video-panel__placeholder">
                <div className="video-panel__placeholder-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m10 9 5 3-5 3Z" />
                  </svg>
                </div>

                <strong>Add your GSC video</strong>

                <span>
                  public/media/gsc-homepage-video.mp4
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="quick-links-heading">
          <h2 className="quick-links-heading__title">
            Around The Rink
          </h2>

          <span
            className="quick-links-heading__line"
            aria-hidden="true"
          />
        </div>

        <nav
          className="section-navigation"
          aria-label="Greenwich Skating Club pages"
        >
          {navigationLinks.map((link) => (
            <a
              className="nav-card"
              href={link.href}
              target="_top"
              key={link.title}
              aria-label={`${link.title}: ${link.description}`}
            >
              <span
                className={`nav-card__icon nav-card__icon--${link.accent}${
                  link.icon === "envelope"
                    ? " nav-card__icon--contact"
                    : ""
                }`}
              >
                {iconImages[link.icon] ? (
                  <img
                    className={`nav-card__icon-image${
                      link.icon === "crossbar"
                        ? " nav-card__icon-image--crossbar"
                        : ""
                    }`}
                    src={iconImages[link.icon]}
                    alt=""
                  />
                ) : (
                  <SectionIcon type={link.icon} />
                )}
              </span>

              <span
                className="nav-card__divider"
                aria-hidden="true"
              />

              <span className="nav-card__content">
                <span className="nav-card__title">
                  {link.title}
                </span>

                <span className="nav-card__description">
                  {link.description}
                </span>
              </span>

              <span
                className="nav-card__arrow"
                aria-hidden="true"
              >
                <ChevronIcon />
              </span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default App;