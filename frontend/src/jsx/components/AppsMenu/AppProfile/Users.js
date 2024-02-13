import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  let [users, setUsers] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  let [loading, setLoading] = useState(false);

  const getValues = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8086/api/private/users");
      setLoading(false);
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error("Error: Response data is not an array");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const saveRole = async id => {
    //http://localhost:8086/api/private/give-role?email=praveen.rondi%40riseslabs.com&role=Data_Analyst_Admin
    const res = await axios.post(
      `http://localhost:8086/api/private/give-role?role=${selectedClient}&email=${id}`
    );
    if (res.data.message == "Role Updated") {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      //  addToast(res.data.message, { appearance: 'success' });
    } else {
      toast.error("Error, Unable update at this time", {
        position: toast.POSITION.TOP_RIGHT
      });
      //addToast("Error, Unable update at this time", { appearance: 'error' });
    }
    console.log(res);
  };

  const handleSelectChange = e => {
    setSelectedClient(e.target.value);
  };

  useEffect(() => {
    getValues();
  }, []);


  return (
    <div className="container mt-5 ms-2">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">createdAt</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          {loading
            ? <p className="mt-2 fs-5 fw-bold text-danger">Loading...</p>
            : <tbody>
                {users.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {obj.name}
                      </td>
                      <td>
                        {obj.email}
                      </td>
                      <td>
                        {obj.createdAt}
                      </td>
                      <td>
                        <select
                          className="form-select"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                        >
                          <option selected value={obj.role}>
                            {obj.role}
                          </option>
                          {obj.remainingRoles.map((item1) => {
                             return (<option value={item1}>{item1}</option>)
                          })}
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => saveRole(obj.email)}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Users;
