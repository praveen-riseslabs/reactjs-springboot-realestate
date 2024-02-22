import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash,faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Bathrooms() {
  const [metadata, setMetadata] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newType, setNewType] = useState(false);
  const [text, setText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const getvalues = () => {
    setNewType(false);
    axios.get("http://localhost:8086/api/metadata/bathroom/all")
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
    setText('')
    const newData = {
        numberOfBathrooms:  parseFloat((metadata[index]?.type || "").trim()),
    };

    if (isNaN(newData.numberOfBathrooms) || newData.numberOfBathrooms < 0 || newData.numberOfBathrooms > 999) {
      toast.error("Please enter a realistic number between 0 to 999", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (!newData.numberOfBathrooms) {
      toast.error("Text is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    let f = checkUnique(newData.numberOfBathrooms)
    if(f>0){
      toast.error("value already exsit", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else{
    axios.post("http://localhost:8086/api/metadata/bathroom/add", newData)
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
    }
  };

  const handleEdit = (index) => {
    setNewType(false);
    setText(metadata[index].numberOfBathrooms);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setText('');
    setEditingIndex(-1);
  };

  const handleSave = (index) => {
    setNewType(false);
    const currentValue = metadata[index].numberOfBathrooms;
    const updatedData = {
      id: metadata[index].id,
      numberOfBathrooms: (metadata[index]?.type || "").trim(), // Trim whitespace if type exists
    };

    if (parseFloat(updatedData.numberOfBathrooms) < 0 || updatedData.numberOfBathrooms.length > 3) {
      toast.error("Please enter a realistic number between 0 to 999", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return; 
    }

    if (!updatedData.numberOfBathrooms) {
      updatedData.numberOfBathrooms = currentValue;
    }

    let f = checkUnique(updatedData.numberOfBathrooms)
    if(f>0){
      toast.error("value already exsit", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }else{

    axios.put(`http://localhost:8086/api/metadata/bathroom/update/${updatedData.id}`, updatedData )
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
    }
  };

  const handleDelete = (index) => {
    setNewType(false);
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    const garageIdToDelete = metadata[deleteIndex].id;
    axios.delete(`http://localhost:8086/api/metadata/bathroom/delete/${garageIdToDelete}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        toast.success("Data deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const updatedMetadata = metadata.filter((item, i) => i !== deleteIndex);
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
    console.log("Number of Bathrooms:", metadata[index].numberOfBathrooms);
  };

  const checkUnique = (val)=>{
    let flag = 0
    metadata.forEach((item)=>{
      if(item.numberOfBathrooms === val){
        flag++
      }
    })
    return flag
  }

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={handleAddRow}>Add Bathrooms</button>
      <table className="table">
        <thead>
          <tr>
            <th className="w-10 text-center">S.No</th>
            <th className="text-center w-40">Bathrooms </th>
            <th className="w-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((item, index) => (
            <tr key={index}>
              <td className="w-10 text-center">{index + 1}</td>

              <td className="text-center w-40 ">
                {editingIndex === index ? (
                  <input
                    type="number" // Change input type to "number"
                    value={text}
                    onChange={(e) => handleChange(index, "type", e)}
                    className="form-control text-center"
                    placeholder="Enter Numeric value"
                  />
                ) : (
                  <span>{metadata[index].numberOfBathrooms}</span>
                )}
              </td>

              <td className="w-50">
                {editingIndex === index ? ( newType ? (
                    <>
                    <button className="btn btn-success btn-sm" onClick={() => handleNewData(index)}> Add Data </button>
                    <FontAwesomeIcon className="text-danger  fa-lg mt-2 ms-3" onClick={()=>getvalues()} icon={faCircleXmark} />
                    </>
                  ) : (
                    <>
                    <button className="btn btn-success" onClick={() => handleSave(index)}>Save</button>
                    <button className="btn btn-secondary ms-2" onClick={() => handleCancelEdit()}>Cancel</button>
                  </> )
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

      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="close p-2" onClick={() => setShowDeleteModal(false)} style={{fontSize: "2rem", border:'none'  }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => handleConfirmDelete()}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Bathrooms;

