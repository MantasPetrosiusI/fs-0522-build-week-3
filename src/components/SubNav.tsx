import { Button, Col, Container, Row } from "react-bootstrap";
import "../css/navbar.css";
import React, { useEffect, useState } from "react";
import { fetchMyProfileAction } from "../actions";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";

const SubNav = () => {
  const profile = useAppSelector((state) => state.myProfile.results);

  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchMyProfileAction());

    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: "100%",
        zIndex: "5",
        position: "fixed",
        top: isVisible ? "52px" : "-50px",
        opacity: isVisible ? "1" : "0",
        transition: "top 0.5s, opacity 0.5s",
        backgroundColor: "white",
      }}
    >
      <div className="subNav">
        <Container>
          <Row>
            <Col className="col-12 col-sm-6 p-1 d-flex">
              <div id="leftSub">
                <img
                  src={profile.image}
                  alt="pict here"
                  style={{
                    borderRadius: "50%",
                    width: "3em",
                    height: "3em",
                    objectFit: "cover",
                  }}
                />
                <div className="d-flex flex-column mr-auto">
                  <span style={{ fontSize: "13px" }}>
                    <b>
                      {profile.name} {profile.surname}
                    </b>
                  </span>

                  <span>{profile.title}</span>
                </div>
              </div>
            </Col>
            <Col className="col-12 col-sm-6 p-1 d-flex justify-content-md-end justify-content-center ">
              <div>
                <Button
                  className="mr-2 badge-pill subnav-button"
                  variant="outline-secondary"
                >
                  More
                </Button>
                <Button
                  className="mr-2 badge-pill subnav-button"
                  variant="outline-primary"
                >
                  Add profile section
                </Button>
                <Button
                  style={{ backgroundColor: "#0a66c2" }}
                  className="badge-pill subnav-button"
                >
                  Open to
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SubNav;
