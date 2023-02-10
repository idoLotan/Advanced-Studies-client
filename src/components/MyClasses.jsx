import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Card from "../Layouts/Card/Card";

const MyClasses = ({ choseClass, myClassesIds }) => {
  const [myClasses, setMyClasses] = useState([]);
  const renderClass = useRef([]);

  useEffect(() => {
    getMyClasses();
  }, [myClassesIds]);

  async function getMyClasses() {
    let tempClassList = [];
    try {
      for (let key in myClassesIds) {
        let temp = await axios.get(`${baseUrl}/class/${key}`);
        tempClassList.push(temp?.data?.data);
        renderClass.current = tempClassList;
      }
      setMyClasses(tempClassList);
    } catch (err) {
      console.log(err);
    }
  }

  const title = myClasses.length ? "My Classes" : "";
  const topFourClasses = myClasses.slice(0, 4);

  return (
    <div className="my-classes">
      <div className="classes">
        <div className="col left">
          <div className="cards-title row ">{title}</div>
          <div className="row my-classes left">
            {topFourClasses.map((Class) => (
              <Card
                currentClass={Class}
                classes={myClasses}
                choseClass={choseClass}
                key={Class._id}
                classTitle={Class.className}
                isOpen={true}
                precent={
                  !myClassesIds[Class._id].length
                    ? 0
                    : (myClassesIds[Class._id]?.length * 100) /
                      Class?.question?.length
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
