import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { ChatRightText, Share, ThreeDots } from "react-bootstrap-icons";
import { useEffect } from "react";

import {
  addToLikesAction,
  fetchPostsAction,
  removeFromLikesAction,
} from "../actions";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as liked } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as disliked } from "@fortawesome/free-regular-svg-icons";

const PostCard = () => {
  let prof = useAppSelector((state) => state.myProfile.results);
  console.log(prof);
  const post = useAppSelector((state) => state.posts.results);
  console.log(post);
  const isLiked = useAppSelector((state) => state.likes.results);
  // const profiles = useAppSelector((state) => state.allProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostsAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <Row>
      {Array.isArray(post) && post.length > 0 ? (
        post
          .slice(0)
          .reverse()
          .map((singlePost) => (
            <Col className="mt-3 sub-sections" xs={12} key={singlePost._id}>
              <div className="d-flex justify-content-between mt-2">
                <div className="d-flex" style={{ gap: "5px" }}>
                  <img
                    src={singlePost.user.image}
                    alt="vh"
                    height="40px"
                    width="40px"
                    className="mt-n4"
                  />
                  <div>
                    <span
                      style={{
                        lineHeight: "24px",
                        fontWeight: "600",
                        color: "rgba(0, 0, 0, 0.9)",
                        fontSize: "16px",
                      }}
                    >
                      {singlePost.username}
                    </span>
                    <p className="place mb-n1">{singlePost.user.title}</p>

                    <p className="place">
                      {moment(singlePost.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                {prof._id === singlePost.user._id ? (
                  <Dropdown className="drop-down mt-n5 mr-n3">
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      size="sm"
                    >
                      <ThreeDots color="black" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Edit post</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Delete post
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <ThreeDots className="mt-n5" />
                )}
              </div>
              <p className="about">{singlePost.text}</p>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <div className="about" id="like">
                  {isLiked.some(
                    (likedPost) => likedPost._id === singlePost._id
                  ) ? (
                    <FontAwesomeIcon
                      icon={liked}
                      style={{ color: "rgb(92, 153, 214)" }}
                      onClick={() =>
                        dispatch(removeFromLikesAction(singlePost._id))
                      }
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={disliked}
                      onClick={() => dispatch(addToLikesAction(singlePost))}
                    />
                  )}
                  Like
                </div>
                <div className="about">
                  {" "}
                  <ChatRightText className="mr-1" /> Comment
                </div>
                <div className="about">
                  {" "}
                  <Share className="mr-1" /> Share{" "}
                </div>
              </div>
            </Col>
          ))
      ) : (
        <p>No posts found.</p>
      )}
    </Row>
  );
};
export default PostCard;
