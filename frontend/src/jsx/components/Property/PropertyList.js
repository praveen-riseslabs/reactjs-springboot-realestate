import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const PropertyList = () => {
  let [list, setData] = useState([]);
//   let [loading, setLoading] = useState(false);

  const getValues = async ()=>{
    // let res = await axios.get('http://localhost:8086/api/public/project-details/create')
    // setData(res.data)
}
// console.log(details)
useEffect(()=>{
    getValues();
},[])


  return (
    <div className="container mt-5 ms-2">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">projectName</th>
              <th scope="col">projectType</th>
              <th scope="col">projectClosingYear</th>
              <th scope="col">price</th>
            </tr>
          </thead>
         
             <tbody>
                {list.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{obj.projectName}</td>
                      <td>{obj.projectType}</td>
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