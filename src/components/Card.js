import React, { useState, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Typography,
  Button,
  Tooltip,
  Divider,
  Select
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

//redux
import { useSelector, useDispatch } from "react-redux";
import { handleSearchAPI } from "../reducer";

import View from "./View";

const { Option } = Select;
const { Text, Title } = Typography;

const CardView = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    //Loading animation just for the user experience
    setLoading(true);
    dispatch(handleSearchAPI(search, limit));

    //setTimeout just to show the loading animation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Fragment>
      <Card
        style={{
          margin: "15px",
          borderRadius: "5px"
        }}
        title={
          <Title
            level={2}
            style={{
              textAlign: "center"
            }}
          >
            <Text strong>ITunes API</Text>
          </Title>
        }
        bordered={true}
      >
        <Row>
          <Col offset={8} lg={8} style={{ padding: "8px" }}>
            <Input
              placeholder="Search Artist"
              onChange={e => setSearch(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </Col>
          <Col lg={3} style={{ padding: "10px" }}>
            <Tooltip title="Limit">
              <Select placeholder={<FilterOutlined />} onChange={setLimit}>
                <Option value="10">10</Option>
                <Option value="25">25</Option>
                <Option value="50">50</Option>
              </Select>{" "}
            </Tooltip>
            <Button onClick={handleSearch}>Search</Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <View
            result={!state.reducer.result ? [] : state.reducer.result}
            loading={loading}
          />
        </Row>
      </Card>
    </Fragment>
  );
};

export default CardView;
