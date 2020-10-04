import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";

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

const Yelp = ({ dispatch, authenticated, userId }) => {
  const [runYelpTask] = useMutation(RUN_YELP_TASK);
  const [data, setData] = useState();
  const [disabled, setDisabled] = useState(false);

  const [payload, setPayload] = useState({
    scraperName: "",
    keyword: "",
    city: "",
    startLimit: "",
    endLimit: "",
  });

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
      console.log(response);
      console.log(response.data.runYelpTask);
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
    <div className="container py-5">
      <h1 className="text-center">Yelp Scraper</h1>
      <Form className="mt-3" onSubmit={handleSubmit}>
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
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(Yelp);
