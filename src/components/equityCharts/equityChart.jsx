import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './equityChart.css';
import { RiResetLeftFill } from "react-icons/ri";


export default function EquityChart({ data, first_date, last_date }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartKey, setChartKey] = useState(0);

  const redrawChart = () => {
    if (!data || data.length === 0) return;

    const labels = data.map(d => d.date.slice(0, 7));
    const equity = data.map(d => d.equity);
    const nav = data.map(d => d.nav);
    const drawdown = data.map(d => d.drawdown);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Equity (Focused)',
            data: equity,
            borderColor: 'green',
            backgroundColor: 'green',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'NIFTY50',
            data: nav,
            borderColor: 'blue',
            backgroundColor: 'blue',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'Drawdown (Shaded)',
            data: drawdown,
            borderColor: 'red',
            backgroundColor: 'rgba(244, 67, 54, 0.3)',
            borderWidth: 1,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const val = context.parsed.y;
                const label = context.dataset.label;
                if (label.includes('Drawdown')) {
                  const equityVal = equity[context.dataIndex];
                  const peak = Math.max(...equity.slice(0, context.dataIndex + 1));
                  const rawDD = ((equityVal - peak) / peak) * 100;
                  return `${label}: ${rawDD.toFixed(2)}%`;
                }
                return `${label}: ${val.toFixed(2)}`;
              }
            }
          },
          legend: {
            display:false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Value',
            },
          }
        }
      }
    });
  };

  useEffect(() => {
    redrawChart();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartKey]);

  const handleReset = () => {
    setChartKey(prev => prev + 1);
  };

const formatDate = (date) => {
  if (!date) return "";
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toISOString().split('T')[0];
};

  return (
    <div className="card">
<div className="equity-chart-header">
  <div style={{ flexGrow: 1 }}>
    <h4 className="equity-chart-title">Equity Curve</h4>
    <div className="equity-chart-meta">
      <span className="equity-chart-since">Live since 2005-01-31</span>
      <button className="equity-chart-reset-btn" onClick={handleReset}><span><RiResetLeftFill /></span>Reset</button>
    </div>
  </div>

  <div className="equity-chart-dates">
    <div className="equity-chart-date-field">
      <label>From date</label>
      <input className='date' value={formatDate(first_date)} readOnly />
    </div>
    <div className="equity-chart-date-field">
      <label>To date</label>
      <input className='date' value={formatDate(last_date)} readOnly />
    </div>
  </div>
</div>

      <canvas ref={chartRef} style={{width: '1334 rem'}}></canvas>
    </div>
  );
}
