import React from "react";
import TaskItem from "../taskItem/TaskItem";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
      {tasks?.length === 0 ? (
        <div className="w-full">
          <p className=" text-[#454545] text-sm pb-16 pt-4">
            Your added tasks wil show here!
          </p>
        </div>
      ) : (
        tasks?.map((task) => {
          return (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={() => onDelete(task._id)}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          );
        })
      )}
    </div>
  );
};

export default TaskList;
