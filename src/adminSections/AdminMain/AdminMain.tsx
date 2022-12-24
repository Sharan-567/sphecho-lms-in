import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import ReactAPexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
const AdminMain = () => {
  const [totalUsers, setTotalUsers] = useState([6, 10]);
  const [graphSeries, setGraphSeries] = useState([
    {
      name: "Monthly Active Users",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ]);
  const navigate = useNavigate();

  const usersOptions: ApexOptions = {
    labels: ["Authors", "students"],
    colors: ["#D6AF14", "#18B3A7"],
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },

    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200,
    //       },
    //       legend: {
    //         show: false,
    //       },
    //     },
    //   },
    // ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
  };
  const coursesOPtions: ApexOptions = {
    labels: ["Authors", "students"],
    colors: ["#425C5A", "#D6AF14"],
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
  };
  const webinarsOptions: ApexOptions = {
    labels: ["Authors", "students"],
    colors: ["#D6AF14", "#1890B3"],
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
  };

  const GraphOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#D6AF14"],
    xaxis: {
      type: "datetime",
      categories: ["1", "2", "3", "4", "5", "6"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div className="container p-3" style={{ display: "block" }}>
      <Row>
        <Col>
          <div>
            {/* <Button
              onClick={() => navigate("/")}
              className="bg-green text-white"
              style={{ borderRadius: "2rem" }}
            >
              Go to LMS
            </Button> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <div className="p-1 br-2 bg-white">
            <h5 className="b-700 px-3 py-2">Total Users</h5>
            <ReactAPexChart
              options={usersOptions}
              type="donut"
              series={totalUsers}
              height={"10000"}
            />
          </div>
        </Col>
        <Col sm={4}>
          <div className="p-1 br-2 bg-white">
            <h5 className="b-700 px-3 py-2">No of Courses</h5>
            <ReactAPexChart
              options={coursesOPtions}
              type="donut"
              series={totalUsers}
              height={"10000"}
            />
          </div>
        </Col>
        <Col sm={4}>
          <div className="p-1 br-2 bg-white">
            <h5 className="b-700 px-3 py-2">No of Webinars</h5>
            <ReactAPexChart
              options={webinarsOptions}
              type="donut"
              series={totalUsers}
              height={"10000"}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ display: "block" }}>
        <Col className="p-3" sm={12}>
          <div className="br-2 p-1 bg-white">
            <h5 className="px-3 b-700 py-1">Monthly active Users</h5>
            <ReactAPexChart
              options={GraphOptions}
              type="area"
              series={graphSeries}
              height={250}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMain;
