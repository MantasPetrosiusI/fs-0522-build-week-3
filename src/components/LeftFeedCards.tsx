import React, { useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { fetchMyProfileAction } from "../actions";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";

const LeftFeedCard = () => {
  const { userID } = useParams();
  const profile = useAppSelector((state) => state.myProfile.results);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userID !== undefined) {
      dispatch(fetchMyProfileAction(userID));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  return (
    <>
      <Card className="leftCard">
        <Card.Img
          variant="top"
          src="https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
        />
        <div id="CardTinyImg" style={{ overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={profile.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <Card.Body id="leftCardBody">
          <div>
            <Card.Title>
              <Link to={"/profile"}>
                <span
                  style={{
                    lineHeight: "24px",
                    fontWeight: "600",
                    color: "rgba(0, 0, 0, 0.9)",
                    fontSize: "16px",
                  }}
                >
                  {profile.name} {profile.surname}
                </span>
              </Link>
            </Card.Title>
            <Card.Text>{profile.title}</Card.Text>
          </div>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Connections</span>{" "}
              <span style={{ color: "#005fbe", fontWeight: "600" }}>23</span>
            </div>{" "}
            <span style={{ fontWeight: "600", color: "rgba(0, 0, 0, 0.9)" }}>
              {" "}
              Connect with alumni
            </span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Access exclusive tools & insights</span>{" "}
            <div>
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
              <span className="ad" id="leftSideAd">
                Try Premium for free
              </span>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="bookmark-fill-small"
                data-supported-dps="16x16"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path d="M13 4a3 3 0 00-3-3H3v14l5-4.5 5 4.5z"></path>
              </svg>
              <span className="leftSideMyItems">My items</span>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
      <br />
      <Card className="leftCard" id="stickyLeft">
        <Card.Body style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.13)" }}>
          <Card.Text>
            <div id="listList">
              <ul id="listedItems">
                <li>
                  <span>Groups</span>
                </li>
                <li>
                  <div id="plusBtn">
                    <span style={{ paddingTop: "0.5em" }}>Events</span>
                    <div className="svgDiv">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        data-supported-dps="16x16"
                        fill="currentColor"
                        className="mercado-match"
                        width="18"
                        height="18"
                        focusable="false"
                      >
                        <path d="M14 9H9v5H7V9H2V7h5V2h2v5h5z"></path>
                      </svg>
                    </div>
                  </div>
                </li>
                <li>
                  <span>Followed Tags</span>
                </li>
              </ul>
            </div>
          </Card.Text>
        </Card.Body>
        <div id="leftC">
          <span id="leftCTitle">Discover More</span>
        </div>
      </Card>
    </>
  );
};
export default LeftFeedCard;
