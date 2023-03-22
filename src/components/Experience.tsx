import React from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import { useEffect } from "react";
import { Plus, Pencil } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  deleteJobAction,
  editJobAction,
  fetchExperienceAction,
  postJobAction,
} from "../actions";
import { useState } from "react";
import { IExperience } from "../interfaces/IExperience";
import { parseISO, format } from "date-fns";

let expToEdit: string;
let newexpID: string;

const Experience = () => {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [fileForNewExp, setFileForNewExp] = useState<File | null>(null);
  const [job, setJob] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    stillWorkingHere: true,
    description: "",
    area: "",
    image: "",
  });

  const [showRole, setShowRole] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  let exp = useAppSelector((state) => state.experience.results);

  const dispatch = useAppDispatch();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const uploadPictureForNewExp = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setFileForNewExp(files[0]);
    } else {
      setFileForNewExp(null);
    }
  };
  const editJob = async (id: string) => {
    let jobtoEdit = exp.find((j: IExperience) => j._id === id);

    setJob(jobtoEdit);
    expToEdit = id;
  };
  let prof = useAppSelector((state) => state.myProfile.results);
  let userID = prof._id;

  const handleSubmit2 = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    setChanged(true);
    if (file) {
      handleImageUpload(file, expToEdit, userID);
    }

    await dispatch(editJobAction(job, expToEdit, userID));

    handleClose2();
  };

  const handleImageUpload = async (
    file: any,
    expId: string,
    userID: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("expImg", file);

      let response = await fetch(
        process.env.REACT_APP_BE_URL +
          `/users/${userID}/experiences/${expId}/image`,

        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("You made it!");
        console.log(job);
      } else {
        console.log("Try harder!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setJob({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      stillWorkingHere: true,
      description: "",
      area: "",
      image: "",
    });
    setShow(true);
  };

  const handleClose2 = () => setShow2(false);

  const handleShow2 = (id: string) => {
    setShow2(true);
    editJob(id);
  };

  useEffect(() => {
    dispatch(fetchExperienceAction(userID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    handleImageUpload(file, expToEdit, userID);
    NewExpImageUpload(fileForNewExp, newexpID, userID);
    dispatch(fetchExperienceAction(userID));
    setTimeout(() => {
      setChanged(false);
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setShowRole(false);
    setShowCompany(false);
    setShowDate(false);
    setShowDescription(false);
    setShowLoc(false);

    let newexp = await dispatch(postJobAction(job, userID));
    newexpID = newexp._id;
    if (file) {
      NewExpImageUpload(fileForNewExp, newexpID, userID);
    }

    setChanged(true);
    handleClose();
  };

  const NewExpImageUpload = async (
    fileForNewExp: any,
    newexpID: string,
    userID: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("imgExp", fileForNewExp);

      let response = await fetch(
        process.env.REACT_APP_BE_URL +
          `/users/${userID}/experiences/${newexpID}/image`,

        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
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
    <Container className="mb-1">
      <Row>
        <Col className="mt-2 sub-sections" style={{ paddingInline: "0" }}>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ paddingInline: "15px" }}
          >
            <h4 className="name pt-4 mb-n1 px-2">Experience</h4>
            <div className="icons-bg-hover">
              <Plus size={30} onClick={handleShow} />
              <Modal
                show={show}
                onHide={handleClose}
                scrollable
                className="add-exp-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label className="place">Title*</Form.Label>
                      <Form.Control
                        className="inputs mb-n1"
                        // className={
                        //   job.role.length === 0 ? "inputs error" : "inputs"
                        // }
                        type="text"
                        placeholder="Ex:Retail Sales Manager"
                        value={job.role}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            role: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {showRole && (
                      <span className="error ">Title is a required field</span>
                    )}
                    <Form.Group>
                      <Form.Label className="place">Company name*</Form.Label>
                      <Form.Control
                        type="text"
                        className="inputs"
                        placeholder="Ex:Microsoft"
                        value={job.company}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            company: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {showCompany && (
                      <span className="error ">
                        Company name is a required field
                      </span>
                    )}

                    <Form.Group>
                      <Form.Label className="place">Start date</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="date"
                        value={job.startDate}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            startDate: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {showDate && (
                      <span className="error ">
                        Start date is a required field
                      </span>
                    )}
                    <Form.Group>
                      <Form.Check
                        className="place"
                        type="checkbox"
                        label="I'm working here right now"
                        checked={job.stillWorkingHere}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            stillWorkingHere: e.target.checked,
                          });
                        }}
                      />
                    </Form.Group>
                    {job.stillWorkingHere === false && (
                      <Form.Group>
                        <Form.Label className="place">End date</Form.Label>
                        <Form.Control
                          className="inputs"
                          type="date"
                          value={job.endDate}
                          onChange={(e) => {
                            setJob({
                              ...job,
                              endDate: e.target.value,
                            });
                          }}
                        />
                      </Form.Group>
                    )}
                    <Form.Group>
                      <Form.Label
                        className="place "
                        style={{ backgroundColor: "white" }}
                      >
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter description"
                        value={job.description}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            description: e.target.value,
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
                    {showDescription && (
                      <span className="error ">
                        Description is a required field
                      </span>
                    )}

                    <div className="d-flex justify-content-end place">
                      <span>{counter}</span>
                      <span>/</span>
                      <span>300</span>
                    </div>
                    <Form.Group>
                      <Form.Label className="place">Location</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="text"
                        placeholder="Ex:London, United Kingdom"
                        value={job.area}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            area: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {showLoc && (
                      <span className="error ">
                        Location is a required field
                      </span>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label className="place">
                        Choose profile picture
                      </Form.Label>
                      <Form.Control
                        className="inputs"
                        type="file"
                        onChange={uploadPictureForNewExp}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    style={{ fontSize: "14px" }}
                    variant="primary"
                    onClick={handleSubmit}
                    className="rounded-pill py-1 px-2"
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <ListGroup className="mt-4 list-exp ">
            {exp.map((ex: IExperience) => (
              <>
                <ListGroup.Item key={ex._id} className="pt-2 experience">
                  <div
                    className="d-flex align-items-start"
                    style={{ gap: "5px", paddingInline: "8px" }}
                  >
                    <div>
                      <img
                        src={ex.image ? ex.image : ""}
                        alt=""
                        height="40px"
                        width="40px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h6 style={{ fontWeight: "600", paddingInline: "10px" }}>
                        {ex.role}
                      </h6>
                      <p
                        className="about mb-0 mt-n1"
                        style={{ paddingInline: "10px" }}
                      >
                        {ex.company}
                      </p>
                      <p
                        className="place mb-0"
                        style={{ paddingInline: "10px" }}
                      >
                        {" "}
                        {format(parseISO(ex.startDate), "MMMM, yyyy")} -{" "}
                        {ex.endDate === null || ex.endDate === undefined
                          ? "Present"
                          : format(parseISO(ex.endDate), "MMMM, yyyy")}
                      </p>
                      <p
                        className="place mb-0"
                        style={{ paddingInline: "10px" }}
                      >
                        {ex.area}
                      </p>
                    </div>
                    <div
                      className="icons-bg-hover ml-auto"
                      style={{ marginRight: "-.6rem" }}
                    >
                      <Pencil
                        onClick={() => {
                          handleShow2(ex._id);
                        }}
                      />
                    </div>

                    <Modal
                      show={show2}
                      onHide={handleClose2}
                      scrollable
                      className="add-exp-modal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Experience</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Label className="place">Title*</Form.Label>
                            <Form.Control
                              type="text"
                              className="inputs"
                              placeholder="Ex:Retail Sales Manager"
                              value={job.role}
                              onChange={(e) => {
                                setJob({
                                  ...job,
                                  role: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="place">
                              Company name*
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="inputs"
                              placeholder="Ex:Microsoft"
                              value={job.company}
                              onChange={(e) => {
                                setJob({
                                  ...job,
                                  company: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label className="place">
                              Start date
                            </Form.Label>
                            <Form.Control
                              className="inputs"
                              type="date"
                              value={job.startDate}
                              onChange={(e) => {
                                setJob({
                                  ...job,
                                  startDate: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Check
                              className="place"
                              type="checkbox"
                              label="I'm working here right now"
                              checked={job.stillWorkingHere}
                              onChange={(e) => {
                                setJob({
                                  ...job,
                                  stillWorkingHere: e.target.checked,
                                });
                              }}
                            />
                          </Form.Group>
                          {job.stillWorkingHere === false && (
                            <Form.Group>
                              <Form.Label className="place">
                                End date
                              </Form.Label>
                              <Form.Control
                                className="inputs"
                                type="date"
                                value={job.endDate}
                                onChange={(e) => {
                                  setJob({
                                    ...job,
                                    endDate: e.target.value,
                                  });
                                }}
                              />
                            </Form.Group>
                          )}

                          <Form.Group>
                            <Form.Label
                              className="place"
                              style={{ backgroundColor: "white" }}
                            >
                              description
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={5}
                              placeholder="Enter description"
                              value={job.description}
                              onChange={(e) => {
                                setJob({
                                  ...job,
                                  description: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="place">Location</Form.Label>
                            <Form.Control
                              type="text"
                              className="inputs"
                              placeholder="Ex:London, United Kingdom"
                              value={job.area}
                              onChange={(e) => {
                                setJob({
                                  ...job,
                                  area: e.target.value,
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
                        <div>
                          <Button
                            style={{ fontSize: "14px" }}
                            variant="light"
                            className=" py-1 px-2 "
                            onClick={() => {
                              dispatch(deleteJobAction(userID, expToEdit));
                              handleClose2();
                              setChanged(true);
                              // eslint-disable-next-line no-restricted-globals
                              // location.reload();
                            }}
                          >
                            Delete Experience
                          </Button>

                          <Button
                            style={{ fontSize: "14px" }}
                            variant="primary"
                            className="rounded-pill py-1 px-2"
                            onClick={(e) => {
                              handleSubmit2(e);
                              setChanged(true);
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </ListGroup.Item>
                {exp.indexOf(ex) < exp.length - 1 ? (
                  <hr style={{ width: "90%" }} />
                ) : (
                  ""
                )}
              </>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default Experience;
