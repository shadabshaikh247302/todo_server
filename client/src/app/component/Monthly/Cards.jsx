import { useContext, useState, useEffect } from "react";
import { MonthlyContext } from "@/app/Context/MonthlyContext";
import { Authcontext } from "@/app/Context/AuthContext";
import "./Card.css"; // Import styles

export const Cards = ({ fetchTodos }) => {
  const { MonthlyPlan, month, deleteTaskMonthly } = useContext(MonthlyContext);
  const { AuthData } = useContext(Authcontext);
  const [isLoading, setIsLoading] = useState(true);

  // Group tasks by month
  const groupedTasks = MonthlyPlan.reduce((acc, task) => {
    const monthIndex = parseInt(task.month, 10) - 1;
    const taskMonth = month[monthIndex];

    if (!acc[monthIndex]) {
      acc[monthIndex] = { name: taskMonth, tasks: [] };
    }
    acc[monthIndex].tasks.push(task);
    return acc;
  }, {});

  // Sort tasks by month index
  const sortedGroupedTasks = Object.values(groupedTasks).sort(
    (a, b) => month.indexOf(a.name) - month.indexOf(b.name)
  );

  // Handle delete task
  async function handleDelete(id) {
    const status = await deleteTaskMonthly(AuthData, id);
    if (status === 200) {
      fetchTodos();
      window.location.reload()
    }
  }

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [MonthlyPlan]);

  return (
    <div className="card-container scroll-container"style={{border:"0px solid black",overflowX:"scroll",height:"400px"}}>
      {sortedGroupedTasks.length > 0 ? (
        sortedGroupedTasks.map(({ name, tasks }) => (
          <div key={name} className="month-section">
            <h2 className="month-title">{name}</h2>
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className="task-item">
                  <div className="card-month">
                    <div className="task-details">
                      <p><strong>Title:</strong> {task.tittle}</p>
                      <p><strong>Date:</strong> {task.day}/{task.year}</p>
                    </div>
                    <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                      ✖
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks available.</p>
      )}
    </div>
  );
};
