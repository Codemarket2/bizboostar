import React from "react";
import { Table } from "react-bootstrap";
import Link from "next/link";

const YelpTable = ({ allData, setShowRow, setOneRow }) => {
  return allData.length > 0 ? (
    <div className="mt-5 px-4">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Keywords</th>
            <th>City</th>
            <th>Status</th>
            <th>Limit</th>
            <th>Email Countered</th>
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {r.collection_of_email_scraped ? (
                    <a
                      onClick={() => {
                        setOneRow(r);
                        setShowRow(true);
                      }}
                      className="cursor-pointer"
                    >
                      {r.name}
                    </a>
                  ) : (
                    <a>{r.name}</a>
                  )}
                </td>
                <td>{r.keywords[0]}</td>
                <td>{r.city}</td>
                <td>{r.status}</td>
                <td>{r.limit}</td>
                <td>{r.email_counter}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  ) : null;
};

export default YelpTable;
