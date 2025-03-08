import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import TaskList from "./TaskList";
import Icon from "../assets/images/Icon.svg";
import ProfileSection from "./ProfileSection";
import WeatherComponent from "./WhetherApi";
import clearWeatherVideo from "../assets/video/clear.mp4";
import cloudsWeatherVideo from "../assets/video/cloudy.mp4";
import rainWeatherVideo from "../assets/video/rain1.mp4";
import snowfallVideo from "../assets/video/snowfall.mp4";
import { MyContext } from "../context/MyContext";

export default function Home() {
  const existingTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
  const existingWeatherData =
    JSON.parse(localStorage.getItem("weatherData")) || {};
  const { mode } = useContext(MyContext);

  const [taskList, setTaskList] = useState(existingTaskList);
  const [motivationalLine, setMotivationLine] = useState("Loading...");
  const [profileSectionPosition, setProfileSectionPosition] = useState(false);
  const [completedTask, setCompletedTask] = useState([]);
  const [task, setTask] = useState("");
  const [selectTaskList, setSelectTaskList] = useState("all");
  const [weatherData, setWeatherData] = useState(existingWeatherData);
  const [cityInput, setCityInput] = useState({
    isOpen: false,
    city: "",
    fetchWeather: false,
  });
  const [error, setError] = useState({
    checkIsEmpty: false,
    checkLength: false,
    wrongName: false,
  });

  //  set the data of tasks
  const handleSubmit = (el) => {
    el.preventDefault();

    if (task.length <= 35 && task.trim() !== "") {
      setTaskList((prev) => [
        ...prev,
        { id: Date.now(), goal: task, checkbox: false, highlight: false },
      ]);
    }
    // set Validations
    setError((prev) => ({
      ...prev,
      checkIsEmpty: task.trim() == "",
      checkLength: task.length > 35,
    }));
  };

  //   Motivational Lines getting from API
  useEffect(() => {
    try {
      fetch("https://qapi.vercel.app/api/random")
        .then((res) => res.json())
        .then((data) => {
          setMotivationLine(data.quote);
        })
        .catch((err) => console.error("Error fetching quote:", err));
    } catch (err) {}
  }, []);

  // Filter tasks based on selected category
  const completedTaskList = taskList.filter((el) => el.checkbox === true);
  const importantTaskList = taskList.filter((el) => el.highlight === true);
  const filteredTasks =
    selectTaskList === "completed"
      ? completedTaskList
      : selectTaskList === "important"
      ? importantTaskList
      : taskList;

  //   saving taskList in Localstorage
  useEffect(() => {
    // getting completed tasks
    const completedArr = taskList.filter((el) => el.checkbox == true);
    setCompletedTask(completedArr);

    setTask("");
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div
      onClick={() =>
        setError((prev) => ({ ...prev, wrongName: false, checkLength: false }))
      }
      className={`${
        mode ? "bg-[#242424] text-white " : "bg-white text-black"
      }pb-10 min-h-screen transition-all duration-300 ease-in-out `}
    >
      {/* Header section */}
      <Header
        setProfileSectionPosition={setProfileSectionPosition}
        profileSectionPosition={profileSectionPosition}
      />
      <div className="flex flex-row-reverse relative justify-center">
        {/* main section */}
        <section
          className={`transition-all duration-700 px-6 md:px-10 ${
            profileSectionPosition ? "w-full md:w-[calc(100%-20rem)]" : "w-full"
          }`}
        >
          {/* todo list section */}
          <div className="pt-4 ">
            <div className="flex-col md:flex-row flex gap-6 md:items-center border-b-2 md:gap-20">
              <div className="text-lg flex gap-1 w-32 font-semibold  ">
                <p>To Do</p>
                <img src={Icon} alt="icon" />
              </div>

              {/* motivation Line Section */}
              <div>
                <p className="font-semibold ">
                  <span
                    className={`text-yellow-500 ${
                      profileSectionPosition ? "text-sm" : "text-lg"
                    } `}
                  >
                    Energy Line:
                  </span>{" "}
                  {motivationalLine}
                </p>
              </div>
            </div>

            {/* add task section */}
            <form onSubmit={handleSubmit}>
              <div
                className={`  ${
                  mode ? "bg-[#2f3630] text-white " : "bg-[#e6f3e8] text-black"
                } py-4 rounded-md relative justify-end transition-all duration-300 ease-in-out gap-4 flex flex-col px-3 sm:pr-4 sm:pl-6`}
              >
                {/* bg video */}
                <video
                  src={
                    weatherData.weather === "Clear"
                      ? clearWeatherVideo
                      : [
                          "Clouds",
                          "Mist",
                          "Haze",
                          "Fog",
                          "Smoke",
                          "Dust",
                          "Sand",
                          "Ash",
                          "Squall",
                          "Tornado",
                        ].includes(weatherData.weather)
                      ? cloudsWeatherVideo
                      : ["Rain", "Drizzle", "Thunderstorm"].includes(
                          weatherData.weather
                        )
                      ? rainWeatherVideo
                      : weatherData.weather === "Snow"
                      ? snowfallVideo
                      : clearWeatherVideo
                  }
                  autoPlay
                  muted
                  loop
                  className={`w-full rounded-md ${
                    weatherData.weather ? "block" : "hidden"
                  } object-cover h-full z-0 top-0 absolute left-0`}
                />

                <div className="z-10 w-full flex flex-col sm-500:flex-row sm-500:items-center justify-between gap-4">
                  {/* task input */}
                  <input
                    value={task}
                    type="text"
                    className={`bg-inherit ${
                      weatherData.weather ? "text-white" : ""
                    }  ${
                      error.checkIsEmpty
                        ? "placeholder:text-red-600"
                        : "text-inherit "
                    } h-20 outline-none bg-transparent font-semibold `}
                    placeholder="Add A Task"
                    onFocus={() =>
                      setError((prev) => ({
                        ...prev,
                        checkIsEmpty: false,
                      }))
                    }
                    onChange={(e) => setTask(e.target.value)}
                  />

                  {/* display weather data */}
                  <div
                    className={`text-white ${
                      weatherData.weather ? "block" : "hidden"
                    } text-sm ${
                      profileSectionPosition ? "text-sm" : "text-base"
                    } flex flex-col gap-2 `}
                  >
                    <p>
                      <strong>City:</strong> {weatherData.city}
                    </p>
                    <p>
                      <strong>weather:</strong> {weatherData.weather}
                    </p>

                    <div className="gap-2 flex">
                      <p>
                        <strong>temp:</strong> {weatherData.temp}
                      </p>
                      <p
                        className={` ${
                          profileSectionPosition
                            ? "hidden"
                            : "hidden sm-500:block"
                        } `}
                      >
                        <strong>visibility:</strong> {weatherData.visibility}
                      </p>
                    </div>

                    <div className="gap-2 flex">
                      <p>
                        <strong>humidity:</strong> {weatherData.humidity}
                      </p>
                      <p
                        className={` ${
                          profileSectionPosition
                            ? "hidden"
                            : "hidden sm-500:block"
                        } `}
                      >
                        <strong>wind: </strong> {weatherData.wind}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add task */}
                <div className="w-full flex relative justify-end ">
                  {/* err showing when text length is more then 35 */}
                  <p
                    className={`${
                      error.checkLength ? "visible" : "hidden"
                    } absolute left-0 -top-10 text-red-600`}
                  >
                    Maximum character limit is 35
                  </p>
                  {/* err showing when city name is not exist  */}
                  <p
                    className={`${
                      error.wrongName ? "visible" : "hidden"
                    } absolute left-0 top-0 text-red-600`}
                  >
                    Please try another city name
                  </p>
                  <button
                    type="submit"
                    className={`${
                      mode
                        ? "bg-green-600 hover:bg-[#CDDFCF] text-white hover:text-black"
                        : "bg-[#CDDFCF] hover:bg-green-600 hover:text-white"
                    }   transition-all duration-200 py-2 px-2 sm:px-4 text-sm sm:text-base  font-semibold text-[#357937] rounded-md`}
                  >
                    ADD TASK
                  </button>
                  {/* Check weather button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCityInput((prev) => ({
                        ...prev,
                        isOpen: !cityInput.isOpen,
                      }));
                    }}
                    className={`bg-[#CDDFCF] ${
                      mode
                        ? "bg-orange-600 hover:bg-[#CDDFCF] text-white hover:text-black"
                        : "bg-[#CDDFCF] hover:bg-orange-600 text-orange-600 hover:text-white"
                    }   transition-all duration-200 py-2 px-2  text-sm sm:text-base sm:px-4 ml-4 font-semibold  rounded-md`}
                  >
                    <span>Check </span> Weather
                  </button>

                  {/* city input box */}
                  <div
                    className={`${
                      mode ? "bg-[#2F3630]" : "bg-[#CDDFCF]"
                    } absolute flex items-center ${
                      cityInput.isOpen ? "scale-100" : "scale-0"
                    }  -bottom-12 w-52 right-0 z-10 transition-all duration-300 overflow-hidden ease-in-out rounded-md h-10`}
                  >
                    <input
                      value={cityInput.city}
                      placeholder="Enter city name"
                      onChange={(el) =>
                        setCityInput((prev) => ({
                          ...prev,
                          city: el.target.value,
                        }))
                      }
                      className="bg-transparent font-semibold px-3 h-full w-full outline-none"
                      type="text"
                    />
                    <div
                      onClick={() =>
                        setCityInput((prev) => ({
                          ...prev,
                          isOpen: false,
                          fetchWeather: !cityInput.fetchWeather,
                        }))
                      }
                      className="bg-orange-600 cursor-pointer w-16 text-white flex justify-center items-center text-xl h-full"
                    >{`->`}</div>
                  </div>
                </div>
              </div>
            </form>

            {/* taskList */}
            <TaskList
              taskList={taskList}
              setTaskList={setTaskList}
              setCompletedTask={setCompletedTask}
              filteredTasks={filteredTasks}
            />
          </div>
        </section>

        {/* profile section */}
        <ProfileSection
          taskList={taskList}
          profileSectionPosition={profileSectionPosition}
          completedTask={completedTask}
          setSelectTaskList={setSelectTaskList}
          selectTaskList={selectTaskList}
        />

        {/* weather api component */}
        <WeatherComponent
          cityInput={cityInput}
          setWeatherData={setWeatherData}
          setError={setError}
        />
      </div>
    </div>
  );
}
