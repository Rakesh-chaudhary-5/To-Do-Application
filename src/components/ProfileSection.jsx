import userPic from "../assets/images/userPic.svg";
import menuIcon from "../assets/images/menu.svg";
import menuIcon1 from "../assets/images/menu1.svg";
import StarIcon from "../assets/images/ph_star.svg";
import StarIcon1 from "../assets/images/ph_star1.svg";

import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export default function ProfileSection({
  profileSectionPosition,
  taskList,
  completedTask,
  setSelectTaskList,
  selectTaskList,
}) {
  const { mode } = useContext(MyContext);

  return (
    <section
      className={`w-full md:w-96 ${
        mode ? "bg-[#232323]" : "bg-white"
      } absolute pt-16 md:pt-40  transition-all px-6 duration-300 ${
        profileSectionPosition
          ? " md:relative left-0"
          : "-left-[100%] md:hidden"
      }`}
    >
      <div
        className={`pb-8 font-semibold ${
          mode ? "bg-[#2C2C2C]" : "bg-[#e6f3e8] "
        } px-6  z-20 w-full h-full transition-all duration-300 relative items-center gap-4 flex flex-col`}
      >
        {/* user img and name */}
        <div className="flex  flex-col items-center gap-2 relative -top-16">
          <img src={userPic} className=" " alt="user pic" />
          <p>Hey, ABCD</p>
        </div>

        {/* All tasks section */}
        <div
          className={` ${
            mode ? "bg-[#232323]" : "bg-white "
          }   flex flex-col gap-4 w-full p-4 transition-all duration-300 `}
        >
          {/* all task */}
          <div
            onClick={() => setSelectTaskList("all")}
            className={`flex gap-2 hover:bg-green-600 ${
              selectTaskList == "all" ? "bg-green-600 text-white" : ""
            } hover:text-white rounded-sm cursor-pointer py-1 pl-2`}
          >
            <img src={mode ? menuIcon1 : menuIcon} alt="menu-icon" />
            <p>All Tasks</p>
          </div>

          {/* priorities task */}
          <div
            id="important"
            onClick={() => setSelectTaskList("important")}
            className={`flex gap-2 hover:bg-green-600 ${
              selectTaskList == "important" ? "bg-green-600 text-white" : ""
            } hover:text-white rounded-sm cursor-pointer py-1 pl-2`}
          >
            <img src={mode ? StarIcon1 : StarIcon} alt="star-icon" />
            <p>Important</p>
          </div>

          {/* completed task */}
          <div
            id="completed"
            onClick={() => setSelectTaskList("completed")}
            className={`flex gap-2 hover:bg-green-600 ${
              selectTaskList == "completed" ? "bg-green-600 " : ""
            } group rounded-sm cursor-pointer py-1 pl-2`}
          >
            <div
              className={`border-2 ${
                mode ? "border-white text-white" : "border-black text-black"
              }   flex justify-center items-center text-sm  w-5 h-5 rounded-full`}
            >
              &#10003;
            </div>
            <p
              className={`${
                selectTaskList == "completed" ? "text-white" : ""
              } group-hover:text-white`}
            >
              Completed
            </p>
          </div>
        </div>

        {/* task round bar  */}
        <div
          className={`  ${
            mode ? "bg-[#232323]" : "bg-white"
          } transition-all duration-300 w-full p-4`}
        >
          <p>All Tasks</p>
          <p className="ml-2 text-2xl mb-4">{taskList.length}</p>

          <div className="w-full flex justify-center relative py-4 border-t-2">
            {/* upper div */}
            <div className=" shadow-circleShadow bg-[#FF7A7A] relative shadow-black/20 w-[199.5px] h-[199px] flex rounded-full justify-center items-center ">
              {/* inner div */}
              <div
                className={` shadow-circleShadow  ${
                  mode ? "bg-[#232323]" : "bg-white"
                } shadow-black/20 transition-all flex justify-center items-center text-2xl font-bold  duration-300 ease-in-out rounded-full w-[143px] h-[143px] `}
              ></div>

              {/* svg of round */}
              <svg
                className="w-[244px] h-[244x] overflow-visible absolute -top-[23px] -left-[22px]"
                viewBox="0 0 100 100"
              >
                {/* <!-- Animated Progress Circle --> */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  className="stroke-[#35BD3A]"
                  strokeWidth="12"
                  fill="none"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset:
                      220 - (220 * completedTask.length) / taskList.length,
                    transition: "stroke-dashoffset 2s ease",
                  }}
                />
              </svg>
            </div>
            {/* circular svg */}
          </div>

          <div className="text-[12px]">
            <div className="flex items-center gap-2">
              <div className="bg-[#35BD3A] w-2 h-2"></div>
              <p>Completed</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#FF7A7A] w-2 h-2"></div>
              <p>Pending</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
