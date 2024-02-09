import React from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

const ProjectType = [
    { value: '1', label: 'For Rent' },
    { value: '2', label: 'For Sale' },
]
const beds = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' }
];
const Status = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Inactive' },
];
const options1 = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' }
];
const options2 = [
    { value: '1', label: 'Blue Sky' },
    { value: '2', label: 'Zephyr' },
    { value: '3', label: 'Premiere' }
];

const inputBlog = [
    {title:'Emergency Exit', id:'label123'},
    {title:'CCTV', id:'label124'},
    {title:'Free Wi-Fi', id:'label125'},
    {title:'Free Parking In The Area', id:'label126'},
    {title:'Air Conditioning', id:'label127'},
    {title:'Security Guard', id:'label128'},
    {title:'Terrace', id:'label129'},
    {title:'Laundry Service', id:'label130'},
    {title:'Elevator Lift', id:'label131'},
    {title:'Balcony', id:'label132'},
];

const AddProperty = () => {

    const { handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data);
      };


    return (
        <>
            <div className="row property">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Add Property</h4>
                        </div>

                        <div className="card-body">
                            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Project Name</label>
                                        <input type="text" className="form-control" placeholder="Enter Project Name" required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Front Lot</label>
                                        <input type="text" className="form-control" placeholder="Enter Front Lot size" required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Project Type</label>
                                        <Select 
                                            options={ProjectType} 
                                            className="custom-react-select"
                                            isSearchable = {true}
                                        />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Developer</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Development Fee</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Project Closing year</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Property Price</label>
                                        <input type="text" className="form-control" placeholder="$2800" required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Customer Special Incentive</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Comission</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Brokerage Special Incentive</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Developer Email</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Sales Representative</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Developer Address</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Sales Office Telephone</label>
                                        <input type="number" className="form-control"  required="" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Status</label>
                                        <Select 
                                            options={Status} 
                                            defaultValue={Status[0]}
                                            className="custom-react-select"
                                            isSearchable = {false}
                                        /> 
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Property Area</label>
                                        <input type="text" className="form-control"  required="" />
                                    </div>

                                    <hr className="my-4" />

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Beds</label>
                                        <Select 
                                            options={beds} 
                                            defaultValue={beds[0]}
                                            className="custom-react-select"
                                            isSearchable = {false}
                                        /> 
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Baths</label>                                       
                                        <Select 
                                            options={options1} 
                                            defaultValue={options1[0]}
                                            className="custom-react-select"
                                            isSearchable = {false}
                                        />  
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Area</label>
                                        <input type="text" className="form-control" placeholder="85 sq ft" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Price</label>
                                        <input type="text" className="form-control" placeholder="$3000" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Premiere</label>
                                        <Select 
                                            options={options2} 
                                            defaultValue={options2[0]}
                                            className="custom-react-select"
                                            isSearchable = {false}
                                        /> 
                                    </div>

                                    <div className="mb-3 col-12">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" 
                                            defaultValue={""}
                                            rows="4" 
                                        />
                                    </div>

                                    <div className="mb-3 col-sm-6">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" placeholder="Address of your property" />
                                    </div>

                                    <div className="mb-3 col-sm-6">
                                        <label className="form-label">Zip Code</label>
                                        <input type="number" id="zip_code" className="form-control" placeholder="Enter pin code" required="" />
                                    </div>
                                    
                                </div>
                            </form>
                           
                        </div> 
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default AddProperty;