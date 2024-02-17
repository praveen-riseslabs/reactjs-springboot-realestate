import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash,faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Garage() {
  const [metadata, setMetadata] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newType, setNewType] = useState(false);
  const [text, setText] = useState("");

  const getvalues = () => {
    setNewType(false);
    axios.get("http://localhost:8086/api/metadata/garage/all")
      .then((response) => {
        setMetadata(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getvalues();
  }, []);

  const handleAddRow = () => {
    if(!newType) {
      const newMetadata = [...metadata, { type: "" }];
      setMetadata(newMetadata);
      setEditingIndex(newMetadata.length - 1);
      setNewType(true);
    }
  };

  const handleNewData = (index) => {
    setNewType(false);
    setText('')
    const newData = {
      garage: (metadata[index]?.type || "").trim(),
    };

    if (!newData.garage) {
      toast.error("Text is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    axios.post("http://localhost:8086/api/metadata/garage/add", newData)
      .then((response) => {
        toast.success("Data saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Data saved successfully:", response.data);
        setNewType(false);
        setEditingIndex(-1);
        getvalues();
      })
      .catch((error) => {
        toast.error("Error saving data", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Error saving data:", error);
        getvalues();
      });
  };

  const handleEdit = (index) => {
    setText(metadata[index].garage);
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    setNewType(false);
    const currentValue = metadata[index].garage;
    const updatedData = {
      id: metadata[index].id,
      garage: (metadata[index]?.type || "").trim(),
    };

    if (!updatedData.garage) {
      updatedData.garage = currentValue;
    }

    axios.put(`http://localhost:8086/api/metadata/garage/update/${updatedData.id}`, updatedData )
      .then((response) => {
        toast.success("Data updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Data updated successfully:", response.data);
        setEditingIndex(-1);
        getvalues();
        setText('')
      })
      .catch((error) => {
        toast.error("Error updating data", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Error updating data:", error);
      });
  };

  const handleDelete = (index) => {
    setNewType(false);
    const garageIdToDelete = metadata[index].id;
    axios.delete(`http://localhost:8086/api/metadata/garage/delete/${garageIdToDelete}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        toast.success("Data deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const updatedMetadata = metadata.filter((item, i) => i !== index);
        setMetadata(updatedMetadata);
      })
      .catch((error) => {
        toast.error("Error deleting data", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Error deleting data:", error);
      });
  };

  const handleChange = (index, field, e) => {
    const updatedMetadata = [...metadata];
    updatedMetadata[index][field] = e.target.value;
    setText(e.target.value);
    setMetadata(updatedMetadata);
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={handleAddRow}>Add Type</button>
      <table className="table">
        <thead>
          <tr>
            <th className="w-10 text-center">S.No</th>
            <th className="text-center w-40">Garage</th>
            <th className="w-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((item, index) => (
            <tr key={index}>
              <td className="w-10 text-center">{index + 1}</td>

              <td className="text-center w-40 ">
                {editingIndex === index ? (
                  <input type="text" value={text} onChange={(e) => handleChange(index, "type", e)} className="form-control text-center" placeholder="Enter Numeric value" />
                ) : (
                  <span>{metadata[index].garage}</span>
                )}
              </td>

              <td className="w-50">
                {editingIndex === index ? ( newType ? (
                    <>
                    <button className="btn btn-success btn-sm" onClick={() => handleNewData(index)}> Add Data </button>
                    <FontAwesomeIcon className="text-danger  fa-lg mt-2 ms-3" onClick={()=>getvalues()} icon={faCircleXmark} />
                    </>
                  ) : (
                    <button className="btn btn-success" onClick={() => handleSave(index)}>  Save</button> )
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPenToSquare} className="  fa-lg m-1 "onClick={() => handleEdit(index)}/>{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faTrash} className="text-danger  fa-lg m-1 "  onClick={() => handleDelete(index)}/>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Garage