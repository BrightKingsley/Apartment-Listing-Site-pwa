import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
// console.log("width", window.innerWidth);
let windowWidth;

export const options = {
  maintainAspectRatio: false,
  // responsive: windowWidth > 640 ? true : false,
  responsive: false,
  borderWidth: 1.5,
  // scales: {
  //   x: {
  //     grid: {
  //       display: false,
  //     },
  //   },
  //   y: {
  //     grid: {
  //       display: false,
  //     },
  //   },
  // },
  borderJoinStyle: "round",
  tension: 0.4,
  radius: 4,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
  },
};

// const labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export const data = {
  labels,
  datasets: [
    {
      fill: {
        target: "origin",
        above: "#ff6f004d", // Area will be red above the origin
      },
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 99 })),
      borderColor: "rgb(255, 111, 0)",
      backgroundColor: "rgb(255, 111, 0)",
    },
    {
      fill: {
        target: "origin",
        above: "#07594b4d", // Area will be red above the origin
        // below: "red", // And blue below the origin
      },

      label: "Dataset 1",
      borderColor: "#0b947e",
      backgroundColor: "#0b947e",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 99 })),
    },
  ],
};

// const res = data.datasets
//   .map((set, i) => {
//     console.log("set" + (i + 1), set.data);
//     return set.data;
//   })
//   .reduce((acc, curr) => {
//     console.log("acc=", acc);
//     console.log("curr", curr);
//     return curr;
//   });
// console.log("res", res);
data.datasets.sort(
  (a, b) =>
    b.data.reduce((acc, curr) => acc + curr) -
    a.data.reduce((acc, curr) => acc + curr)
);

const Chart = () => {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener("resize", (e) => {
      // console.log(e.target);
      console.log("WINDOW", windowWidth);
      setWidth(window.innerWidth);
      windowWidth = window.innerWidth;
    });
  }, [width]);

  return (
    <div
      style={{
        overflowX: "scroll",
      }}
    >
      <Line
        // width={width < 640 ? labels.length * 50 :labels.length * 50}
        width={800}
        options={options}
        data={data}
      />

      {/* <Line width={window.innerWidth} options={options} data={data} /> */}

      {/* <Line width="400px" options={options} data={data} /> */}

      {/* <Line options={options} data={data} /> */}
    </div>
  );
};
export default Chart;
