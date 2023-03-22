import {
  Navbar,
  NavDropdown,
  Form,
  Modal,
  Card,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faPeopleGroup,
  faSuitcase,
  faCommentDots,
  faBell,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.css";
import { useState, useEffect } from "react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchMyProfileAction, searchProfileAction } from "../actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IProfile } from "../interfaces/IProfile";

const CustomNavbar = () => {
  const { userID } = useParams();
  const profile = useAppSelector((state) => state.myProfile.results);
  const profiles = useAppSelector((state) => state.allProfiles.results);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userID !== undefined) {
      dispatch(fetchMyProfileAction(userID));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  const [show, setShow] = useState(false);

  const [matchedProfile, setMatchedProfile] = useState<IProfile>();

  const navigate = useNavigate();

  useEffect(() => {
    if (matchedProfile) {
      dispatch(searchProfileAction(matchedProfile));
      navigate(`/user/${matchedProfile._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedProfile, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [query, setQuery] = useState("");
  const [home, setHome] = useState(false);
  let currentURL = window.location.href;
  useEffect(() => {
    const links = document.querySelectorAll(".home");
    links.forEach((link) => {
      const to = link.getAttribute("href");
      if (to + "/" === currentURL) {
        link.classList.add("selected");
      } else {
        link.classList.remove("selected");
      }
    });
  }, [currentURL]);

  return (
    <>
      <Navbar bg="light" sticky="top">
        <Container>
          <Navbar.Brand className="underline">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="rgb(10, 102, 194)"
                width="44"
                height="44"
                focusable="false"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </Link>
          </Navbar.Brand>
          <div id="nav-search">
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  profiles.some(
                    (userProfile: IProfile) =>
                      userProfile.name.toLowerCase() === query.toLowerCase()
                  )
                ) {
                  let profile = profiles.find(
                    (userProfile: IProfile) =>
                      userProfile.name.toLowerCase() === query.toLowerCase()
                  );
                  setMatchedProfile(profile);
                }
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-input d-none d-lg-block"
                aria-label="Search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </Form>
          </div>
          <div id="nav-main" className="d-flex">
            <div className="onHover">
              <div>
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <div>
                <Link
                  to={"http://localhost:3000"}
                  className="home"
                  id="navs"
                  onClick={() => {
                    setHome(true);
                  }}
                >
                  Home
                </Link>
              </div>
            </div>
            <div className="onHover">
              <div>
                <FontAwesomeIcon icon={faPeopleGroup} />
              </div>
              <div>
                <a id="navs">My Network</a>
              </div>
            </div>
            <div className="onHover">
              <div>
                <FontAwesomeIcon icon={faSuitcase} />
              </div>
              <div>
                <a id="navs">Jobs</a>
              </div>
            </div>
            <div className="onHover">
              <div>
                <FontAwesomeIcon icon={faCommentDots} />
              </div>
              <div>
                <a id="navs">Messaging</a>
              </div>
            </div>
            <div className="onHover">
              <div>
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div>
                <a id="navs">Notifications</a>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: "1.5em",
                paddingLeft: "0.7em",
                borderRight: "1px solid rgb(220 218 211)",
              }}
            >
              <div
                style={{
                  width: "1.3em",
                  height: "1.3em",
                  overflow: "hidden",
                  borderRadius: "50%",
                  marginTop: "2px",
                }}
              >
                <img
                  src={profile.image}
                  alt="avatar"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    position: "relative",
                    bottom: "4px",
                  }}
                />
              </div>

              <NavDropdown title="Me" id="navbarScrolling">
                <NavDropdown.Item id="accountDropdown">
                  <img
                    src={profile.image}
                    id="avatar"
                    alt="avatar"
                    style={{ width: "50px", height: "50px" }}
                  ></img>
                  <div>
                    <span
                      style={{
                        color: "rgba(37,37,37,255)",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {profile.name} {profile.surname}
                    </span>
                    <span style={{ color: "rgba(37,37,37,255)" }}>
                      {profile.title}
                    </span>
                  </div>
                </NavDropdown.Item>
                <div className="px-2 py-2">
                  <NavDropdown.Item
                    href="/profile"
                    id="view-profile"
                    className="mb-2"
                  >
                    View Profile
                  </NavDropdown.Item>
                </div>
                <NavDropdown.Divider />
                <NavDropdown.ItemText>
                  <span style={{ fontSize: "16px" }}>
                    <b>Account</b>
                  </span>
                </NavDropdown.ItemText>
                <NavDropdown.Item href="#action5" id="premium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    data-supported-dps="24x24"
                    width="17"
                    height="17"
                    focusable="false"
                    style={{ marginBottom: "5px" }}
                  >
                    <path
                      d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z"
                      fill="#f8c77e"
                    ></path>
                    <path
                      d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z"
                      fill="#e7a33e"
                    ></path>
                  </svg>
                  <Link to={"/"} className="premium-link1">
                    {" "}
                    Try Premium for free
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="underline" href="#action5">
                  Settings & Privacy
                </NavDropdown.Item>
                <NavDropdown.Item className="underline" href="#action6">
                  Help
                </NavDropdown.Item>
                <NavDropdown.Item className="underline" href="#action7">
                  Language
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.ItemText>
                  <span style={{ fontSize: "16px" }}>
                    <b>Manage</b>
                  </span>
                </NavDropdown.ItemText>
                <NavDropdown.Item className="underline" href="#action8">
                  Posts & Activity
                </NavDropdown.Item>
                <NavDropdown.Item className="underline" href="#action9">
                  Job Posting Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="underline" href="#signout">
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
          <div id="side-nav" className="d-none d-lg-flex">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={handleShow}
            >
              <div
                style={{
                  marginTop: "-0.5em",
                  marginRight: "1.5em",
                  position: "absolute",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
                </svg>
              </div>
              <Link
                to={"/"}
                style={{ marginTop: "1.5em" }}
                className="special-link"
              >
                <span>Work</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </Link>
            </div>
            <div className="ml-4">
              <Link
                to={"/"}
                className="d-none d-lg-block premium-link truncate"
              >
                Get Hired Faster, <br /> Try Premium Free
              </Link>
            </div>
          </div>
        </Container>
      </Navbar>
      <Modal
        className="nav-modal"
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="my-modal"
        backdropClassName="modal-backdrop-right"
      >
        <Modal.Header closeButton>
          <Modal.Title>Work</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Card>
            <Card.Header>Visit More LinkedIn Products</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <Row className="row-cols-4">
                  <Col>
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <defs>
                            <linearGradient
                              id="app-learning-@1-a"
                              x1="7.18"
                              y1="6.98"
                              x2="13.8"
                              y2="20.22"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#33aada"></stop>
                              <stop offset="1" stop-color="#0091ca"></stop>
                            </linearGradient>
                            <linearGradient
                              id="app-learning-@1-b"
                              x1="12.96"
                              y1="-17.55"
                              x2="27.9"
                              y2="24.33"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#665ed0"></stop>
                              <stop offset="1" stop-color="#0073b1"></stop>
                            </linearGradient>
                          </defs>
                          <path
                            d="M20 30H8a1 1 0 01-1-1V11a1 1 0 011-1h12v20z"
                            fill="url(#app-learning-@1-a)"
                          ></path>
                          <path
                            d="M20 10h12a1 1 0 011 1v18a1 1 0 01-1 1H20V10z"
                            fill="url(#app-learning-@1-b)"
                          ></path>
                          <path
                            fill="#33aada"
                            d="M9 19h8v2H9zM9 23h8v2H9zM9 15h8v2H9z"
                          ></path>
                          <path
                            fill="#006097"
                            d="M23 19h8v2h-8zM23 23h8v2h-8zM23 15h8v2h-8z"
                          ></path>
                          <path
                            d="M17.41 15.25l7.46 4.52a.27.27 0 010 .46l-7.46 4.52a.27.27 0 01-.41-.23v-9a.27.27 0 01.41-.27z"
                            fill="#fff"
                          ></path>
                        </svg>
                      </div>
                      <span>Learning</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <defs>
                            <linearGradient
                              id="app-talent-insights-medium-a"
                              x1="34.05"
                              y1="44.47"
                              x2="13.67"
                              y2="19.5"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#665ed0"></stop>
                              <stop offset="1" stop-color="#0073b1"></stop>
                            </linearGradient>
                          </defs>
                          <path
                            d="M25 6H10a1 1 0 00-1 1v25a1 1 0 001 1h20a1 1 0 001-1V12z"
                            fill="#caedff"
                          ></path>
                          <path fill="#65c3e8" d="M25 6v6h6l-6-6z"></path>
                          <path
                            d="M20 19a4 4 0 114-4 4 4 0 01-4 4zm3 2h-6v12h6zm8 11v-8h-5v9h4a1 1 0 001-1zm-17-5H9v5a1 1 0 001 1h4z"
                            fill="url(#app-talent-insights-medium-a)"
                          ></path>
                        </svg>
                      </div>
                      <span>Insights</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <defs>
                            <linearGradient
                              id="app-jobs-posting-@1-a"
                              x1="-6.68"
                              y1="-1"
                              x2="25.05"
                              y2="26.36"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#665ed0"></stop>
                              <stop offset="1" stop-color="#0073b1"></stop>
                            </linearGradient>
                          </defs>
                          <path
                            fill="none"
                            stroke="#caedff"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M20 8.67l-4 6.66M20 8.67l4 6.66"
                          ></path>
                          <rect
                            x="8"
                            y="14"
                            width="24"
                            height="16"
                            rx="1"
                            ry="1"
                            fill="url(#app-jobs-posting-@1-a)"
                          ></rect>
                          <path fill="#65c3e8" d="M12 18h16v3H12z"></path>
                          <path fill="#33aada" d="M15 23h10v3H15z"></path>
                          <circle cx="20" cy="9" r="2" fill="#65c3e8"></circle>
                        </svg>
                      </div>
                      <span>Post a job</span>
                    </Link>
                  </Col>
                  <Col>
                    {" "}
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <defs>
                            <linearGradient
                              id="app-ads-@1-a"
                              x1="34.78"
                              y1="3.84"
                              x2="14.66"
                              y2="25.84"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#665ed0"></stop>
                              <stop offset="1" stop-color="#0073b1"></stop>
                            </linearGradient>
                          </defs>
                          <g fill="url(#app-ads-@1-a)">
                            <path d="M20 11.88A8.13 8.13 0 1111.88 20 8.13 8.13 0 0120 11.88M20 9a11 11 0 1011 11A11 11 0 0020 9z"></path>
                            <circle cx="20" cy="20" r="4"></circle>
                          </g>
                          <circle
                            cx="20"
                            cy="20"
                            r="2"
                            transform="rotate(-45 20.002 19.995)"
                            fill="#33aada"
                          ></circle>
                          <path
                            fill="#33aada"
                            d="M24.246 12.932l2.829 2.828-5.657 5.657-2.828-2.829z"
                          ></path>
                          <path
                            fill="#33aada"
                            d="M29.19 16.46l-4.95-.7-.7-4.95 4.94-4.95L29 11l5.14.52-4.95 4.94z"
                          ></path>
                        </svg>
                      </div>
                      <span>Advertise</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <defs>
                            <linearGradient
                              id="app-sales-navigator-@1-a"
                              x1="40.53"
                              y1="-53.4"
                              x2="20.23"
                              y2="19.17"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#665ed0"></stop>
                              <stop offset="1" stop-color="#0073b1"></stop>
                            </linearGradient>
                          </defs>
                          <circle
                            cx="20"
                            cy="20"
                            r="14"
                            fill="url(#app-sales-navigator-@1-a)"
                          ></circle>
                          <path
                            d="M17.17 17.17L27.42 12a.4.4 0 01.18 0 .39.39 0 01.4.39.42.42 0 010 .19l-5.17 10.25z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M17.17 17.17L12 27.42a.42.42 0 000 .19.39.39 0 00.37.38.45.45 0 00.21 0l10.25-5.12z"
                            fill="#98d8f4"
                          ></path>
                          <circle cx="20" cy="20" r="4" fill="#fff"></circle>
                          <circle cx="20" cy="20" r="2" fill="#0073b1"></circle>
                        </svg>
                      </div>
                      <span>Find Leads</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <defs>
                            <linearGradient
                              id="app-groups-@1-b"
                              x1="1.84"
                              y1="-24.59"
                              x2="20.66"
                              y2="25.05"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#665ed0"></stop>
                              <stop offset="1" stop-color="#0073b1"></stop>
                            </linearGradient>
                            <clipPath id="app-groups-@1-a">
                              <path
                                d="M18.17 9.15a11 11 0 00-7.76 16.23l-2 5.6a.47.47 0 00.63.59l5.21-2.23a11 11 0 103.92-20.19z"
                                fill="none"
                              ></path>
                            </clipPath>
                          </defs>
                          <path
                            d="M18.17 9.15a11 11 0 00-7.76 16.23l-2 5.6a.47.47 0 00.63.59l5.21-2.23a11 11 0 103.92-20.19z"
                            fill="#caedff"
                          ></path>
                          <circle cx="29" cy="16" r="3" fill="#0091ca"></circle>
                          <circle cx="11" cy="16" r="3" fill="#0091ca"></circle>
                          <g clip-path="url(#app-groups-@1-a)">
                            <path
                              d="M20 18a4 4 0 114-4 4 4 0 01-4 4zm3 2h-6v16h6V20z"
                              fill="url(#app-groups-@1-b)"
                            ></path>
                            <path
                              fill="#0091ca"
                              d="M26 21h6v14h-6zM8 21h6v14H8z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <span>Groups</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={"/"}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                          data-supported-dps="40x40"
                          width="40"
                          height="40"
                          focusable="false"
                        >
                          <circle cx="20" cy="12" r="4" fill="#0073b1"></circle>
                          <path
                            d="M31.88 13.46L16.17 29.17 18 31a1.37 1.37 0 002 0l14.71-14.71a1.13 1.13 0 00.29-.8.89.89 0 00-.29-.61l-1.41-1.42a1 1 0 00-1.42 0z"
                            fill="#0091ca"
                          ></path>
                          <path
                            d="M21.83 29.17L20 31a1.35 1.35 0 01-1 .4 1.36 1.36 0 01-1-.4l-8.71-8.71a1 1 0 010-1.41l1.41-1.41a1.07 1.07 0 01.76-.29.94.94 0 01.65.29z"
                            fill="#33aada"
                            opacity=".8"
                          ></path>
                          <path
                            fill="#0073b1"
                            d="M19 26.34l4-4V18h-6v6.34l2 2z"
                          ></path>
                        </svg>
                      </div>
                      <span>Services Marketplace</span>
                    </Link>
                  </Col>
                </Row>
              </blockquote>
            </Card.Body>
          </Card>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header role={"presentation"}>
              LinkedIn Business Services
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <Row className="row-cols-1">
                  <Col>
                    <Link
                      to={
                        "https://business.linkedin.com/talent-solutions?trk=flagship_nav&veh=li-header-dropdown-lts-control&src=li-nav"
                      }
                      target="_blank"
                    >
                      <h5>Talent Solutions</h5>
                      <p>Find, attract and recruit talent</p>
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to={
                        "https://business.linkedin.com/sales-solutions?trk=flagship_nav&amp;veh=li-header-dropdown-lss-control&amp;src=li-nav"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      data-test-app-aware-link=""
                    >
                      <h5>Sales Solutions</h5>
                      <p>Unlock sales opportunities</p>
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to={
                        "https://www.linkedin.com/talent/post-a-job?trk=nav_biz_serv_job_post_nept"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      data-test-app-aware-link=""
                    >
                      <h5>Post a job for free</h5>
                      <p>Get your job in front of quality candidates</p>
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to={
                        "https://business.linkedin.com/marketing-solutions/ads?trk=n_nav_ads_rr_b&amp;src=li-nav"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      data-test-app-aware-link=""
                    >
                      <h5>Marketing Solutions</h5>
                      <p>Acquire customers and grow your business</p>
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to={
                        "https://learning.linkedin.com/?trk=d_flagship3_nav&amp;veh=learning_solutions&amp;src=li-nav"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      data-test-app-aware-link=""
                    >
                      <h5>Learning Solutions</h5>
                      <p>Develop talent across your organization</p>
                    </Link>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <Link
                      to={"https://www.linkedin.com/company/setup/new/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-test-app-aware-link=""
                    >
                      <h5 className="t-14 t-black t-bold">
                        Create a Company Page
                        <span> </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          data-supported-dps="16x16"
                          fill="currentColor"
                          className="mercado-match"
                          width="16"
                          height="16"
                          focusable="false"
                        >
                          <path d="M14 9H9v5H7V9H2V7h5V2h2v5h5z"></path>
                        </svg>
                      </h5>
                    </Link>
                  </Col>
                </Row>
              </blockquote>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CustomNavbar;
