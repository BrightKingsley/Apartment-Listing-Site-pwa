import "./App.css";

//react-router
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import HomePage from "./pages/client/Home";
import DetailsPage from "./pages/client/DetailsPage";
import Listings from "./pages/client/Listings";
import Admin from "../src/pages/admin";
import Dashboard from "./pages/admin/Dashboard";
import ListingsPage from "./pages/client/ListingsPage";
import AddListing from "./pages/admin/AddListing";
import Messages from "./pages/admin/Messages";
import NotFound from "./pages/NotFound";
// import Login from "./pages/admin/Login";
import Message from "./pages/client/MessagePage";

//context
import { AdminContextProvider } from "./context/AdminContext";
import Auth from "./pages/auth";
import Login from "./pages/auth/AdminLogin";
import Signup from "./pages/auth/AdminSignup";
import Modal from "./components/Modal";
import Notification from "./components/Notification";

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
        <Route path="message" element={<Message />} />
      </Route>

      <Route path="/admin" element={<Admin />}>
        {/* <Route index path="login" element={<Login />} /> */}
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="add-listing"
          // action={AddListingAction}
          element={<AddListing />}
        />
        <Route path="messages" element={<Messages />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <Modal />
      <Notification />
      <AdminContextProvider>
        <RouterProvider router={router} />
      </AdminContextProvider>
    </div>
  );
}

export default App;
/*
//PACKAGES

npm i @emotion/react @emotion/styled @faker-js/faker @mui/icons-material @mui/material apisauce chart.js faker leaflet lottie-react mime moment prop-types react-calendar react-chartjs-2 react-charts  react-icons react-leaflet react-range-slider-input react-responsive-carousel react-router-dom react-select react-textarea-autosize react-transition-group socket.io-client timeago.js

*/
