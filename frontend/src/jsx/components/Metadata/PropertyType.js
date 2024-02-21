import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash,faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function PropertyType() {
  const [metadata, setMetadata] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newType, setNewType] = useState(false);
  const [text, setText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const getvalues = () => {
    axios.get("http://localhost:8086/api/metadata/property/all")
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
      propertyField: (metadata[index]?.type || "").trim(),
    };

    if (!newData.propertyField) {
      toast.error("Text is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const isDuplicate = metadata.some(item => item.propertyField === newData.propertyField);
    if (isDuplicate) {
      toast.error("Value already exists, Enter new value", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    axios.post("http://localhost:8086/api/metadata/property/add", newData)
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
        setNewType(false);
        toast.error("Error saving data", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Error saving data:", error);
        getvalues();
      });
  };

  const handleEdit = (index) => {
    setNewType(false);
    setText(metadata[index].propertyField);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setText('');
    setEditingIndex(-1);
  };

  const handleSave = (index) => {
    setNewType(false);
    const currentValue = metadata[index].propertyField;
    const updatedData = {
      id: metadata[index].id,
      propertyField: (metadata[index]?.type || "").trim(), // Trim whitespace if type exists
    };

    if (!updatedData.propertyField) {
      updatedData.propertyField = currentValue;
    }

    const isDuplicate = metadata.some(item => item.propertyField === updatedData.propertyField);
    if (isDuplicate) {
      toast.error("Value already exists, Enter new value", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    axios.put(`http://localhost:8086/api/metadata/property/update/${updatedData.id}`, updatedData )
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
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    const garageIdToDelete = metadata[deleteIndex].id;
    axios.delete(`http://localhost:8086/api/metadata/property/delete/${garageIdToDelete}`)
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
  const inputValue = e.target.value;
  const regex = /^$|^[A-Za-z]+$/;
  
  if (!regex.test(inputValue)) {
    toast.error("Type text should only contain alphabets", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }

  const updatedMetadata = [...metadata];
  updatedMetadata[index][field] = inputValue;
  setText(inputValue);
  setMetadata(updatedMetadata);
};


  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={handleAddRow}>Add PropertyType</button>
      <table className="table">
        <thead>
          <tr>
            <th className="w-10 text-center">S.No</th>
            <th className="text-center w-40">Property Type</th>
            <th className="w-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((item, index) => (
            <tr key={index}>
              <td className="w-10 text-center">{index + 1}</td>

              <td className="text-center w-40 ">
                {editingIndex === index ? (
                  <input type="text" value={text} onChange={(e) => handleChange(index, "type", e)} className="form-control text-center"/>
                ) : (
                  <span>{metadata[index].propertyField}</span>
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

export default PropertyType;
