import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/feed.css";
import { fetchMyProfileAction } from "../actions";
import { useAppDispatch } from "../hooks/hooks";
import "../css/SidebarStyles.css";
import FeedSidebar from "./FeedSidebar";
import StartPost from "./StartPost";
import PostCard from "./PostCard";
import LeftFeedCard from "./LeftFeedCards";
import FeedFooter from "./FeedFooter";
import { useParams } from "react-router-dom";

export const Feed = () => {
  const { userID } = useParams();
  const dispatch = useAppDispatch();

  const [addedNewPost, setAddedNewPost] = useState(false);
  useEffect(() => {
    if (userID !== undefined) {
      dispatch(fetchMyProfileAction(userID));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  return (
    <Container className="mt-3 mb-4">
      <Row>
        <Col id="col1" className="col col-sm-3">
          <LeftFeedCard />
        </Col>
        <Col className="col-12 col-sm-5">
          <StartPost addedNewPost={setAddedNewPost} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: "1em",
            }}
          >
            <hr id="postHr"></hr>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="select"
                className="leftCard"
                style={{ marginRight: "0.25em", marginLeft: "0.22em" }}
              >
                Sort by:
              </label>
              <select id="select">
                <option value="A">Recent</option>
                <option value="B">Top</option>
              </select>
            </div>
          </div>
          <PostCard reloadPosts={addedNewPost} addedNewPost={setAddedNewPost} />
        </Col>
        <Col className="col-12 col-sm-4 px-4 profiles-container">
          <FeedSidebar />
          <FeedFooter />
        </Col>
      </Row>
    </Container>
  );
};
