import React from "react";
import Navbar from "../components/Navbar.js";

const AboutUsScreen = () => {
  const contributorsData = [
    {
      _id: 1,
      name: "Sahil Kavitake",
      stream: "M.Sc. Industrial Mathematics With Computer Applications",
      image: "./Images/sahil2.jpg",
      linkedin: "https://www.linkedin.com/in/sahil-kavitake/",
    },
    {
      _id: 2,
      name: "Soumya Singh",
      stream: "M.Sc. Computer Applications",
      image: "./Images/soumya.jpg",
      linkedin: "http://www.linkedin.com/in/soumya-singhs",
    },
    {
      _id: 3,
      name: "Pooja Gadwe",
      stream: "M.Sc. Computer Applications",
      image: "./Images/pooja.jpg",
      linkedin: "https://www.linkedin.com/in/pooja-gadwe-191924215/",
    },
    {
      _id: 4,
      name: "Saurabh Jadhav",
      stream: "M.Sc. Computer Science",
      image: "./Images/saurabh.jpg",
      linkedin: "https://www.linkedin.com/in/saurabhj01",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container m-2 p-2">
        <h3>Contributors</h3>
        <div className="row justify-content-evenly">
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
