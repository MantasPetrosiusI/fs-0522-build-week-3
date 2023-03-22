import React from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useState, useEffect } from "react";
import { editBioAction, fetchMyProfileAction } from "../actions";
const About = () => {
  const [show, setShow] = useState(false);
  const [about, setAbout] = useState({
    bio: "",
  });
  const [counter, setCounter] = useState(about.bio.length);
  let prof = useAppSelector((state) => state.myProfile.results);
  const [changed, setChanged] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setAbout(prof);
  };
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(editBioAction(about));
    setChanged(true);
    setShow(false);
    // eslint-disable-next-line no-restricted-globals
    // location.reload();
  };
  useEffect(() => {
    dispatch(fetchMyProfileAction());
    setChanged(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  return (
    <Container>
      <Row>
        <Col className="mt-2 sub-sections">
          <div className="d-flex justify-content-between">
            <h4 className="name pt-4 mb-n1 px-2">About</h4>
            <span className="mt-2">
              <div className="icons-bg-hover">
                <Pencil onClick={handleShow} />
              </div>
              <Modal show={show} onHide={handleClose} className="add-exp-modal">
                <Modal.Header closeButton>
                  <Modal.Title>Edit about</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label
                      className="place"
                      style={{ backgroundColor: "white" }}
                    >
                      {" "}
                      You can write about your years of experience, industry, or
                      skills. People also talk about their achievements or
                      previous job experiences.
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={about.bio}
                      onChange={(e) => {
                        setAbout({
                          ...about,
                          bio: e.target.value,
                        });
                      }}
                      onKeyUp={(e: React.KeyboardEvent) => {
                        if (e.keyCode !== 8) {
                          setCounter(counter + 1);
                        } else {
                          setCounter(counter - 1);
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end place">
                    <span>{counter}</span>
                    <span>/</span>
                    <span>300</span>
                  </div>
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
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </span>
          </div>
          <p className="ml-2 mt-3 about">{prof.bio}</p>
        </Col>
      </Row>
    </Container>
  );
};
export default About;
