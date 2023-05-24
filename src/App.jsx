import "./App.css";

//react-router
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import HomePage from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import Listings from "./pages/Listings";
import ListingsPage from "./pages/ListingsPage";
import NotFound from "./pages/NotFound";
import Message from "./pages/MessagePage";

//context
import Auth from "./pages/auth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Modal from "./components/Modal";
import Notification from "./components/Notification";
import { useEffect, useState } from "react";
import ActivityIndicator from "./components/ActivityIndicator";
import Rently from "./components/Rently";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth/" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route index element={<HomePage />} />

      <Route path="listings" element={<Listings />}>
        <Route index element={<ListingsPage />} />
        <Route path=":id" element={<DetailsPage />} />
        <Route path="details" element={<DetailsPage />} />
      </Route>

      <Route path="message" element={<Message />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    // <h1>Loading</h1>
    <div className="App">
      <Modal />
      <Notification />
      <Rently />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
/*
//PACKAGES

npm i @emotion/react @emotion/styled @faker-js/faker @mui/icons-material @mui/material apisauce chart.js faker leaflet lottie-react mime moment prop-types react-calendar react-chartjs-2 react-charts  react-icons react-leaflet react-range-slider-input react-responsive-carousel react-router-dom react-select react-textarea-autosize react-transition-group socket.io timeago.js

*/
