import { useEffect } from "react";
// import { useState} from "react";
import { fetchAllProfilesAction } from "../actions";
// import { setUniqueProfilesAction } from "../actions";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { IProfile } from "../interfaces/IProfile";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeedSidebar = () => {
  // const uniqueProfiles = useAppSelector(state => state.uniqueProfiles.results)
  // const [numbers, setNumbers] = useState<number[]>([]);
  const profiles = useAppSelector((state) => state.allProfiles.results.users);
  const dispatch = useAppDispatch();

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

  return (
    <div className="sidebar-card my-2">
      <div className="card-spacing">
        <h2 style={{ fontSize: "15px" }}>Add to your feed</h2>
        {profiles &&
          profiles.length !== 0 &&
          profiles
            .filter(
              (profile: IProfile) =>
                profile._id !== process.env.REACT_APP_USER_ID
            )
            .slice(0, 4)
            .map((profile: IProfile, i: any) => {
              return (
                <div key={i}>
                  <div className="d-flex flex-wrap">
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
                        <span className="ml-1">• 2nd</span>
                      </div>
                      <p className="profession truncate3">{profile.title}</p>
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
                  {i < 3 && <hr />}
                </div>
              );
            })}
        <div className="mt-2 recommendations">
          <span style={{ fontSize: "15px" }}>View all recommendations</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            id="arrow-right-small"
            data-supported-dps="16x16"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path d="M11.45 3L15 8l-3.55 5H9l2.84-4H2V7h9.84L9 3z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeedSidebar;
