import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  XAxis,
  YAxis,
} from "react-vis";

function App() {
  const [newCasesPerDay, setNewCasesPerDay] = useState([]);
  const [newTestsPerDay, setNewTestsPerDay] = useState([]);
  useEffect(() => {
    fetch("https://onemocneni-aktualne.mzcr.cz/api/v1/covid-19/nakaza.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const modifiedDataArray = data.map((day) => {
          return { x: new Date(day.datum), y: day.pocetDen };
        });
        setNewCasesPerDay([...modifiedDataArray]);
      });

    fetch("https://onemocneni-aktualne.mzcr.cz/api/v1/covid-19/testy.json")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const data = response.data;

        const modifiedDataArray = data.map((day) => {
          const dateArr = day.datum.split(".");
          const date = new Date(`${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`);
          return {
            x: new Date(date),
            y: day["testy-den"] / 5,
          };
        });
        setNewTestsPerDay([...modifiedDataArray]);
      });
  }, []);

  const mockData = [
    { x: new Date("2020-01-27"), y: 0 },
    { x: new Date("2020-01-28"), y: 44 },
    { x: new Date("2020-01-29"), y: 178 },
    { x: new Date("2020-01-30"), y: 248 },
    { x: new Date("2020-01-31"), y: 366 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <XYPlot xType="time" width={1000} height={300}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="X Axis" />
          <YAxis title="Y Axis" />
          <LineSeries data={newCasesPerDay} />
          <LineSeries data={newTestsPerDay} />
        </XYPlot>
        <XYPlot xType="time" height={300} width={1000}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="X Axis" />
          <YAxis title="Y Axis" />
          <VerticalBarSeries data={mockData} />
        </XYPlot>
      </header>
    </div>
  );
}

export default App;
