import React from "react";
import { Table } from "react-bootstrap";
import { Trash, Edit2, ToggleLeft, ToggleRight } from "react-feather";
import Link from "next/link";

const TemplateTable = ({ allData, handleEdit, handleDelete, disabled }) => {
  return allData.length > 0 ? (
    <div className="mt-3">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Template Name</th>
            <th className="text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <a>{r.templateName}</a>
                </td>
                <td className="text-center">
                  <Edit2
                    style={{
                      cursor: "pointer",
                      pointerEvents: disabled ? "none" : "auto",
                    }}
                    onClick={() => handleEdit(r)}
                  />
                  <Trash
                    style={{
                      cursor: "pointer",
                      pointerEvents: disabled ? "none" : "auto",
                    }}
                    onClick={() => handleDelete(r)}
                    className="ml-2"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  ) : null;
};

export default TemplateTable;
