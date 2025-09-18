
import React from "react";
import TrailingReturns from "../../components/trailingReturns/trailingReturns";
import EquityChart from "../../components/equityCharts/equityChart";
import profileData from "./../../data/profileData.json"

export default function Portfolio() {
  const { month_end, monthly_by_year, trailing, current_dd, max_dd, first_date, last_date } = profileData;

  return (
    <div className="home-container">
      <h1>Portfolio</h1>
        <div>
          <TrailingReturns data={profileData} />
          <EquityChart data={month_end} last_date={last_date} first_date={first_date} />
        </div>
    </div>
  );
}
