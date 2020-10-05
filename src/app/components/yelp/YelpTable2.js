import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const columns = [
  {
    dataField: "business_name",
    text: "Business Name",
  },
  // {
  //   dataField: "Address_line1",
  //   text: "Address_line1",
  // },
  {
    dataField: "city",
    text: "City",
  },
  // {
  //   dataField: "keyword",
  //   text: "keyword",
  // },
  {
    dataField: "postal_code",
    text: "Postal Code",
  },
  {
    dataField: "state",
    text: "State",
  },
  // {
  //   dataField: "telephone",
  //   text: "telephone",
  // },
  // {
  //   dataField: "website_link",
  //   text: "website_link",
  // },
];

const expandRow = {
  onlyOneExpanding: true,
  renderer: (row) => (
    <div>
      <span>
        <small>
          <b>Address : </b>
        </small>
        <small>{row.Address_line1}</small>
      </span>
      <br />
      <span>
        <small>
          <b>Website : </b>
        </small>
        <small>{row.website_link}</small>
      </span>
      <br />
      {row.emails.length > 0 ? (
        <>
          <span>
            <small>
              <b>Emails :</b>
            </small>
          </span>
          <br />
          {row.emails.map((e) => (
            <>
              <span>
                <small>{e}</small>
              </span>
              <br />
            </>
          ))}
        </>
      ) : (
        <span>
          <small>
            <b>No Emails found for this Business</b>
          </small>
        </span>
      )}
    </div>
  ),
};

const YelpTable2 = (props) => {
  return (
    <div className="yelp-table2 table-sm px-3 mt-3">
      <Button
        className="mb-2"
        variant="danger"
        onClick={() => props.setShowRow(false)}
      >
        Back
      </Button>
      <BootstrapTable
        keyField="business_name"
        data={props.products.collection_of_email_scraped}
        columns={columns}
        expandRow={expandRow}
        bordered
        hover
        pagination={paginationFactory()}
      />
    </div>
  );
};

export default YelpTable2;
