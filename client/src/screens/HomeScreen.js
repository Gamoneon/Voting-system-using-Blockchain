import React from "react";

const HomeScreen = () => {
  return (
    <>
      <div className="HomePageWallpaper">
        <img
          src="./Images/wallpaper1.png"
          alt=""
          style={{
            position: "absolute",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          cover
        />
      </div>
    </>
  );
};

export default HomeScreen;
