import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import axios from "axios";

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
    projectName: "",
    propertyType: "",
    propertyArea: "",
    developer: "",
    propertyClosing: "",
    projectClosingYear: "",
    status: "",
    comission: "",
    commissionPayment: "",
    developerEmail: "",
    salesRepresentatives: "",
    salesOfficeTelephone: "",
    modelName: "",
    modelCost: "",
    modelSize: "",
    story: "",
    frontLotSize: "",
    lotDepth: "",
    bedrooms: "",
    garage: "",
    bathrooms: "",
    basement: "",
    basementType: "",
    inclusion: "",
    addOn: "",
    intersection: "",
    projectPhase: "",
    totalDeposit: "",
    depositSubmission: "",
    developmentCharges: "",
    maintainanceFreehold: "",
    maintainanceAmount: "",
    developerSpecialIncentive: "",
    dhreSpecialIncentive: "",
    websiteLink: "",
    address: "",
  });

  const [file, setFile] = useState(null);


  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserProperty({ ...userProperty, [name]: value });
    // console.log(name, value);
  };

  const { handleSubmit } = useForm();

  const onSubmit = async(data) => {
    console.log(userProperty);
    try {
      // Send a POST request to your API endpoint
      const response = await axios.post("http://localhost:8086/api/public/project-details/create", userProperty);
      console.log("Data sent to backend successfully");
      // Optionally, you can handle the response from the server here
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const fileReader = new FileReader();
      fileReader.onload = async(e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Assuming your Excel sheet has headers and you want to convert each row into an object
        const objectsArray = jsonData.slice(1).map(row => {
          const obj = {};
          jsonData[0].forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });
        console.log(objectsArray)

        const response = await axios.post("http://localhost:8086/api/public/project-details/upload-customers-data", objectsArray);
        console.log("Excel data sent to backend successfully");
       
        axios.post('http://localhost:8086/api/public/project-details/upload-customers-data', objectsArray)
        .then(response => {
          console.log('Data sent to backend successfully');
        })
        .catch(error => {
          console.error('Error sending data to backend:', error);
        })
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading file:', error);
    }
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
                      name="projectName"
                      value={userProperty.projectName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Type</label>
                    <Select
                      options={ProjectType}
                      className="custom-react-select"
                      isSearchable={true}
                      value={ProjectType.find(
                        (option) => option.value === userProperty.propertyType
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          ProjectType: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Area</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="propertyArea"
                      value={userProperty.propertyArea}
                      onChange={handleInputChange}
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
                    <label className="form-label">Property Closing</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="propertyClosing"
                      value={userProperty.propertyClosing}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Closing year</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="projectClosingYear"
                      value={userProperty.projectClosingYear}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Status</label>
                    <Select
                      options={Status}
                      className="custom-react-select"
                      isSearchable={false}
                      value={Status.find(
                        (option) => option.value === userProperty.status
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          status: selectedOption.value,
                        })
                      }
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
                    <label className="form-label">Comission Payment</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="commissionPayment"
                      value={userProperty.commissionPayment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required=""
                      name="developerEmail"
                      value={userProperty.developerEmail}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Representative</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="salesRepresentatives"
                      value={userProperty.salesRepresentatives}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Office Telephone</label>
                    <input
                      type="number"
                      className="form-control"
                      required=""
                      name="salesOfficeTelephone"
                      value={userProperty.salesOfficeTelephone}
                      onChange={handleInputChange}
                    />
                  </div>


                  <div className="mb-3 col-6">
                    <label className="form-label">Model Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="modelName"
                      value={userProperty.modelName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model cost</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="modelCost"
                      value={userProperty.modelCost}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model size</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="modelSize"
                      value={userProperty.modelSize}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Story</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="story"
                      value={userProperty.story}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Front Lot Size</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Front Lot size"
                      required=""
                      name="frontLotSize"
                      value={userProperty.frontLotSize}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Lot Depth</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Front Lot size"
                      required=""
                      name="lotDepth"
                      value={userProperty.lotDepth}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Bedrooms</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                      value={ProjectType.find(
                        (option) => option.value === userProperty.propertyType
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          propertyType: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Garage</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                      value={garages.find(
                        (option) => option.value === userProperty.garage
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          garage: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Bathrooms</label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                      value={bathrooms.find(
                        (option) => option.value === userProperty.bathrooms
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          bathrooms: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Basement </label>
                    <Select
                      options={options1}
                      defaultValue={options1[0]}
                      className="custom-react-select"
                      isSearchable={false}
                      value={basements.find(
                        (option) => option.value === userProperty.basement
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          basement: selectedOption.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label className="form-label">Basement Type</label>
                    <Select
                      options={basements_type}
                      defaultValue={basements_type[1]}
                      className="custom-react-select"
                      isSearchable={false}
                      value={basements_type.find(
                        (option) => option.value === userProperty.basementType
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          basementType: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Inclusion</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="inclusion"
                      value={userProperty.inclusion}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Add on</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="addOn"
                      value={userProperty.addOn}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Intersection</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="intersection"
                      value={userProperty.intersection}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Phase</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="projectPhase"
                      value={userProperty.projectPhase}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Total Deposit</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="totalDeposit"
                      value={userProperty.totalDeposit}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Deposit Submission</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="depositSubmission"
                      value={userProperty.depositSubmission}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Development Charges</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developmentCharges"
                      value={userProperty.developmentCharges}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Maintainance freehold</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="maintainanceFreehold"
                      value={userProperty.maintainanceFreehold}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Maintainance amount</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="maintainanceAmount"
                      value={userProperty.maintainanceAmount}
                      onChange={handleInputChange}
                    />
                  </div>

                

                  <div className="mb-3 col-6">
                    <label className="form-label">
                    Developer Special Incentive
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developerSpecialIncentive"
                      value={userProperty.developerSpecialIncentive}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">
                    DHRE SPECIAL INCENTIVE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="dhreSpecialIncentive"
                      value={userProperty.dhreSpecialIncentive}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Website Link</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="websiteLink"
                      value={userProperty.websiteLink}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className=" d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary">Add New Property</button>
                  </div>
             
                  <hr className="my-4" />

                 

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

                  <div className="mb-3 col-sm-6">
                    <label className="form-label">Developer Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address of your property"
                      name="address"
                      value={userProperty.address}
                      onChange={handleInputChange}
                    />
                  </div>

               

                  <div className="mb-3 col-6 ">
                    <label className="form-label">Upload Excel Sheet</label><br/>
                    <div className="d-flex align-items-center">
                    <input type="file" accept=".xlsx, .xls"  name="excel_sheet" className="form-control" onChange={handleFileChange} />
                    <button className="bg-gray p-2 m-2 border-0 " onClick={handleUpload}>Upload</button>
                    </div>
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
