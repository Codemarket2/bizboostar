import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";
import { client } from "../../graphql/index";
import YelpTable from "./YelpTable";
import YelpTable2 from "./YelpTable2";

const RUN_YELP_TASK = gql`
  mutation RunYelpTask(
    $userId: String!
    $scraperName: String!
    $keyword: String!
    $city: String!
    $startLimit: String!
    $endLimit: String!
  ) {
    runYelpTask(
      userId: $userId
      scraperName: $scraperName
      keyword: $keyword
      city: $city
      startLimit: $startLimit
      endLimit: $endLimit
    )
  }
`;

const GET_ALL_YELP_DATA = gql`
  query GetAllYelpData($userid: String!) {
    getAllYelpData(userid: $userid) {
      _id
      city
      keywords
      name
      status
      limit
      email_counter
      collection_of_email_scraped {
        Address_line1
        emails
        business_name
        city
        keyword
        postal_code
        state
        # telephone
        website_link
      }
    }
  }
`;

const YelpForm = ({ dispatch, authenticated, userId }) => {
  const [runYelpTask] = useMutation(RUN_YELP_TASK);
  const [disabled, setDisabled] = useState(false);
  const [allData, setAllData] = useState([]);
  const [oneRow, setOneRow] = useState({});
  const [showRow, setShowRow] = useState(false);

  const [payload, setPayload] = useState({
    scraperName: "",
    keyword: "",
    city: "",
    startLimit: "",
    endLimit: "",
  });

  const getData = async () => {
    dispatch(showLoading());

    client
      .query({
        query: GET_ALL_YELP_DATA,
        variables: { userid: userId },
      })
      .then(({ data }) => {
        setAllData(data.getAllYelpData);
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoading());
      setDisabled(true);
      const response = await runYelpTask({
        variables: {
          userId: userId,
          scraperName: payload.scraperName,
          keyword: payload.keyword,
          city: payload.city,
          startLimit: payload.startLimit,
          endLimit: payload.endLimit,
        },
      });
      setAllData([
        ...allData,
        {
          _id: "new",
          city: payload.city,
          keywords: [payload.keyword],
          name: payload.scraperName,
          status: "Scraping Started",
          limit: payload.startLimit,
          email_counter: 0,
          collection_of_email_scraped: [],
        },
      ]);
      dispatch(hideLoading());
      setDisabled(false);
      if (response.data.runYelpTask.includes("Scraping Started")) {
        alert("Scraping Started");
      } else {
        alert("Something went wrong please try again");
      }
    } catch (error) {
      dispatch(hideLoading());
      setDisabled(false);
      alert("Something went wrong please try again");
    }
  };

  return (
    <div className="py-5">
      <h1 className="text-center">Yelp Scraper</h1>
      <Form className="mt-3 container" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="scraperName"
            placeholder="Scraper Name"
            value={payload.scraperName}
            onChange={(e) =>
              setPayload({ ...payload, scraperName: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="keyword"
            placeholder="Keyword"
            value={payload.keyword}
            onChange={(e) =>
              setPayload({ ...payload, keyword: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={payload.city}
            onChange={(e) => setPayload({ ...payload, city: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="startLimit"
            placeholder="Start Limit"
            value={payload.startLimit}
            onChange={(e) =>
              setPayload({ ...payload, startLimit: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="endLimit"
            placeholder="End Limit"
            value={payload.endLimit}
            onChange={(e) =>
              setPayload({ ...payload, endLimit: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button
          type="submit"
          style={{ pointerEvents: disabled ? "none" : "auto" }}
          color="primary"
          block
        >
          {disabled ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Start Scraping"
          )}
        </Button>
      </Form>
      {showRow ? (
        <YelpTable2 setShowRow={setShowRow} products={oneRow} />
      ) : (
        <YelpTable
          setShowRow={setShowRow}
          setOneRow={setOneRow}
          allData={allData}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(YelpForm);
