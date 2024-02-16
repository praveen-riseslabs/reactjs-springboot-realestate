import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyType() {
  const [metadata, setMetadata] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newType, setNewType] = useState(false);


  const getvalues = () => {
    axios.get('http://localhost:8086/api/metadata/property/all')
    .then(response => {
      setMetadata(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  useEffect(() => {
    getvalues()
  }, []);

  const handleAddRow = () => {
    const newMetadata = [...metadata, { type: '' }];
    setMetadata(newMetadata);
    setEditingIndex(newMetadata.length - 1);
    setNewType(true)
  };

  const handleNewData = (index) => {
    const newData = {
      propertyField: metadata[index].type // Only send the 'type' field to the backend
    };
    
    axios.post('http://localhost:8086/api/metadata/property/add', newData)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        setNewType(false);
        setEditingIndex(-1);
        getvalues()
      })
      .catch(error => {
        console.error('Error saving data:', error);
        getvalues()
      });
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    const updatedData = {
      id: metadata[index].id,
      propertyField: metadata[index].type
    };
  
    axios.put(`http://localhost:8086/api/metadata/property/update/${updatedData.id}`, updatedData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        setEditingIndex(-1);
        getvalues()
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };
  

  const handleDelete = (index) => {
    const garageIdToDelete = metadata[index].id; 
    axios.delete(`http://localhost:8086/api/metadata/property/delete/${garageIdToDelete}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        
        const updatedMetadata = metadata.filter((item, i) => i !== index);
        setMetadata(updatedMetadata);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleChange = (index, field, e) => {
    const updatedMetadata = [...metadata];
    updatedMetadata[index][field] = e.target.value;
    setMetadata(updatedMetadata);
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={handleAddRow}>Add Type</button>
      <table className="table">
        <thead>
          <tr>
            <th className='w-10 text-center'>S.No</th>
            <th className='text-center w-40'>Property Type</th>
            <th className='w-50'>Action</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((item, index) => (
            <tr key={index}>
              <td className='w-10 text-center'>{index + 1}</td>
              <td className='text-center w-40 '>
                {editingIndex === index ? (
                  <input type="text" value={item.type} onChange={(e) => handleChange(index, 'type', e)} className="form-control text-center"   />
                ) : (
                  item.propertyField
                )}
              </td>
              <td className='w-50'>
                {editingIndex === index ? (
                  newType ? <button  className="btn btn-success btn-sm" onClick={() => handleNewData(index)}>Add Data</button> :
                  <button className="btn btn-success" onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm" style={{marginRight:"10px"}} onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyType;
