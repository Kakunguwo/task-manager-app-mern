import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteTask from "../pages/DeleteTask";

export default function TaskTable({ data }) {
  console.log(data);
  return (
    <div className="container table-container">
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/tasks/${item?._id}`}>
                      <button>View</button>
                    </Link>
                    <Link to={`/tasks/${item?._id}/edit`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <DeleteTask id={item?._id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You do not have any tasks</p>
      )}
    </div>
  );
}

TaskTable.propTypes = {
  data: PropTypes.array.isRequired,
};
