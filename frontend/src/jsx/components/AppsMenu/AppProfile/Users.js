import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Users = () => {

  let [users,setUsers]= useState([])
  const [selectedClient,setSelectedClient] = useState([]);
    
  const getValues = async () => {
    try {
      const res = await axios.get('http://localhost:8086/api/private/users');
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error('Error: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message)
    }
  };
  const saveRole =async(id) =>{//http://localhost:8086/api/private/give-role?email=praveen.rondi%40riseslabs.com&role=Data_Analyst_Admin
    const res = await axios.post(`http://localhost:8086/api/private/give-role?role=${selectedClient}&email=${id}`); 
    debugger;
   
  }

  const handleSelectChange = (e) => {
    setSelectedClient(e.target.value);
  }
    
    useEffect(()=>{
        getValues();
    },[])


  return (
    <div className='container mt-5 ms-2'>
    <div className="table-responsive">
   <table class="table">
       <thead>
           <tr>
               <th scope="col">S.No</th>
               <th scope="col">User Name</th>
               <th scope="col">Email</th>
               <th scope="col">createdAt</th>
               <th scope="col">Role</th>
           </tr>
       </thead>
       <tbody>
          {
           users.map((obj,index)=>{
               return(
               <tr key={index}>
                   <td>{index+1}</td>
                   <td>{obj.name}</td>
                   <td>{obj.email}</td>
                   <td>{obj.createdAt}</td>
                   <td>
                    <select className="form-select"  onChange={handleSelectChange}  aria-label="Default select example">
                    <option selected value={obj.role}>{obj.role}</option>
                    <option value="Super_Admin">Data_Entry_User</option>
                    <option value="Data_Analyst_Admin">Data_Analyst_Admin</option>
                    <option value="Agent">Agent</option>
                  </select>
                  </td>
                  <td>
                    <button className='btn btn-primary btn-sm' onClick={()=>saveRole(obj.email)}>
                      Save
                    </button>
                  </td>
               </tr>
               )
           })
          }
       </tbody>
   </table>
   </div>
</div>
  )
}

export default Users