import "../css/SidebarStyles.css";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProfilesAction } from "../actions";
// import { setUniqueProfilesAction } from "../actions";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import React from "react";

import { IProfile } from "../interfaces/IProfile";
import { format, parseISO } from "date-fns";
import { ArrowRight } from "react-bootstrap-icons";
import { IExperience } from "../interfaces/IExperience";

const SearchProfile = () => {
  const [toggleCards, setToggleCards] = useState(false);
  const [toggleCards1, setToggleCards1] = useState(false);
  const profiles = useAppSelector((state) => state.allProfiles.results.users);
  const dispatch = useAppDispatch();
  // const [numbers, setNumbers] = useState<number[]>([]);
  // const uniqueProfiles = useAppSelector(state => state.uniqueProfiles.results)

  // const uniqueProfile = () => {
  //     const uniqueProfilesArray: IProfile[] = []
  //     for (const index of numbers) {
  //         uniqueProfilesArray.push(profiles[index])
  //     }
  //     dispatch(setUniqueProfilesAction(uniqueProfilesArray))
  // }

  useEffect(() => {
    dispatch(fetchAllProfilesAction());
    // generateRandomNumbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //     if (numbers.length > 0 && profiles.length > 0) {
  //         uniqueProfile();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [numbers, profiles]);

  // const generateRandomNumbers = () => {
  //     const newNumbers: number[] = [];
  //     while (newNumbers.length < 20) {
  //         const randomNumber = Math.floor(Math.random() * 101);
  //         if (!newNumbers.includes(randomNumber)) {
  //             newNumbers.push(randomNumber);
  //         }
  //     }
  //     setNumbers(newNumbers);
  // };

  const getClassName = (i: any) => {
    if (i < 5 || toggleCards) {
      return "d-flex flex-wrap";
    } else {
      return "d-none";
    }
  };

  const getClassNameHr = (i: any) => {
    if (i === 9) {
      return "d-none";
    } else if (i >= 4 && toggleCards === false) {
      return "d-none";
    } else {
      return "d-block";
    }
  };

  const getClassName1 = (i: any) => {
    if (i < 5 || toggleCards1) {
      return "d-flex flex-wrap";
    } else {
      return "d-none";
    }
  };

  const getClassNameHr1 = (i: any) => {
    if (i === 9) {
      return "d-none";
    } else if (i >= 4 && toggleCards1 === false) {
      return "d-none";
    } else {
      return "d-block";
    }
  };

  const params = useParams();
  const [prof, setProf] = useState<any>();
  const [exp, setExp] = useState<any>();

  useEffect(() => {
    getProfile();
    getExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    getProfile();
    getExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfile = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${params.id}`
      );
      if (response.ok) {
        let profile = await response.json();
        setProf(profile);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExperiences = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${params.id}/experiences`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzOTBhMDgzODFmYzAwMTNmZmZhZTEiLCJpYXQiOjE2NzY5MDY2NTYsImV4cCI6MTY3ODExNjI1Nn0.dS-mJz9dPZvOvHRQqPy2I6yqTVHPW3mZ-MKpxfhxw8I",
          },
        }
      );
      if (response.ok) {
        let experiences = await response.json();
        setExp(experiences);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-12 col-sm-8 pr-0 overflow-hidden">
          <Container>
            <Row>
              <Col className="main">
                <div className="cover">
                  <div className="profile-pic">
                    <>
                      <img
                        src={
                          prof
                            ? prof.image
                              ? prof.image
                              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            : ""
                        }
                        alt=""
                      />
                    </>
                  </div>
                </div>

                <Row className="mt-5" style={{ paddingInline: "23px" }}>
                  <Col xs={8}>
                    <h4 className="name">
                      {prof ? prof.name + " " + prof.surname : ""}
                    </h4>
                    <p className="sub mt-n1 mb-n1 ">{prof ? prof.title : ""}</p>
                    <span className="place ">
                      {prof ? (prof.address ? prof.address.city : "") : ""},{" "}
                      {prof ? (prof.address ? prof.address.country : "") : ""} ∙
                      <a href="#home" className="ml-1 link-connections">
                        Contact info
                      </a>
                    </span>
                    <div>
                      <Link
                        to={`${process.env.REACT_APP_BE_URL}/users/${params.id}/CV`}
                      >
                        Download CV
                      </Link>
                    </div>

                    <p className="connections mt-2 mb-1">
                      <a href="#home" className="link-connections">
                        486 connections
                      </a>
                    </p>
                  </Col>
                </Row>

                <Row style={{ padding: "15px 23px" }}>
                  <Col xs={12}>
                    <div className="open-to-work mt-3 d-flex flex-column mb-2 align-items-start">
                      <h6 style={{ fontSize: "14px", fontWeight: "600" }}>
                        Open to work
                      </h6>
                      <p className="mb-n1 mt-n1 truncate">
                        Computer Science Engineer, Trainee, Intern, Test
                        Engineer and Quality Assurance Analyst roles
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
          <Container>
            <Row>
              <Col className="mt-2 sub-sections">
                <div className="d-flex justify-content-between">
                  <h4 className="name pt-4 mb-n1 px-2">About</h4>
                </div>
                <p className="ml-2 mt-3 about">{prof ? prof.bio : ""}</p>
              </Col>
            </Row>
          </Container>
          <Container className="mb-1">
            <Row>
              <Col className="mt-2 sub-sections" style={{ paddingInline: "0" }}>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ paddingInline: "15px" }}
                >
                  <div>
                    <h4 className="name pt-4 mb-n1 px-2">Activity</h4>
                    <p className="connections mt-2 mb-1 px-2 ">
                      <a href="#home" className="link-connections">
                        494 Followers
                      </a>
                    </p>
                  </div>
                </div>
                <h6 style={{ fontWeight: "600", paddingInline: "23px" }}>
                  No posts
                </h6>
                <ListGroup>
                  <ListGroup.Item className="activity-item">
                    <div className="text-center">
                      <a href="#home">
                        Show all activity
                        <ArrowRight className="ml-2" />
                      </a>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
          <Container className="mb-1">
            <Row>
              <Col className="mt-2 sub-sections" style={{ paddingInline: "0" }}>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ paddingInline: "15px" }}
                >
                  <h4 className="name pt-4 mb-n1 px-2">Experience</h4>
                </div>

                {exp && (
                  <Link
                    to={`${process.env.REACT_APP_BE_URL}/users/${params.id}/experiences/CSV`}
                    className="pt-4 mb-n1 px-4"
                  >
                    Download CSV File
                  </Link>
                )}
                <ListGroup className="mt-4 list-exp ">
                  <>
                    {exp &&
                      exp.map((ex: IExperience) => (
                        <>
                          <ListGroup.Item
                            key={ex._id}
                            className="pt-2 experience"
                          >
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
                                <h6
                                  style={{
                                    fontWeight: "600",
                                    paddingInline: "10px",
                                  }}
                                >
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
                                  <>
                                    {" "}
                                    {format(
                                      parseISO(ex.startDate),
                                      "MMMM, yyyy"
                                    )}{" "}
                                    -{" "}
                                    {ex.endDate === null ||
                                    ex.endDate === undefined
                                      ? "Present"
                                      : format(
                                          parseISO(ex.endDate),
                                          "MMMM, yyyy"
                                        )}
                                  </>
                                </p>
                                <p
                                  className="place mb-0"
                                  style={{ paddingInline: "10px" }}
                                >
                                  {ex.area}
                                </p>
                              </div>
                            </div>
                          </ListGroup.Item>
                          {exp.indexOf(ex) < exp.length - 1 ? (
                            <hr style={{ width: "90%" }} />
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                  </>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="col-12 col-sm-4 px-4 profiles-container">
          <div className="sidebar-card mb-2">
            <div className="card-spacing">
              <h2>People you may know</h2>
              {profiles &&
                profiles.length !== 0 &&
                profiles
                  .filter(
                    (profile: IProfile) =>
                      profile._id !== process.env.REACT_APP_USER_ID
                  )
                  .slice(0, 10)
                  .map((profile: IProfile, i: any) => {
                    return (
                      <div key={i}>
                        <div className={getClassName1(i)}>
                          <div className="image-container">
                            {profile.image ? (
                              <img src={profile.image} alt="" />
                            ) : (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt=""
                              />
                            )}
                          </div>
                          <div>
                            <Link
                              className="username truncate2"
                              to={"/users/" + profile._id}
                            >
                              {profile.name} {profile.surname}
                            </Link>{" "}
                            <span> • 2nd</span>
                            <p className="profession truncate3">
                              {profile.title}
                            </p>
                            <Button variant="outline-secondary">
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
                                <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"></path>
                              </svg>{" "}
                              Connect
                            </Button>
                          </div>
                        </div>
                        <hr className={getClassNameHr1(i)} />
                      </div>
                    );
                  })}
            </div>
            <div
              className="toggle"
              onClick={() => {
                setToggleCards1(!toggleCards1);
              }}
            >
              {toggleCards1 ? (
                <>
                  Show less{" "}
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
                    <path d="M15 11L8 6.39 1 11V8.61L8 4l7 4.61z"></path>
                  </svg>
                </>
              ) : (
                <>
                  Show more{" "}
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
                    <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"></path>
                  </svg>
                </>
              )}
            </div>
          </div>

          <div className="sidebar-card my-2">
            <div className="card-spacing">
              <h2>People you may know</h2>
              {profiles &&
                profiles.length !== 0 &&
                profiles
                  .filter(
                    (profile: IProfile) =>
                      profile._id !== process.env.REACT_APP_USER_ID
                  )
                  .slice(10, 20)
                  .map((profile: IProfile, i: any) => {
                    return (
                      <div key={i}>
                        <div className={getClassName(i)}>
                          <div className="image-container">
                            {profile.image ? (
                              <img src={profile.image} alt="" />
                            ) : (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt=""
                              />
                            )}
                          </div>
                          <div>
                            <div className="d-flex align-items-center">
                              <Link
                                className="username truncate2"
                                to={"/users/" + profile._id}
                              >
                                {profile.name} {profile.surname}
                              </Link>
                              <span className="ml-1"> • 2nd</span>
                            </div>
                            <p className="profession truncate3">
                              {profile.title}
                            </p>
                            <Button variant="outline-secondary">
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
                                <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"></path>
                              </svg>{" "}
                              Connect
                            </Button>
                          </div>
                        </div>
                        <hr className={getClassNameHr(i)} />
                      </div>
                    );
                  })}
            </div>
            <div
              className="toggle"
              onClick={() => {
                setToggleCards(!toggleCards);
              }}
            >
              {toggleCards ? (
                <>
                  Show less{" "}
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
                    <path d="M15 11L8 6.39 1 11V8.61L8 4l7 4.61z"></path>
                  </svg>
                </>
              ) : (
                <>
                  Show more{" "}
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
                    <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"></path>
                  </svg>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchProfile;
