import React from "react";

const Home: React.FC = () => {
  return (<div>
    <h1>M7 Health Scheduling App</h1>
    <div className="custom-textbox">
        <h2>Quick Intro</h2>
        <p>
          Hi there! This is my take on the M7 Health scheduling exercise. 
          <br/>
          Before you move on, I'd like to go over some key design decisions,  
          as well as explain how to use the app.
        </p>
      <h2>Key Design Decisions</h2>
      <h3>Use of Client-Side Routing ( + General Refactoring )</h3>
      <p>
        The first thing you probably noticed upon opening this app is that it's now separated into multiple views.
        Each of these is accessible at all times from the nav bar at the top of the screen.<br/><br/>
        I made this change for 2 reasons:<br/>
        The first is that it simply makes for a better user experience. 
        Having an entire site like this in view is extremely overwhelming, and makes navigation an absolute pain.
        Additionally, I just thought it looked nicer. I don't exactly have a ton of artistic talent, 
        but also wanted this app to look nice, so I thought that modernizing the UX in this way would be a good touch. 
        <br/>
        The second reason for this change is that my first priority when creating this project 
        was refactoring the given code to take better advantage of encapsulation. 
        As I was planning out my approach to this project, I realized that there were enough moving pieces to make
        it worthwhile to break the frontend down into a collection of more-manageable parts.
      </p>
      
    </div>
  </div>);
};
export default Home;
