import { Check, Trash2 } from "lucide-react";

export default function TaskItem({ task, updateTask, deleteTask }) {
  const { id, value, completed } = task;

  return (
    <div className="task">
      <input
        className="hidden"
        type="checkbox"
        id={id}
        checked={completed}
        onChange={() => {
          updateTask({ id, completed: !completed });
        }}
      />
      <label
        className="flex h-10 items-center rounded px-2 hover:bg-gray-900"
        htmlFor={id}
      >
        <span className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-gray-500 text-transparent">
          <Check className="h-4 w-4" />
        </span>
        <span className="ml-4 text-sm">{value}</span>

        <Trash2
          className="ml-auto h-5 w-5 cursor-pointer text-red-400 hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            deleteTask(id);
          }}
        />
      </label>
    </div>
  );
}
