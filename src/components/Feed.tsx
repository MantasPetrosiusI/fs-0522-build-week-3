import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/feed.css";
import { fetchMyProfileAction, fetchPostsAction } from "../actions";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import "../css/SidebarStyles.css";
import FeedSidebar from "./FeedSidebar";
import StartPost from "./StartPost";
import PostCard from "./PostCard";
import LeftFeedCard from "./LeftFeedCards";
import FeedFooter from "./FeedFooter";
import { IPost } from "../interfaces/IPost";

export const Feed = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.results);

  const [addedNewPost, setAddedNewPost] = useState(false);

  useEffect(() => {
    dispatch(fetchMyProfileAction());
    dispatch(fetchPostsAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPostsAction());
    }, 120000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {posts ? (
            posts
              .slice(0)
              .reverse()
              .map((post: IPost) => {
                return (
                  <PostCard
                    key={post._id}
                    reloadPosts={addedNewPost}
                    addedNewPost={setAddedNewPost}
                    post={post}
                  />
                );
              })
          ) : (
            <p>Loading...</p>
          )}
        </Col>
        <Col className="col-12 col-sm-4 px-4 profiles-container">
          <FeedSidebar />
          <FeedFooter />
        </Col>
      </Row>
    </Container>
  );
};
