import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const PropertyList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8086/api/public/project-details/get-all-projects');
        setList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5 ms-2">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Project Name</th>
              <th scope="col">Project Type</th>
              <th scope="col">Project Closing Year</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {list.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{obj.projectName}</td>
                  <td>{obj.propertyType}</td>
                  <td>{obj.projectClosingYear}</td>
                  <td>{obj.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyList;
