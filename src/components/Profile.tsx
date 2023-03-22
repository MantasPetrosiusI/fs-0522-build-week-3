import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";

import { CameraFill } from "react-bootstrap-icons";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { Pencil } from "react-bootstrap-icons";

import { editMyProfileAction, fetchMyProfileAction } from "../actions";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setEditProfile(prof);
  };
  const [file, setFile] = useState<File | null>(null);

  let prof = useAppSelector((state) => state.myProfile.results);
  //let userID = prof._id;
  let userID = `641844deefc7760838a46517`;
  const [editprofile, setEditProfile] = useState({
    name: "",
    surname: "",
    area: "",
    image: "",
    title: "",
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setChanged(true);
    if (file) {
      handleImageUpload(file, userID);
    }
    await dispatch(editMyProfileAction(editprofile, userID));
    handleClose();
  };

  const handleImageUpload = async (file: any, userID: string) => {
    try {
      const formData = new FormData();
      formData.append("image", file, userID);

      let response = await fetch(
        process.env.REACT_APP_BE_URL + `/users/${userID}/image`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("You made it!");
      } else {
        console.log("Try harder!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleImageUpload(file, userID);
    dispatch(fetchMyProfileAction(userID));
    setTimeout(() => {
      setChanged(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  return (
    <Container>
      <Row>
        <Col className="main">
          <div className="cover">
            <div className="profile-pic">
              <img src={prof ? prof.image : ""} alt="" />
            </div>
            <div className="d-flex align-items-center justify-content-center camera p-2">
              <CameraFill />
            </div>
          </div>

          <Row className="mt-5" style={{ paddingInline: "23px" }}>
            <Col xs={8}>
              <h4 className="name">
                {prof ? prof.name + " " + prof.surname : ""}
              </h4>
              <p className="sub mt-n1 mb-n1 ">{prof ? prof.title : ""}</p>
              <span className="place ">
                {prof ? prof.area : ""} ∙
                <a href="#home" className="ml-1 link-connections">
                  Contact info
                </a>
              </span>
              <p className="connections mt-2 mb-1">
                <a href="#home" className="link-connections">
                  486 connections
                </a>
              </p>
              <div
                className="d-flex justify-content-evenly align-items-start jumbotron-btns"
                style={{ gap: "10px" }}
              >
                <Button variant="primary" className="rounded-pill">
                  Open to
                </Button>
                <Button variant="outline-primary" className="rounded-pill">
                  Add Profile Section
                </Button>
                <Button variant="outline-secondary" className="rounded-pill">
                  More
                </Button>
              </div>
            </Col>
            <Col xs={4}>
              <div className="icons-bg-hover ml-auto">
                <Pencil onClick={handleShow} />
              </div>
              <Modal
                show={show}
                onHide={handleClose}
                scrollable
                className="add-exp-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit intro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label className="place">First name</Form.Label>
                      <Form.Control
                        type="text"
                        className="inputs"
                        placeholder="First name"
                        value={editprofile.name}
                        onChange={(e) => {
                          setEditProfile({
                            ...editprofile,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="place">Last name</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="text"
                        placeholder="last name"
                        value={editprofile.surname}
                        onChange={(e) => {
                          setEditProfile({
                            ...editprofile,
                            surname: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="place">City,Country</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="text"
                        placeholder="place"
                        value={editprofile.area}
                        onChange={(e) => {
                          setEditProfile({
                            ...editprofile,
                            area: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="place">Title</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="text"
                        placeholder="title"
                        value={editprofile.title}
                        onChange={(e) => {
                          setEditProfile({
                            ...editprofile,
                            title: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="place">
                        Choose profile picture
                      </Form.Label>
                      <Form.Control
                        className="inputs"
                        type="file"
                        onChange={handleFileUpload}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    style={{ fontSize: "14px" }}
                    className="rounded-pill py-1 px-2"
                    variant="primary"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>

          <Row style={{ padding: "15px 23px" }}>
            <Col xs={12}>
              <div className="open-to-work mt-3 d-flex flex-column mb-2 align-items-start">
                <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                  Open to work
                </h6>
                <p className="mb-n1 mt-n1 truncate">
                  Computer Science Engineer, Trainee, Intern, Test Engineer and
                  Quality Assurance Analyst roles
                </p>
                <a href="#home" className="link">
                  {" "}
                  See all details
                </a>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
