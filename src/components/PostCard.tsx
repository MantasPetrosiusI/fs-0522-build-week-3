import { Row, Col, Dropdown, Modal, Button, Form } from "react-bootstrap";
import { ChatRightText, Share, ThreeDots } from "react-bootstrap-icons";
import { useEffect } from "react";

import {
  addToLikesAction,
  editPostAction,
  fetchPostsAction,
  removeFromLikesAction,
} from "../actions";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";

import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as liked } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as disliked } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import { deletePost } from "../actions";
import React from "react";
import { IPost } from "../interfaces/IPost";

interface IProps {
  reloadPosts: boolean;
  addedNewPost: React.Dispatch<React.SetStateAction<boolean>>;
}
let idToEdit: string;
const PostCard = (props: IProps) => {
  const [show, setShow] = useState(false);
  const [editPost, setEditPost] = useState({
    text: "",
  });

  const handleClose = () => setShow(false);

  const handleShow = (id: string) => {
    const found = post.find((p: IPost) => p._id === id);

    setEditPost(found);
    setShow(true);
    idToEdit = id;
  };
  let prof = useAppSelector((state) => state.myProfile.results);
  const postRaw = useAppSelector((state) => state.posts.results);
  const post = [...postRaw.posts]
  console.log(post)
  const isLiked = useAppSelector((state) => state.likes.results);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchPostsAction());
    setTimeout(() => {
      props.addedNewPost(false);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.reloadPosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPostsAction());
    }, 120000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (file) {
      handleImageUpload(file, idToEdit);
    }

    dispatch(editPostAction(editPost, idToEdit));
    props.addedNewPost(true);
    setShow(false);
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  }


  const handleImageUpload = async (file: any, postId: any) => {
    try {
      const formData = new FormData();
      formData.append("post", file);
      let response = await fetch("https://striveschool-api.herokuapp.com/api/posts/" + postId, {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzZmU0NTExZDczZDAwMTM3YWFhZGUiLCJpYXQiOjE2NzY5MzQ3MjUsImV4cCI6MTY3ODE0NDMyNX0.OlrbIxHrNB0R7dnd4jirS2aUw3YiiJvvDWw2W_1I2f4",
        }
      })
      if (response.ok) {
        console.log("You made it!")
      } else {
        console.log("Try harder!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Row>
      {Array.isArray(post) && post.length > 0 ? (
        post
          .reverse()
          .map((singlePost) => (
            <Col className="mt-3 sub-sections" xs={12} key={singlePost._id}>
              <div className="d-flex justify-content-between mt-3">
                <div className="d-flex">
                  <div className="image-container align-self-start">
                    <img src={singlePost.user.image} alt="vh" />
                  </div>
                  <div>
                    <Link
                      to={"/user/" + singlePost.user._id}
                      className="post-profile-link"
                      style={{
                        lineHeight: "24px",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      {singlePost.username}
                    </Link>
                    <p style={{ fontSize: "12px" }} className="place mb-n1">
                      {singlePost.user.title}
                    </p>

                    <p className="place" style={{ fontSize: "12px" }}>
                      {moment(singlePost.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                {prof._id === singlePost.user._id ? (
                  <>
                    <Dropdown className="drop-down align-self-start">
                      <Dropdown.Toggle
                        variant="secondary"
                        id="dropdown-basic"
                        size="sm"
                        className="special-dropdown icons-bg-hover"
                      >
                        <ThreeDots color="black" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="special-dropdown-menu">
                        <Dropdown.Item
                          onClick={() => {
                            handleShow(singlePost._id);
                          }}
                          style={{ fontWeight: "100", lineHeight: "2" }}
                        >
                          Edit post
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={{ fontWeight: "100", lineHeight: "2" }}
                          onClick={() => {
                            dispatch(deletePost(singlePost._id));
                            props.addedNewPost(true);
                          }}
                        >
                          Delete post
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group>
                          <Form.Label
                            className="place"
                            style={{ backgroundColor: "white" }}
                          >
                            {" "}
                            Edit your post
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={editPost.text}
                            onChange={(e) => {
                              setEditPost({
                                ...editPost,
                                text: e.target.value,
                              });
                            }}
                          />
                          <Form.Control
                            className="inputs"
                            type="file"
                            onChange={handleFileUpload}
                          />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                          style={{ fontSize: "14px" }}
                          className="rounded-pill py-1 px-2"
                        >
                          Update
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                ) : (
                  ""
                )}
              </div>
              <p className="about">{singlePost.text}</p>
              <div className="post-image-container">
                {singlePost.image ? <img src={singlePost.image} alt="" /> : ""}
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <div className="about about-btn p-3" id="like">
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
                <div className="about about-btn p-3">
                  {" "}
                  <ChatRightText className="mr-1" /> Comment
                </div>
                <div className="about about-btn p-3">
                  {" "}
                  <Share className="mr-1" /> Share{" "}
                </div>
              </div>
            </Col>
          ))
      ) : (
        <p>Loading...</p>
      )}
    </Row>
  );
};
export default PostCard;
