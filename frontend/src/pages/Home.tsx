import React from "react";

const Home: React.FC = () => {
  return (
  <div>
    <h1>M7 Health Scheduling App</h1>
    <div className="custom-textbox">
        <h2>Quick Intro</h2>
        <p>
          Hi there! This is my take on the M7 Health scheduling app project.
          Before you move on, I'd like to go over some key design decisions 
          in order to give you some insight into my process for developing this app.
        </p>
      <h2>Design Overview and Highlights</h2>
      <h3>Use of Client-Side Routing ( + General Refactoring )</h3>
      <p>
        The first thing you probably noticed upon opening this app is that it's now separated into multiple views.
        Each of these is accessible at all times from the nav bar at the top of the screen.<br/><br/>
        I made this change for 2 reasons:<br/><br/>
        The first is that it simply makes for a better user experience. 
        Having an entire site like this in view is extremely overwhelming, and makes navigation an absolute pain.
        Additionally, I just thought it looked nicer. I don't exactly have a ton of artistic talent, 
        but also wanted this app to be nice to look at and to use, 
        so I thought that modernizing the UX in this way would be a good touch. 
        <br/><br/>
        The second reason for this change is that my first priority when creating this project 
        was refactoring the starter code to take better advantage of encapsulation. 
        As I was planning out my approach to this project, I realized that there were enough moving pieces to make
        it worthwhile to break the frontend down into a collection of more-manageable parts. 
        Once I'd done this refactoring work, it was pretty trivial to throw the components into separate views and tie them
        together using React Router DOM.
      </p>
      <h3>Backend</h3>
      <p>
      TODO
      </p>
      <h3>The Scheduling Algorithm</h3>
      <p>
        TODO
      </p>
    </div>
  </div>
  );
};
export default Home;
