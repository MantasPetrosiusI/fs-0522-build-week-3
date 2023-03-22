import React, { useEffect, useState } from "react";
import "../css/Post.css";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { IPost } from "../interfaces/IPost";

interface IProps {
  addedNewPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartPost = (props: IProps) => {
  let profile = useAppSelector((state) => state.myProfile.results);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiUrl = process.env.REACT_APP_BE_URL;
  const userId = process.env.REACT_APP_USER_ID;
  const [postText, setPostText] = useState("");
  const [newPost, setNewPost] = useState<IPost>({});

  const handleOnClick = async () => {
    await createNewPost();
    props.addedNewPost(true);
    handleClose();
  };

  useEffect(() => {
    if (file) {
      handleImageUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const createNewPost = async () => {
    try {
      let response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        body: JSON.stringify({ text: postText, user: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let post = await response.json();
        setNewPost(post);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      console.log(newPost);
      console.log(newPost._id);
      let response = await fetch(`${apiUrl}/posts/${newPost._id}/image`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("You made it!");
      } else {
        console.log("Try harder!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="mt-2">
        <Col className="col-12 p-0">
          <div className="main-container">
            <div className="d-flex">
              <div className="image-container">
                <img src={profile.image} alt="" />
              </div>
              <div className="button-container">
                <Button
                  onClick={handleShow}
                  className="start-post-btn badge-pill"
                >
                  Start a post
                </Button>
              </div>
            </div>
            <div className="d-flex justify-content-between px-2 mt-2 options-container flex-wrap">
              <Button className="option-btn d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                </svg>
                Photo
              </Button>
              <Button className="option-btn d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                </svg>
                Video
              </Button>
              <Button className="option-btn d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"></path>
                </svg>
                Event
              </Button>
              <Button className="option-btn d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
                </svg>
                Write article
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} className="post-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "400", fontSize: "20px" }}>
            Create a post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="image-container">
              <img src={profile.image} alt="" />
            </div>
            <div className="d-flex flex-column align-items-start">
              <span>
                {profile.name} {profile.surname}
              </span>
              <Button
                variant="outline-secondary"
                className="badge-pill py-0 d-flex align-items-center"
              >
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                </svg>
                Anyone
                <svg
                  className="ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <Form.Control
              as="textarea"
              placeholder="What do you want to talk about?"
              className="textarea"
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <svg
              className="mr-1 emoji"
              style={{ fill: "rgba(0, 0, 0, 0.6)", cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M8 10.5A1.5 1.5 0 119.5 12 1.5 1.5 0 018 10.5zm6.5 1.5a1.5 1.5 0 10-1.5-1.5 1.5 1.5 0 001.5 1.5zm7.5 0A10 10 0 1112 2a10 10 0 0110 10zm-2 0a8 8 0 10-8 8 8 8 0 008-8zm-8 4a6 6 0 01-4.24-1.76l-.71.76a7 7 0 009.89 0l-.71-.71A6 6 0 0112 16z"></path>
            </svg>
            <Link className="hashtag-link" to={"/"}>
              Add Hashtag
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mr-auto d-flex" style={{ height: "35px" }}>
            <div className="d-flex align-items-center justify-content-center mr-2">
              <Form.Control
                type="file"
                className="post-image-upload"
                onChange={handleFileUpload}
              />
            </div>
            <div
              style={{ height: "100%", width: "35px" }}
              className="d-flex align-items-center justify-content-center icon-container mr-2"
            >
              {" "}
              <svg
                className="post-icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
              </svg>
            </div>
            <div
              style={{ height: "100%", width: "35px" }}
              className="d-flex align-items-center justify-content-center icon-container mr-2"
            >
              {" "}
              <svg
                className="post-icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M3 3v15a3 3 0 003 3h9v-6h6V3zm9 8H6v-1h6zm6-3H6V7h12zm-2 8h5l-5 5z"></path>
              </svg>
            </div>
          </div>
          <div>
            <Button
              className="py-0"
              style={{ paddingInline: "25px" }}
              variant="primary badge-pill"
              onClick={handleOnClick}
            >
              Post
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StartPost;
