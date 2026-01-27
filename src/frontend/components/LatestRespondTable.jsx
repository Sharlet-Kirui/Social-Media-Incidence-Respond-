import React from "react";

const LatestRespondedTable = () => {
  const data = [
    { platform: "X", account: "@user1", issue: "Impersonation", date: "2026-01-25", status: "Responded" },
    { platform: "Meta", account: "@user2", issue: "Fake Account", date: "2026-01-24", status: "Responded" },
  ];

  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Platform</th>
          <th>Account</th>
          <th>Issue</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.platform}</td>
            <td>{item.account}</td>
            <td>{item.issue}</td>
            <td>{item.date}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LatestRespondedTable;
