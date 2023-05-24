import React from "react";
import "./css/style.css";

import Logo from "./images/logo.svg";
import HeroIllustration from "./images/hero-illustration.svg";
import Star from "./images/star.svg";
import Works_1 from "./images/works-icon-1.svg";
import Works_2 from "./images/works-icon-2.svg";
import Works_3 from "./images/works-icon-3.svg";
import ArrowRight from "./images/arrow-right.svg";
import ArrowUp from "./images/arrow-up.svg";
import ArrowUpOutline from "./images/arrow-up-outline.svg";
import Icon_1 from "./images/properties-icon-1.svg";
import Icon_2 from "./images/properties-icon-2.svg";
import Icon_3 from "./images/properties-icon-3.svg";
import Social_1 from "./images/social-icon-1.svg";
import Social_2 from "./images/social-icon-2.svg";
import Social_3 from "./images/social-icon-3.svg";
import Featured_1 from "./images/properties-1.png";
import Featured_2 from "./images/properties-2.png";
import Featured_3 from "./images/properties-3.png";
// import Icon from "./images/image";
// import Icon from "./images/image";
// import Icon from "./images/image";
import Found from "./images/found.png";
import Newsletter from "./images/newsletter-img.svg";
// import Icon from "./images/image";
// import Icon from "./images/image";
// import Icon from "./images/image";
// import Arrow from "./images/image";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import listingContext from "../../context/ListingContext";
import ActivityIndicator from "../../components/ActivityIndicator";

let counters = [];

const getCounters = (values) => {
  counters = values;
};

const HomePage = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [counters, setCounters] = useState(0);

  const { loading, setLoading } = useContext(listingContext);

  const saleCount = useRef();
  const soldCount = useRef();
  const priceCount = useRef();

  const showActivity = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true);
    localStorage.setItem("viewedListings", false);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  useEffect(() => {
    const init = () => {
      let counters = document.querySelectorAll(".counter h3");
      let section_counter = document.querySelector(".counter-container");
      let sectionAll = document.querySelectorAll("section[id]");
      let nav_menu_links = document.querySelectorAll(".nav_links li a");
      let scroll_btn = document.querySelector(".scroll-btn");
      let year = document.querySelector(".year");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 250) {
          document.querySelector("header").classList.add("sticky");
        } else {
          document.querySelector("header").classList.remove("sticky");
        }
      });
      // Mobile Navigation-end
      // active nav link-start
      window.addEventListener("scroll", () => {
        let current = "";
        sectionAll.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
          }
        });
        nav_menu_links.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });
      // active nav link-end
      // Counter-start
      let Observer = new IntersectionObserver(
        (entries, observe) => {
          let [entry] = entries;
          if (!entry.isIntersecting) return;
          const speed = 200;
          counters.forEach((counter) => {
            const updateCount = () => {
              const target = +counter.getAttribute("data-target");
              const count = +counter.innerText;
              const increment = Math.trunc(target / speed);
              if (count < target && target > 0) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 40);
              } else {
                counter.innerText = target
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            };
            updateCount();
          });
        },
        {
          root: null,
          threshold: window.innerWidth > 768 ? 0.4 : 0.3,
        }
      );
      Observer.observe(section_counter);
      // Counter-end
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          scroll_btn.classList.add("active");
        } else {
          scroll_btn.classList.remove("active");
        }
      });
      scroll_btn.addEventListener("click", () => {
        document.documentElement.scrollIntoView({
          behavior: "smooth",
        });
      });
      let year_Date = new Date().getFullYear();
      year.innerText = `${year_Date}`;
    };

    !loading && init();
  });

  return (
    <>
      {loading && <ActivityIndicator />}
      <div
        style={{ background: "#fff", display: loading ? "none" : "block" }}
        className="homePage"
      >
        <section id="hero">
          {/* <!-- Navigation-start --> */}
          <header>
            <div className="container">
              <nav className="navigation">
                <a href="index.html" className="myLogo">
                  {/* <img src={Logo} alt="Logo" /> */}
                  <h1>Raale.</h1>
                </a>
                <div className="mobile_menu_icon" onClick={handleToggleMenu}>
                  <div
                    className={`mobile_menu_toggle ${
                      toggleMenu ? "active" : null
                    }`}
                  ></div>
                </div>
                <ul className={`nav_menu ${toggleMenu ? "active" : null}`}>
                  <div className="nav_links">
                    <li className="nav_list">
                      <a href="#hero" className="nav_link active">
                        Home
                      </a>
                    </li>
                    <li className="nav_list">
                      <a href="#hows-it-work" className="nav_link">
                        Features
                      </a>
                    </li>
                    <li className="nav_list">
                      <a href="#featured-properties" className="nav_link">
                        Listed
                      </a>
                    </li>
                    <li className="nav_list">
                      <a href="#newsletter" className="nav_link">
                        Newsletter
                      </a>
                    </li>
                  </div>
                  <div className="cta_links">
                    <li className="nav_list">
                      <a href="/auth/login" className="nav_link">
                        Log in
                      </a>
                    </li>
                    <li className="nav_list">
                      <a href="/auth/signup" className="nav_link btn-primary">
                        Sign Up
                      </a>
                    </li>
                  </div>
                </ul>
              </nav>
            </div>
          </header>
          {/* <!-- Navigation-end --> */}
          <div className="container">
            <div className="hero_container">
              <div className="hero_content">
                <span className="hero-title">Welcome to Housing Agency</span>
                <h1 className="hero-heading">
                  Discover a place you'll love to live.
                </h1>
                {/* <p className="paragraph">
                  get the best real estate deals first, before they hit the mass
                  market! HOT FORECLOSURE DEALS with one simple search
                </p> */}
                <Link
                  onClick={showActivity}
                  to="listings"
                  className="btn btn-primary"
                >
                  View Listings
                </Link>
              </div>
              <div className="hero_image">
                <img src={HeroIllustration} alt="Hero" />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Hero-section-end --> */}
        {/* <!-- partner-section-start --> */}
        {/* <!-- partner-section-end --> */}
        {/* <!-- Hows-its-work-section-start --> */}
        <section id="hows-it-work">
          <div className="container">
            <div className="section-center">
              <h1 className="works-heading text-dark">How it works ?</h1>
              <p className="text-light">
                Everything you need to know when you're looking to buy, rent, or
                sell - all in one place.
              </p>
            </div>
          </div>
          <div className="container">
            <div className="seller-types">
              <div className="seller-type">
                <img src={Works_1} alt="seller" className="seller-img" />
                <h3 className="text-dark-50">Buyer Guides</h3>
                <a href="#!" className="btn-secondary">
                  How to buy <img src={ArrowRight} alt="Arrow" />
                </a>
              </div>
              <div className="seller-type">
                <img src={Works_2} alt="seller" className="seller-img" />
                <h3 className="text-dark-50">Renter Guides</h3>
                <a href="#!" className="btn-secondary">
                  How to rent <img src={ArrowRight} alt="Arrow" />
                </a>
              </div>
              <div className="seller-type">
                <img src={Works_3} alt="seller" className="seller-img" />
                <h3 className="text-dark-50">Seller Guides</h3>
                <a href="#!" className="btn-secondary">
                  How to sell <img src={ArrowRight} alt="Arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Hows-its-work-section-end --> */}
        {/* <!-- Featured-Properties-section-start --> */}
        <section id="featured-properties">
          <div className="container">
            <div className="featured-section-top">
              <div>
                <h1 className="section-heading text-dark">
                  Featured Properties
                </h1>
                <p className="text-light">
                  Everything you need to know when you're looking
                </p>
              </div>
              <div>
                <Link to="listings" className="btn-secondary">
                  View All Properties <img src={ArrowRight} alt="Arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="featured-section-bottom">
              <div className="featured-item">
                <img src={Featured_1} alt="Featured" className="featured-img" />
                <div className="content-wrapper">
                  <h3 className="text-dark">$35000</h3>
                  <p className="text-light">
                    8502 Preston Rd. Inglewood, Maine 98280
                  </p>
                  <div className="details-short">
                    <div>
                      <img src={Icon_1} alt="Icon" className="featured-icon" />
                      <p className="text-dark">5 Beds</p>
                    </div>
                    <div>
                      <img src={Icon_2} alt="Icon" className="featured-icon" />
                      <p className="text-dark">2 both</p>
                    </div>
                    <div>
                      <img src={Icon_3} alt="Icon" className="featured-icon" />
                      <p className="text-dark">52000 Sqft</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="featured-item">
                <img src={Featured_2} alt="Featured" className="featured-img" />
                <div className="content-wrapper">
                  <h3 className="text-dark">$35000</h3>
                  <p className="text-light">
                    8502 Preston Rd. Inglewood, Maine 98280
                  </p>
                  <div className="details-short">
                    <div>
                      <img src={Icon_1} alt="Icon" className="featured-icon" />
                      <p className="text-dark">5 Beds</p>
                    </div>
                    <div>
                      <img src={Icon_2} alt="Icon" className="featured-icon" />
                      <p className="text-dark">2 both</p>
                    </div>
                    <div>
                      <img src={Icon_3} alt="Icon" className="featured-icon" />
                      <p className="text-dark">52000 Sqft</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="featured-item">
                <img src={Featured_3} alt="Featured" className="featured-img" />
                <div className="content-wrapper">
                  <h3 className="text-dark">$35000</h3>
                  <p className="text-light">
                    8502 Preston Rd. Inglewood, Maine 98280
                  </p>
                  <div className="details-short">
                    <div>
                      <img src={Icon_1} alt="Icon" className="featured-icon" />
                      <p className="text-dark">5 Beds</p>
                    </div>
                    <div>
                      <img src={Icon_2} alt="Icon" className="featured-icon" />
                      <p className="text-dark">2 both</p>
                    </div>
                    <div>
                      <img src={Icon_3} alt="Icon" className="featured-icon" />
                      <p className="text-dark">52000 Sqft</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Featured-Properties-section-end --> */}
        {/* <!-- Feature-02-section-start --> */}
        <section id="feature-two">
          <div className="container">
            <div className="found-container">
              <div>
                <img src={Found} alt="Found" />
              </div>
              <div className="found-content">
                <h1 className="section-heading">
                  You’ve found a <br /> neighborhood <br /> you love.
                </h1>
                <p className="text-light">
                  When you own a home, you’re committing to living in one
                  location for a while. In a recent Trulia survey, we found that
                  five out of six respondents said finding the right
                  neighborhood
                </p>
              </div>
            </div>
            <div className="counter-container">
              <div className="counter">
                <h3 className="text-dark" data-target="50" ref={saleCount}>
                  0
                </h3>
                <span className="text-dark-50">Homes For Sale</span>
              </div>
              <div className="counter">
                <h3 className="text-dark" data-target="25" ref={soldCount}>
                  0
                </h3>
                <span className="text-dark-50">Homes Recently Sold</span>
              </div>
              <div className="counter">
                <h3 className="text-dark" data-target="15" ref={priceCount}>
                  0
                </h3>
                <span className="text-dark-50">Price Reduced</span>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Feature-02-section-end --> */}
        {/* <!-- Newsletter-section-start --> */}
        <section id="newsletter">
          <div className="container">
            <div className="newsletter">
              <div className="newsletter-content">
                <h1 className="text-white">Featured Properties</h1>
                <p className="text-white">
                  Everything you need to know when you're looking
                </p>
                <a href="#!" className="btn">
                  Get Started Now
                </a>
              </div>
              <div className="newsletter-image">
                <img
                  src={Newsletter}
                  alt="Newsletter"
                  className="newsletter_img"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Newsletter-section-end --> */}
        {/* <!-- Footer-section-start --> */}
        <section id="footer">
          <div className="container">
            <div className="footer-container">
              <div className="footer-item">
                <h3 className="footer-heading">Product</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#!" className="footer-link">
                      Listing
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Property
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Agents
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3 className="footer-heading">Resources</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#!" className="footer-link">
                      Our Homes
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Member Stories
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Video
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Free trial
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3 className="footer-heading">Company</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#!" className="footer-link">
                      Patnerships
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Terms of use
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="footer-link">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3 className="footer-heading">Get in touch</h3>
                <p className="text-dark">
                  You’ll find your next home, in any style you prefer.
                </p>
                <ul className="social-links">
                  <li>
                    <a href="#!">
                      <img src={Social_1} alt="Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <img src={Social_2} alt="Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <img src={Social_3} alt="Icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="myLogo">
                {/* <img src={Logo} alt="Logo" className="myLogo" /> */}
                <h2>Raale.</h2>
              </div>
              <div>
                <span className="text-light">
                  Copyright <span className="year">2022</span>.com, All rights
                  reserved.
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="scroll-btn">
          <img src={ArrowUpOutline} alt="Arrow" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
