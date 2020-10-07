import React from "react";
import { Table } from "react-bootstrap";
import { Trash, Edit2, ToggleLeft, ToggleRight } from "react-feather";
import Link from "next/link";

const TemplateTable = ({ allData, handleEdit, handleDelete, disabled }) => {
  return allData.length > 0 ? (
    <div className="mt-5">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>MailingList</th>
            <th>TemplateName</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.campaignName}</td>
                <td>{r.mailingList}</td>
                <td>{r.templateName}</td>
                <td>{r.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  ) : null;
};

export default TemplateTable;
