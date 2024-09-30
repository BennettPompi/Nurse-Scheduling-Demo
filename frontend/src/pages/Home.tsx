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
      <h3>The Scheduling Algorithm</h3>
      <p>
        The scheduling algorithm is combines a simple round-robin approach with a simple grouping system.
        This helps to maintain efficiency while also ensuring that nurses are assigned to shifts in a way that 
        matches their preferences as closely as possible. Its relatively simple structure gives it the advantage of being
        scalable, should preference complexity increase. 
        <br/><br/>
        I think the algorithm itself is sound, however if I had more time I would make some significant improvements.
        The main thing I would do is massively refactor it. My motivation for doing this would be to improve
        both the readability and the performance of the algorithm. Right now, it's a little messy and could definitely
        be optimized.
      </p>
      <h3>
        Features I Would Add
      </h3>
      <p>
        This is just gonna be a quick overview of some features I either thought would be cool to implement,
        partially did implement, or am currently working to implement as you read this.
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <li style={{ marginBottom: '1rem' }}>
            A calendar view of upcoming shifts, for each individual nurse. Obviously from a UX perspective
            this just makes way more sense than the default table view.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Finer grain preference control. I thought it would be cool if you could control the max 
            allowable shifts separately from the number of shifts marked as "preferred". 
            Would allow for more nuanced scheduling.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Heuristic for schedule optimization. With normal inputs, this algorithm does pretty well,
            but in a production setting with significantly more complex constraints, this isn't going to 
            cut it. Having a baseline against which I could compare different iterations would be basically
            non-negotiable.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            Docker. If you look in the commit history I had this, I think, mostly done, but I broke something
            and had to branch away. Might come back to it if I have some time today. (Update: I did this!)
          </li>
          <li style={{ marginBottom: '1rem' }}>
            More of a general "thing I'd do differently," but restructuring my use of the backend in order to
            avoid passing around excess data would probably be priority #1 in bringing this to production.
            I will cut myself some slack here, as I'm a bit of a novice when it comes to nestjs and backend 
            frameworks in general. However, I learned a great deal while building this, and want to continue to grow that
            understanding and hopefully just write better code. 
          </li>
        </ul>
      </p>
      <h3>Some General Observations / Challenges I Faced (Please read this to the end)</h3>
      <p>
        To be completely honest, I approached this project from precisely the wrong end.
        I started by building out the frontend, because I thought that it would help me to understand the backend
        requirements. As it turns out, this was a terrible idea.
        <br/><br/>
        By starting here, I inadvertently doomed myself to wrangling awful, constantly-changing interfaces.
        All of them were terribly named. 
        These made my life extremely difficult, but by the time I realized this it was too late.
        <br/><br/>
        Additionally, this project made me realize how little I truly knew about relational databases.
        Don't get me wrong, I've written probably thousands of SQL queries, but I've never actually had to
        think so explicitly about the structure of my data. This experience was bewildering, exhilirating, and
        generally quite fun.
        <br/><br/>
        To conclude, I had a really great time working on this. 
        Did I far and away exceed the recommended time investment? Absolutely. 
        Could I now create something of similar aesthetic quality and
        much, much better architectural soundness in a fraction of the time? Almost certainly.
        Does my app and look feel pretty slick? Mostly, I think.
        <br/><br/>
        Thanks for reading, and I hope you enjoy the app!
      </p>
    </div>
  </div>
  );
};
export default Home;
