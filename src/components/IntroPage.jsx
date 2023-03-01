import { baseUrl } from "../axios";

const IntroPage = ({
  img,
  handleImageLoaded,
  currentCourse,
  handleQuestions,
}) => {
  return (
    <div>
      <div className="course-page-content col ">
        <div
          className="title"
          style={{ fontFamily: "Helvetica", fontWeight: 100 }}
        >
          <h2>
            <b>{currentCourse.courseName}</b>
          </h2>
        </div>

        <img
          src={`${baseUrl}/courses/images/${img}`}
          onLoad={handleImageLoaded}
          className="intro-img"
        />

        <div className="content">
          <p>{currentCourse?.courseText}</p>
          <div className="row">
            <button className="btn black" onClick={handleQuestions}>
              Start Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IntroPage;
