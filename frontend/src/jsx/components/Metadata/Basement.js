import React, { useState } from 'react';
import './style.scss'

function Basement() {
  const [metadata, setMetadata] = useState([
    { id: 1, type: 'Type 1' },
    { id: 2, type: 'Type 2' },
    { id: 3, type: 'Type 3' }
  ]);
  const [editingIndex, setEditingIndex] = useState(-1); // Initially no row is being edited

  const handleAddRow = () => {
    setMetadata([...metadata, { id: metadata.length + 1, type: '' }]);
  };

  const handleEdit = (index) => {
    // Set the editingIndex to the index of the row being edited
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    // Reset editingIndex when "Save" button is clicked
    setEditingIndex(-1);
  };

  const handleDelete = (index) => {
    // Delete the item and update IDs of remaining items
    const updatedMetadata = metadata.filter((item, i) => i !== index).map((item, i) => ({ ...item, id: i + 1 }));
    setMetadata(updatedMetadata);
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
            <th className='w-10 text-center'>ID</th>
            <th className='text-center w-40'>Basement</th>
            <th className='w-50'>Action</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((item, index) => (
            <tr key={index}>
              <td className='w-10 text-center'>{item.id}</td>
              <td className='text-center w-40 '>
                {editingIndex === index ? (
                  <input type="text" value={item.type} onChange={(e) => handleChange(index, 'type', e)} className="form-control text-center"   />
                  ) : (
                  item.type
                  )}
              </td>
              <td className='w-50'>
                {editingIndex === index ? (
                  <button className="btn btn-success" onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
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

export default Basement