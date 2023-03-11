import React, { useEffect, useState, useRef } from "react";
import Calendar from "../../../components/Calendar";
import Chart from "../../../components/Chart";
import Payment from "../../../components/Payment";

import SearchInput from "../../../components/SearchInput";
import SideBar from "../../../components/SideNavbar";
import SortBtn from "../../../components/Select";
import Map from "../../../components/map/Map";
import LocationMarker from "../../../components/map/LocationMarker";
import classes from "./Dashboard.module.css";
import { useContext } from "react";
import listingContext from "../../../context/ListingContext";
import { getListings } from "../../../api/listings";
import Listings from "../../client/Listings";
import Notifications from "../../../components/Notifications";

import { UnfoldLessRounded, UnfoldMoreRounded } from "@mui/icons-material";
import userProfile from "../../../imgs/avatar3.jpg";
import OpenWithRounded from "@mui/icons-material/OpenWithRounded";

const date = new Date();

const payments = [
  {
    description: "January rent",
    amount: 2000,
    date: Date.now().toFixed(),
    status: "upcoming",
  },
  {
    description: "February rent",
    amount: 2000,
    date: Date.now().toFixed(),
    status: "completed",
  },
  {
    description: "March rent",
    amount: 2000,
    date: Date.now().toFixed(),
    status: "pending",
  },
  {
    description: "April rent",
    amount: 2000,
    date: Date.now().toFixed(),
    status: "upcoming",
  },
  {
    description: "May rent",
    amount: 2000,
    date: Date.now().toFixed(),
    status: "upcoming",
  },
];

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [expandMap, setExpandMap] = useState(false);

  const mapRef = useRef();

  const loadListings = async () => {
    const response = await getListings();
    setListings(response.data.listings);
    // const array = listings.map((listing) => [listing.coords]);
    // console.log(array);
    // setCoordsArray(array);
  };

  const handleExpandMap = () => {
    setExpandMap((prevExpand) => !prevExpand);
  };

  useEffect(() => {
    document.title = "Appartment Listing || Dashboard";
    loadListings();
  }, []);

  useEffect(() => {
    expandMap && mapRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [expandMap]);

  return (
    <main
      className={classes.main}
      style={{ overflow: expandMap ? "hidden" : "scroll" }}
    >
      <div className={classes.left}>
        <div className={classes.header}>
          <h1>Dashboard</h1>
          {/* <div className={classes.searchInput}>
              <SearchInput />
            </div> */}
        </div>
        <div className={classes.top}>
          <div>
            <small>Property for sale</small>
            <p>$1,259</p>
          </div>
          <div>
            <small>Property for rent</small>
            <p>$1,259</p>
          </div>
          <div>
            <small>Object views</small>
            <p>$1,259</p>
          </div>
          <div>
            <small>Revenue</small>
            <p>$1,259</p>
          </div>
        </div>
        <div className={classes.mid}>
          <div>
            <h3>Sales & Rent Statistics</h3>
            <SortBtn options={[]}>Current Year</SortBtn>
          </div>
          <div className={classes.chart}>
            <Chart />
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottomLeft}>
            <div className={classes.bottomLeftHeader}>
              <p>Payments</p>
              <small>View more</small>
            </div>
            <div className={classes.paymentSection}>
              {payments.map((payment) => (
                <Payment key={Math.random()} payment={payment} />
              ))}
            </div>
          </div>
          <div className={classes.bottomRight}>
            <div className={classes.bottomRightHeader}>
              <p>Property Map Location</p>
              <SortBtn options={[]}>For Rent</SortBtn>
            </div>
            <div
              ref={mapRef}
              className={`${classes.bottomRightMain} ${
                expandMap ? classes.expanded : null
              }`}
            >
              <div>
                <span onClick={handleExpandMap}>
                  {expandMap ? <UnfoldLessRounded /> : <OpenWithRounded />}
                </span>
                {listings.length > 0 && (
                  <Map section="dashboard" listings={listings} zoom={7}></Map>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.adminProfile}>
          <div>
            <p>welcome, Evelyn</p>
            <small>Admin Dashboard</small>
          </div>
          <span className={classes.profile}>
            <img src={userProfile} alt="admin" />
          </span>
        </div>
        <div className={classes.calendar}>
          <Calendar />
        </div>
        <div className={classes.timeDetails}>
          <Notifications className={classes.dashboardNotif} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
