import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";

const ProjectType = [
  { value: "1", label: "For Rent" },
  { value: "2", label: "For Sale" },
];
const beds = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];
const Status = [
  { value: "1", label: "Active" },
  { value: "2", label: "Inactive" },
];
const options1 = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];
const options2 = [
  { value: "1", label: "Blue Sky" },
  { value: "2", label: "Zephyr" },
  { value: "3", label: "Premiere" },
];

const inputBlog = [
  { title: "Emergency Exit", id: "label123" },
  { title: "CCTV", id: "label124" },
  { title: "Free Wi-Fi", id: "label125" },
  { title: "Free Parking In The Area", id: "label126" },
  { title: "Air Conditioning", id: "label127" },
  { title: "Security Guard", id: "label128" },
  { title: "Terrace", id: "label129" },
  { title: "Laundry Service", id: "label130" },
  { title: "Elevator Lift", id: "label131" },
  { title: "Balcony", id: "label132" },
];

const bedrooms = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];

const garages = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const bathrooms = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

const basements = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
];

const basements_type = [
  { value: "1", label: "unfurnished" },
  { value: "2", label: "furnished" },
];

const AddProperty = () => {
  const [userProperty, setUserProperty] = useState({
    project_name: "",
    front_lot_size: "",
    property_type: "",
    developer: "",
    development_fee: "",
    project_closing: "",
    property_price: "0",
    cus_special_inc: "",
    comission: "",
    broker_spec_inc: "",
    developer_email: "",
    sales_respresentative: "",
    developer_address: "",
    sales_office_telephone: "",
    status: "",
    property_area: "",
    beds: "",
    bath: "",
    area: "",
    price: "",
    premiere: "",
    description: "",
    address: "",
    zip_code: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserProperty({ ...userProperty, [name]: value });
    // console.log(name, value);
  };

  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleExcelSheetChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      
      const headers = parsedData[0];
      const values = parsedData[1]; 

      const mappedData = headers.reduce((acc, curr, index) => {
        if (values[index]) {
          acc[curr.toLowerCase()] = values[index];
        }
        return acc;
      }, {});

      setUserProperty({ ...userProperty, ...mappedData });
    };

    reader.readAsArrayBuffer(file);
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Project Name"
                      required=""
                      name="project_name"
                      value={userProperty.project_name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Front Lot</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Front Lot size"
                      required=""
                      name="front_lot"
                      value={userProperty.front_lot_size}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Type</label>
                    <Select
                      options={ProjectType}
                      className="custom-react-select"
                      isSearchable={true}
                      value={ProjectType.find(
                        (option) => option.value === userProperty.property_type
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          project_type: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developer"
                      value={userProperty.developer}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Development Fee</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="development_fee"
                      value={userProperty.development_fee}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Closing year</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="project_closing"
                      value={userProperty.project_closing}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* <div className="mb-3 col-6">
                    <label className="form-label">Property Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="$2800"
                      required=""
                      name="property_price"
                      value={userProperty.property_price}
                      onChange={handleInputChange}
                    />
                  </div> */}

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Price</label>
                    <output className="form-output d-block text-end">
                      ${userProperty.property_price}
                    </output>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                      value={userProperty.property_price}
                      onChange={handleInputChange}
                      name="property_price"
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">
                      Customer Special Incentive
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="cus_special_inc"
                      value={userProperty.cus_special_inc}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Comission</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="comission"
                      value={userProperty.comission}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">
                      Brokerage Special Incentive
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="broker_spec_inc"
                      value={userProperty.broker_spec_inc}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer Email</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developer_email"
                      value={userProperty.developer_email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Representative</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="sales_respresentative"
                      value={userProperty.sales_respresentative}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer Address</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developer_address"
                      value={userProperty.developer_address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Office Telephone</label>
                    <input
                      type="number"
                      className="form-control"
                      required=""
                      name="sales_office_telephone"
                      value={userProperty.sales_office_telephone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Status</label>
                    <Select
                      options={Status}
                      defaultValue={Status[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Area</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="property_area"
                      value={userProperty.property_area}
                      onChange={handleInputChange}
                    />
                  </div>

                  <hr className="my-4" />

                  <div className="mb-3 col-6">
                    <label className="form-label">Beds</label>
                    <Select
                      options={beds}
                      defaultValue={beds[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Baths</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Area</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="85 sq ft"
                      name="area"
                      value={userProperty.area}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* <div className="mb-3 col-6">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="$3000"
                    />
                  </div> */}

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Price</label>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Premiere</label>
                    <Select
                      options={options2}
                      defaultValue={options2[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  {/* <div className="mb-3 col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={""}
                      rows="4"
                    />
                  </div> */}

                  <div className="mb-3 col-sm-6">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address of your property"
                      name="address"
                      value={userProperty.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-sm-6">
                    <label className="form-label">Zip Code</label>
                    <input
                      type="number"
                      id="zip_code"
                      className="form-control"
                      placeholder="Enter pin code"
                      required=""
                      name="zip_code"
                      value={userProperty.zip_code}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">
                      Deposit with Agreement/Offer
                    </label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range mt-3"
                      min="0"
                      max="10000"
                      step="100"
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Deposit structure 2</label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Deposit structure 1</label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Deposit structure 3</label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Bedrooms</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Garage</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Bathrooms</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Basement</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>
                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Basement Type</label>
                    <Select
                      options={basements_type}
                      defaultValue={basements_type[1]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

                  <div className="mb-3 col-6">
                  <label className="form-label">Upload Excel Sheet</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".xlsx, .xls"
                    name="excel_sheet"
                    onChange={handleExcelSheetChange}
                  />
                </div>

                  <div className=" d-flex justify-content-center">
                    <button className="btn btn-primary">Submit</button>
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
