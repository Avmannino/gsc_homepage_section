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
const CENTER_ICE_LOGO_SRC = `${import.meta.env.BASE_URL}gsc-logo.png`;
const MOBILE_LOGO_SRC = `${import.meta.env.BASE_URL}gsc-logo-mobile.png`;
const PAGE_BACKGROUND_SRC = `${import.meta.env.BASE_URL}gsc-background.jpg`;

/*
  These currently use the Wix Studio test-site URL.

  When the final Greenwich Skating Club domain is connected,
  change SITE_BASE_URL below. The page paths can also be
  changed individually in the navigationLinks array.
*/
const SITE_BASE_URL =
  "https://wingsarenact.wixstudio.com/gscnewsite"

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
    title: "Member Billing",
    description:
      "Manage your membership billing.",
    href: "https://members.greenwichskatingclub.org/",
    icon: "billing",
    accent: "red",
  },
  {
    title: "Membership",
    description:
      "Learn about memberships.",
    href: `${SITE_BASE_URL}/membership`,
    icon: "membership",
    accent: "navy",
  },
  {
    title: "Programs",
    description:
      "See what’s happening on the ice.",
    href: `${SITE_BASE_URL}/programs`,
    icon: "programs",
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

  billing: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M9.5 15c0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2-1.1-1.7-2.5-2-2.5-.9-2.5-2 1.1-2 2.5-2 2.5.9 2.5 2" />
    </>
  ),
};

const iconImages = {
  membership: membershipIcon,
  programs: programsIcon,
  location: locationIcon,
  crossbar: crossbarIcon,
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/thegreenwichskatingclub/",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thegreenwichskatingclub",
    icon: "instagram",
  },
];

function SectionIcon({ type }) {
  return (
    <svg
      className="nav-card__svg"
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

function FacebookIcon() {
  return (
    <svg
      className="footer-socials__icon-svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-4 3.87-4 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.91h-2.4v7.04A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="footer-socials__icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />
      <circle cx="12" cy="12" r="4.2" />
      <circle
        cx="17.4"
        cy="6.6"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};


const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

const GSC_PHONE_NUMBER = "(203) 622-9583";


const exploreGroups = [
  {
    title: "About",
    href: `${SITE_BASE_URL}/about-gsc`,
    links: [
      {
        label: "About The Club",
        href: `${SITE_BASE_URL}/about-gsc`,
      },
      {
        label: "Club History",
        href: `${SITE_BASE_URL}/club-history`,
      },
      {
        label: "Board of Governors",
        href: `${SITE_BASE_URL}/board-of-governors`,
      },
      {
        label: "GSC Alumni",
        href: `${SITE_BASE_URL}/gsc-alumni`,
      },
    ],
  },
  {
    title: "Membership",
    href: `${SITE_BASE_URL}/membership`,
    links: [
      {
        label: "Prospective Members",
        href: `${SITE_BASE_URL}/prospective-members`,
      },
      {
        label: "Proposing a Candidate",
        href: `${SITE_BASE_URL}/proposing-a-candidate`,
      },
    ],
  },
  {
    title: "Programs",
    href: `${SITE_BASE_URL}/programs`,
    links: [
      {
        label: "Learn to Skate",
        href: `${SITE_BASE_URL}/learn-to-skate`,
      },
      {
        label: "Mini Mites",
        href: `${SITE_BASE_URL}/mini-mites`,
      },
      {
        label: "Youth Travel Hockey",
        href: `${SITE_BASE_URL}/youth-travel-hockey`,
      },
      {
        label: "Stateline Girls",
        href: `${SITE_BASE_URL}/stateline-girls`,
      },
      {
        label: "Figure Skating",
        href: `${SITE_BASE_URL}/figure-skating`,
      },
      {
        label: "Adult Hockey",
        href: `${SITE_BASE_URL}/adult-hockey`,
      },
    ],
  },
  {
    title: "Contact",
    href: `${SITE_BASE_URL}/contact`,
    links: [
      {
        label: "Map & Directions",
        href: `${SITE_BASE_URL}/directions`,
      },
      {
        label: "Contact Form",
        href: `${SITE_BASE_URL}/contact-form`,
      },
    ],
  },
];

function FooterArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function FooterPhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C10.6 21.1 2.9 13.4 2.9 3.7c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
    </svg>
  );
}

function FooterEmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function FooterPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

function ExploreMenu() {
  return (
    <nav
      className="footer-menu"
      aria-label="Explore Greenwich Skating Club"
    >
      <div className="footer-menu__groups">
        {exploreGroups.map((group) => (
          <div
            className="footer-menu__group"
            key={group.title}
          >
            {group.title === "Programs" ? (
              <a
                className="footer-menu__group-title"
                href={group.href}
                target="_top"
              >
                <span>{group.title}</span>
                <FooterArrowIcon />
              </a>
            ) : (
              <div className="footer-menu__group-title">
                <span>{group.title}</span>
                <FooterArrowIcon />
              </div>
            )}

            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_top"
                  >
                    <span>{link.label}</span>
                    <FooterArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

function ConnectPanel() {
  return (
    <section className="footer-connect">
      <div className="footer-connect__info">
        <h2>Get In Touch</h2>

        <div className="footer-connect__cards">
          <a
            className="footer-connect__card"
            href={`${SITE_BASE_URL}/directions`}
            target="_top"
          >
            <FooterPinIcon />

            <span className="footer-connect__card-text">
              <span className="footer-connect__card-label">
                Address
              </span>

              <span className="footer-connect__card-value">
                9 Cardinal Rd.
                <br />
                Greenwich, CT 06830
              </span>
            </span>
          </a>

          <a
            className="footer-connect__card"
            href={`tel:${GSC_PHONE_NUMBER.replace(/[^\d+]/g, "")}`}
          >
            <FooterPhoneIcon />

            <span className="footer-connect__card-text">
              <span className="footer-connect__card-label">
                Phone
              </span>

              <span className="footer-connect__card-value">
                {GSC_PHONE_NUMBER}
              </span>
            </span>
          </a>
        </div>

        <a
          className="footer-connect__card footer-connect__card--wide"
          href={`mailto:${ADMISSIONS_EMAIL}`}
        >
          <FooterEmailIcon />

          <span className="footer-connect__card-text">
            <span className="footer-connect__card-label">
              Email
            </span>

            <span className="footer-connect__card-value">
              {ADMISSIONS_EMAIL}
            </span>
          </span>
        </a>

        <a
          className="member-button"
          href={MEMBER_LOGIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>Member Login</span>

          <FooterArrowIcon />
        </a>

        <div className="footer-socials">
          <span
            className="footer-socials__rule"
            aria-hidden="true"
          />

          <span className="footer-socials__label">
            Follow Us On
          </span>

          <nav
            className="footer-socials__icons"
            aria-label="Follow Greenwich Skating Club on social media"
          >
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.icon];

              return (
                <a
                  className="footer-socials__icon"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={link.label}
                  aria-label={`Follow us on ${link.label}`}
                >
                  <Icon />
                </a>
              );
            })}
          </nav>

          <span
            className="footer-socials__rule"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="site-footer">
      <img
        className="site-footer__watermark"
        src={MOBILE_LOGO_SRC}
        alt=""
        aria-hidden="true"
      />

      <div
        className="site-footer__accent"
        aria-hidden="true"
      >
        <span />
        <span />
      </div>

      <div className="footer-map">
        <iframe
          title="Greenwich Skating Club location"
          src="https://www.google.com/maps?q=Greenwich+Skating+Club,+Cardinal+Road,+Greenwich,+CT&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="footer-container">
        <img
          className="footer-logo"
          src={MOBILE_LOGO_SRC}
          alt="Greenwich Skating Club"
        />

        <div className="site-footer__main">
          <ExploreMenu />

          <ConnectPanel />
        </div>
      </div>

      <p className="site-footer__copyright">
        © {currentYear} Greenwich Skating Club
      </p>
    </footer>
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

  useEffect(() => {
    /*
      Swiping back to this page on mobile Safari restores it from the
      back-forward cache instead of reloading it. Since this app is
      embedded via an iframe with target="_top" nav-card links, that
      restored snapshot can leave click handlers unresponsive. Forcing
      a real reload on a bfcache restore guarantees fresh JS state so
      the cards work again.
    */
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <>
      <main
        className="page-shell"
      style={{
        "--page-bg-image": `url(${PAGE_BACKGROUND_SRC})`,
      }}
    >
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
        </div>

        <div className="rink-shape">
          <svg
            className="rink-shape__markings"
            viewBox="0 0 200 90"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M 12 40 A 5 5 0 0 1 12 50 Z"
              className="rink-shape__crease"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 188 40 A 5 5 0 0 0 188 50 Z"
              className="rink-shape__crease"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="12"
              y1="0"
              x2="12"
              y2="90"
              className="rink-shape__goal-line"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="188"
              y1="0"
              x2="188"
              y2="90"
              className="rink-shape__goal-line"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="70"
              y1="0"
              x2="70"
              y2="90"
              className="rink-shape__blue-line"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="130"
              y1="0"
              x2="130"
              y2="90"
              className="rink-shape__blue-line"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="90"
              className="rink-shape__center-line"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="100"
              cy="45"
              r="14"
              className="rink-shape__center-circle"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="100"
              cy="45"
              r="1.5"
              className="rink-shape__dot"
            />
            <image
              href={CENTER_ICE_LOGO_SRC}
              x="87"
              y="32"
              width="26"
              height="26"
              preserveAspectRatio="xMidYMid meet"
              className="rink-shape__center-logo"
            />
            <circle
              cx="48"
              cy="26"
              r="10"
              className="rink-shape__faceoff-circle"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="48"
              cy="26"
              r="1.5"
              className="rink-shape__dot"
            />
            <circle
              cx="48"
              cy="64"
              r="10"
              className="rink-shape__faceoff-circle"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="48"
              cy="64"
              r="1.5"
              className="rink-shape__dot"
            />
            <circle
              cx="152"
              cy="26"
              r="10"
              className="rink-shape__faceoff-circle"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="152"
              cy="26"
              r="1.5"
              className="rink-shape__dot"
            />
            <circle
              cx="152"
              cy="64"
              r="10"
              className="rink-shape__faceoff-circle"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="152"
              cy="64"
              r="1.5"
              className="rink-shape__dot"
            />
          </svg>

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
        </div>
      </section>
      </main>

      <SiteFooter />
    </>
  );
}

export default App;