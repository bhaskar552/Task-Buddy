import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();
  const [selectedFilterStatus, setSelectedFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [originalTasks, setOriginalTasks] = useState([]);

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => {
      setTasks(data.tasks);
      setAllTasks(data.tasks);
      setOriginalTasks(data.tasks);
    });
    setSelectedFilterStatus("All");
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const filterStatus = (event) => {
    let filteredTasks = allTasks.filter((task) => task.status === event.target.value);
    setSelectedFilterStatus(event.target.value);
    if (event.target.value === "All") {
      setTasks([...allTasks]);
    } else {
      setTasks([...filteredTasks]);
    }
  };

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  const handleSearch = () => {
    const filteredTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setTasks(filteredTasks);
  };

  const ClearSearch = () => {
    setSearchQuery("");
    setSelectedFilterStatus("All");
    setTasks(originalTasks);
  };

  return (
    <div className="my-2 mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 sm:mr-4">
          <div className="flex flex-col items-center sm:flex-row">
            <span className="text-gray-600 mb-1 sm:mr-2">Filter</span>
            <select
              onChange={filterStatus}
              value={selectedFilterStatus}
              className="w-full sm:w-auto px-3 py-2 text-gray-600 rounded-[4px] border-2 border-gray-100 focus:border-primary transition outline-none hover:border-gray-300 bg-green-200"
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 mb-2 sm:mb-0 mr-2 border-gray-300 border rounded-[4px] focus:outline-none focus:border-primary"
            placeholder="Search by title"
          />
          <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Search
          </button>
          {searchQuery && (
            <button onClick={ClearSearch} className="px-4 py-2 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
              Clear
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.length === 0 ? (
            <div className="w-full h-[300px] flex items-center justify-center">
              <span>No tasks found  </span>
              <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2 ml-4 sm:ml-0 mt-4 sm:mt-0">+ Add new task</Link>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={task._id} className="bg-blue-200 p-4 text-gray-600 rounded-md shadow-md relative">
                <div className="font-medium">Task #{index + 1}</div>
                <div className="mt-2 mb-2 text-sm">{task.title}</div>
                <div className="whitespace-pre mb-2 text-sm">{task.description}</div>
                <div className="absolute bottom-0 right-0 flex items-center">
                  <Tooltip text={"Edit this task"} position={"top"}>
                    <Link to={`/tasks/${task._id}`} className="text-green-600 cursor-pointer mr-2">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </Tooltip>
                  <Tooltip text={"Delete this task"} position={"top"}>
                    <span className="text-red-500 cursor-pointer" onClick={() => handleDelete(task._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </Tooltip>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
