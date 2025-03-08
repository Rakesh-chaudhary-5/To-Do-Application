import { useContext, useState } from "react";
import CheckBox from "../assets/images/check_small.svg";
import { MyContext } from "../context/MyContext";

export default function TaskList({ taskList, setTaskList, filteredTasks }) {
  const [removeButton, setRemoveButton] = useState();
  const { mode } = useContext(MyContext);

  //  Handling checkbox
  const handleCheckBox = (el) => {
    setTaskList((prev) =>
      prev.map((e) => (e.id === el ? { ...e, checkbox: !e.checkbox } : e))
    );
  };

  //  Handling highlight
  const handleHighlight = (el) => {
    setTaskList((prev) =>
      prev.map((e) => (e.id == el ? { ...e, highlight: !e.highlight } : e))
    );
  };

  // Remove the Task
  const handleRemoveTask = (e) => {
    setTaskList((prev) => prev.filter((el) => el.id !== e));
  };

  return filteredTasks.map((el) => (
    // individual task
    <div
      key={el.id}
      className="border-b-2"
      onClick={() => (removeButton ? setRemoveButton("") : "")}
    >
      <div className="flex justify-between relative sm:items-center px-2 py-8 sm:p-8">
        {/* left section */}
        <div className="sm:flex-row flex-col flex gap-4 sm:items-center">
          {/* check box */}
          <div
            onClick={() => handleCheckBox(el.id)}
            className={`${el.checkbox ? "bg-[#008000]" : "bg-inherit"} ${
              mode ? "border-white" : "border-black"
            }  border-2 cursor-pointer select-none flex justify-center items-center rounded-sm transition-all duration-300 w-5 h-5`}
          >
            <p className={`${el.checkbox ? "text-white" : "text-transparent"}`}>
              &#10003;
            </p>
          </div>

          {/* goal */}
          <p>{el?.goal}</p>
        </div>

        {/* task  Prioritization */}
        <div className="flex  gap-2">
          <div
            onClick={() => handleHighlight(el.id)}
            className="text-3xl cursor-pointer"
          >
            {!el.highlight ? "☆" : "★"}
          </div>
          {/* opening of remove button */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setRemoveButton(el.id);
            }}
            className="text-2xl cursor-pointer"
          >
            ...
          </div>
          {/* remove button */}
          <button
            onClick={() => handleRemoveTask(el.id)}
            className={`px-4 absolute ${
              removeButton == el.id ? "visible" : "invisible"
            } -bottom-6 z-10  py-2 rounded-md font-semibold text-white bg-[#8a1f1f] cursor-pointer hover:bg-[#ff0000] `}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ));
}
