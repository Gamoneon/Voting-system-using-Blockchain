import React from "react";
import Navbar from "../components/Navbar.js";

const AboutUsScreen = () => {
  const contributorsData = [
    {
      _id: 1,
      name: "Sahil Kavitake (CTO)",
      stream: "M.Sc. Industrial Mathematics With Computer Applications",
      image: "./Images/sahil.jpg",
      linkedin: "https://www.linkedin.com/in/sahil-kavitake/",
    },
    {
      _id: 2,
      name: "Soumya Singh (CEO)",
      stream: "M.Sc. Computer Applications",
      image: "./Images/soumya.jpg",
      linkedin: "http://www.linkedin.com/in/soumya-singhs",
    },
    {
      _id: 3,
      name: "Pooja Gadwe (CIO)",
      stream: "M.Sc. Computer Applications",
      image: "./Images/pooja.jpg",
      linkedin: "https://www.linkedin.com/in/pooja-gadwe-191924215/",
    },
    {
      _id: 4,
      name: "Saurabh Jadhav (COO)",
      stream: "M.Sc. Computer Science",
      image: "./Images/saurabh.jpg",
      linkedin: "https://www.linkedin.com/in/saurabhj01",
    },
  ];

  const notextsytle = {
    textDecoration: "none",
  };

  return (
    <>
      <Navbar />
      <div className="container m-2 p-4 ml-5">
        <div>
          <h3>About Project</h3>
          <p>
            We students of{" "}
            <strong> Fergusson College (Autonomous), Pune </strong>, during our
            internship (Jan 2022 - June 2022) at{" "}
            <a
              href="https://bluepineapple.io/"
              target="_blank"
              style={notextsytle}
              rel="noopener noreferrer"
            >
              Bluepineapple
            </a>{" "}
            were given an opportunity to discover real world problems, convert
            it into a business product and find its solution.
          </p>
          <p>
            While exploring, we conducted a survey and got to know that there
            were no online Voting System present in schools and colleges. Many
            organizations still use paper based voting in the era of
            digitalization. With the advent of modern technology, the automated
            voting processes using <strong> Blockchain Technology </strong>would
            be a straightforward secured application that would improve
            efficiency and would avoid problems that plagued the election.
          </p>
          <p>
            <strong>Benefits of Voting System Using Blockchain:</strong>
            <ul>
              <li>More Secured System</li>
              <li>Easy to comprehend</li>
              <li>Flexible to use</li>
              <li>Accurate and reliable results</li>
              <li>Less human errors</li>
              <li>Happy Students</li>
            </ul>
          </p>
        </div>
        <hr />
        <h3>Contributors</h3>
        <div className="row justify-content-evenly mb-5">
          {contributorsData.map((contributor) => (
            <div
              key={contributor._id}
              className="col-auto col-sm-10 col-md-6 col-lg-3"
            >
              <div className="card m-2 p-2">
                <div className="card-image">
                  <img
                    src={contributor.image}
                    className="fluid ml-auto"
                    alt="" // ratio 4:3
                    width="280" // 3*8
                    height="320" // 4*8
                  />
                </div>
                <div className="card-header">
                  <div className="card-title h5">{contributor.name}</div>
                  <div className="card-subtitle">{contributor.stream}</div>
                </div>
                <a
                  href={contributor.linkedin}
                  target="_blank"
                  style={notextsytle}
                  rel="noopener noreferrer"
                >
                  <div className="card-body d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-info fw-bolder fs-5"
                    >
                      LinkedIn
                    </button>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUsScreen;
