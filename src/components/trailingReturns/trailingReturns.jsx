import React from 'react';
import { pct } from '../../utils/format';
import "./trailingReturns.css"

export default function TrailingReturns({ data }) {
  if (!data || !data.trailing) return null;

  const { trailing, current_dd, max_dd } = data;
  const labels = ['YTD', '1D', '1W', '1M', '3M', '6M', '1Y', '3Y', 'SI'];
  const names = ['Focused', 'NIFTY50'];

  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <h4 class>Trailing Returns</h4>
      <table className="table trailing-returns-table">
        <thead>
          <tr>
            <th>NAME</th>
            {labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
            <th>DD</th>
            <th>MAXDD</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name}>
              <td>{name}</td>
              {labels.map((label) => (
                <td key={label + name}>
                  {trailing[name] && trailing[name][label] !== null
                    ? pct(trailing[name][label])
                    : '--'}
                </td>
              ))}
              <td>{pct(current_dd)}</td>
              <td>{pct(max_dd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='note'>Note: Return above 1 year is annualised.</div>
    </div>
  );
}
