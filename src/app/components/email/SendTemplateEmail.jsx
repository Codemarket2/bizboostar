import React, { useState, useEffect } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { client } from "../../graphql/index";
import TemplateTable from "./CampaignTable";

const Create_One_Email_Campaign = gql`
  mutation CreateOneEmailCampaign(
    $userId: String!
    $campaignName: String!
    $mailingList: String!
    $templateName: String!
    $defaultTemplateData: YelpEmailScrapedInput
    $defaultTags: [DefaultTagsInput]
    $collection_of_email_scraped: [YelpEmailScrapedInput]
  ) {
    createOneEmailCampaign(
      userId: $userId
      campaignName: $campaignName
      mailingList: $mailingList
      templateName: $templateName
      defaultTemplateData: $defaultTemplateData
      defaultTags: $defaultTags
      collection_of_email_scraped: $collection_of_email_scraped
    ) {
      _id
      campaignName
      mailingList
      templateName
      createdAt
    }
  }
`;

const GET_ALL_EMAILS = gql`
  query GetAllEmails {
    getAllEmails {
      _id
      emails
      businessName
    }
  }
`;

const GET_ALL_CAMPAIGNS = gql`
  query GetAllEmailCampaignsByUserId($userId: String!) {
    getAllEmailCampaignsByUserId(userId: $userId) {
      _id
      campaignName
      mailingList
      templateName
      createdAt
    }
  }
`;
const GET_ALL_EMAIL_TEMPLATES = gql`
  query GetAllEmailTemplatesByUserId($userId: String!) {
    getAllEmailTemplatesByUserId(userId: $userId) {
      _id
      htmlPart
      subjectPart
      templateName
      textPart
    }
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

const customList = {
  label: "customList",
  value: [
    {
      business_name: "Grace Counseling Group",
      website_link: "http://gracecounselinggroup.com",
      emails: ["contactvivekvt@gmail.com"],
      telephone: 5625985991,
      postal_code: 90505,
      state: "CA",
      city: "Torrance",
      keyword: "Therapist",
      Address_line1: "23670 Hawthorne Blvd",
    },
    {
      business_name: "Codemarket",
      website_link: "http://codemarket.io",
      emails: ["contactvivekvt@gmail.com", "vivek78643@gmail.com"],
      telephone: 5625985991,
      postal_code: 90505,
      state: "CA",
      city: "Mumbai",
      keyword: "Therapist",
      Address_line1: "23670 Hawthorne Blvd",
    },
  ],
};

const SendTemplateEmail = (props) => {
  const [createOneEmailCampaign] = useMutation(Create_One_Email_Campaign);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allTemplate, setAllTemplate] = useState([]);
  const [allMailingList, setAllMailingList] = useState([]);

  const [payload, setPayload] = useState({
    campaignName: "",
    mailingList: "",
    defaultTemplateData: {
      business_name: "Codemarket",
      website_link: "http://codemarket.io",
      telephone: 5625985991,
      postal_code: 90505,
      state: "CA",
      city: "Torrance",
      keyword: "Therapist",
      Address_line1: "23670 Hawthorne Blvd",
    },
    defaultTags: [
      {
        Name: "Name",
        Value: "Codemarket",
      },
    ],
    templateName: "",
    collection_of_email_scraped: [],
  });

  const getData = async () => {
    try {
      props.dispatch(showLoading());
      setIsLoading(true);
      const { data } = await client.query({
        query: GET_ALL_CAMPAIGNS,
        variables: { userId: props.userId },
      });
      const data2 = await client.query({
        query: GET_ALL_EMAIL_TEMPLATES,
        variables: { userId: props.userId },
      });
      const data3 = await client.query({
        query: GET_ALL_YELP_DATA,
        variables: { userid: props.userId },
      });
      setAllData(data.getAllEmailCampaignsByUserId);
      setAllTemplate(
        data2.data.getAllEmailTemplatesByUserId.map((t) => ({
          value: t.templateName,
          label: t.templateName,
        }))
      );
      let tempML = data3.data.getAllYelpData.map((y) => ({
        value: y.collection_of_email_scraped,
        label: y.name,
        isDisabled: y.name === "TestMailingList" ? false : true,
      }));
      setAllMailingList([customList, ...tempML]);
      setIsLoading(false);
      props.dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      props.dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const omitTypename = (key, value) =>
    key === "__typename" ? undefined : value;

  const handleSelectMailingList = (selectedOption) => {
    setPayload({
      ...payload,
      collection_of_email_scraped: JSON.parse(
        JSON.stringify(selectedOption.value),
        omitTypename
      ),
      mailingList: selectedOption.label,
    });
  };

  const handleSelectTemplate = (selectedOption) => {
    setPayload({
      ...payload,
      templateName: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        payload.templateName === "" ||
        payload.mailingList === "" ||
        payload.collection_of_email_scraped.length === 0
      ) {
        return alert("Please select mailing list and template");
      }
      props.dispatch(showLoading());
      setDisabled(true);
      const { data } = await createOneEmailCampaign({
        variables: {
          userId: props.userId,
          campaignName: payload.campaignName,
          mailingList: payload.mailingList,
          templateName: payload.templateName,
          defaultTemplateData: payload.defaultTemplateData,
          defaultTags: payload.defaultTags,
          collection_of_email_scraped: payload.collection_of_email_scraped,
        },
      });
      setAllData([...allData, data.createOneEmailCampaign]);
      alert("Succesfully send!");
      props.dispatch(hideLoading());
      setDisabled(false);
    } catch (error) {
      props.dispatch(hideLoading());
      alert(`Something went wrong. Please try again!`);
      console.log(error);
      setDisabled(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center">LAUNCH CAMPAIGN</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Select
            placeholder={"Select Mailing List"}
            onChange={handleSelectMailingList}
            options={allMailingList}
            isLoading={isLoading}
            required
          />
        </FormGroup>
        <FormGroup>
          <Select
            placeholder={"Select Email Template"}
            onChange={handleSelectTemplate}
            isLoading={isLoading}
            options={allTemplate}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="campaignName"
            placeholder="Campaign Name"
            value={payload.campaignName}
            onChange={(e) =>
              setPayload({ ...payload, campaignName: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button disabled={disabled} type="submit" color="primary" block>
          {disabled ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "LAUNCH EMAIL CAMPAIGN"
          )}
        </Button>
      </Form>
      <TemplateTable allData={allData} />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(SendTemplateEmail);
