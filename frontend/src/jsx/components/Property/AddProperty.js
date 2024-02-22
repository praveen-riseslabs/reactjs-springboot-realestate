import React, { useState, useEffect  } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
// import * as XLSX from "xlsx";
import axios from "axios";



const AddProperty = () => {
  const [userProperty, setUserProperty] = useState({
    projectName: "",
    propertyType: "",
    propertyArea: "",
    developer: "",
    propClosing: "",
    propClosingYear: 0,
    status: "",
    comission: 0,
    commissionPayment: "",
    developerEmail: "",
    salesRepresentatives: "",
    salesOfficeTelephone: "",
    modelName: "",
    modelCost: "",
    modelSize: 0,
    story: 0,
    frontLotSize: 0,
    lotDepth: 0,
    bedrooms: 0,
    garage: 0,
    bathrooms: 0,
    basement: "",
    basementType: "",
    inclusion: "",
    addOn: "",
    intersection: "",
    projectPhase: 0,
    totalDeposit: 0,
    depositSubmission: "",
    developmentCharges: 0,
    maintainanceFreehold: 0,
    maintainanceAmount: "",
    developerSpecialIncentive: "",
    dhreSpecialIncentive: 0,
    websiteLink: "",
    address: "",
  });

  const [file, setFile] = useState(null);
  const [statusOptions, setstatusOptions] = useState([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [garageOptions, setgarageOptions] = useState([]);
  const [frontLotOptions, setfrontLotOptions] = useState([]);
  const [bedRoomsOptions, setbedRoomsOptions] = useState([]);
  const [bathRoomsOptions, setbathRoomsOptions] = useState([]);
  const [basementTypeOptions, setbasementTypeOptions] = useState([]);

  const [rangeValue, setRangeValue] = useState(0);


  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserProperty({ ...userProperty, [name]: value });
    // console.log(name, value);
  };

  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(userProperty);
    try {
      const response = await axios.post(
        "http://localhost:8086/api/public/project-details/create",
        userProperty
      );
      console.log("Data sent to backend successfully", response.data);
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
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axios.post(
        "http://localhost:8086/api/public/project-details/upload-customers-data",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        }
      );
  
      console.log("Excel sheet Data sent to backend successfully", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  

  
  const fetchData = async () => {
    try {
      const [statusResponse, propertyTypeResponse,garageResponse,frontLotResponse,bedRoomsResponse,bathRoomsResponse,basementTypeResponse ] = await axios.all([
        axios.get("http://localhost:8086/api/metadata/status/all"),
        axios.get("http://localhost:8086/api/metadata/property/all"),
        axios.get("http://localhost:8086/api/metadata/garage/all"),
        axios.get("http://localhost:8086/api/metadata/frontlot/all"),
        axios.get("http://localhost:8086/api/metadata/bedroom/all"),
        axios.get("http://localhost:8086/api/metadata/bathroom/all"),
        axios.get("http://localhost:8086/api/metadata/basement/all")
      ]);

      setstatusOptions(statusResponse.data.map(item => ({ value: item.status, label: item.status })));
      setPropertyTypeOptions(propertyTypeResponse.data.map(item => ({ value: item.propertyField, label: item.propertyField })));
      setgarageOptions(garageResponse.data.map(item => ({ value: item.garage, label: item.garage })));
      setfrontLotOptions(frontLotResponse.data.map(item => ({ value: item.frontLot, label: item.frontLot })));
      setbedRoomsOptions(bedRoomsResponse.data.map(item => ({ value: item.numberOfBedrooms, label: item.numberOfBedrooms })));
      setbathRoomsOptions(bathRoomsResponse.data.map(item => ({ value: item.numberOfBathrooms, label: item.numberOfBathrooms })));
      setbasementTypeOptions(basementTypeResponse.data.map(item => ({ value: item.basementField, label: item.basementField })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const calculateValues = () => {
    const price = rangeValue * 10;
    const days = rangeValue / 10;
    const percentage = rangeValue / 100;
    return { price, days, percentage};
  }

  const handleRangeChange = (e) => {
    setRangeValue(parseInt(e.target.value));
  };

  const { price, days, percentage} = calculateValues();

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
                    <label className="form-label">Project Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Project Name"
                      name="projectName"
                      value={userProperty.projectName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Type <span className="text-danger">*</span></label>
                    <Select
                      options={propertyTypeOptions}
                      className="custom-react-select"
                      isSearchable={true}
                      value={propertyTypeOptions.find(
                        (option) => option.value === userProperty.propertyType
                      )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          propertyType: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Area <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property Area"
                      name="propertyArea"
                      value={userProperty.propertyArea}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Developer"
                      name="developer"
                      value={userProperty.developer}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Closing <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property Closing"
                      name="propClosing"
                      value={userProperty.propClosing}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Closing year <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Closing Year"
                      name="propClosingYear"
                      value={userProperty.propClosingYear}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">status <span className="text-danger">*</span></label>
                    <Select
                      options={statusOptions}
                      className="custom-react-select"
                      isSearchable={false}
                      value={statusOptions.find(option => option.value === userProperty.status)}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          status: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Comission <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Comission"
                      name="comission"
                      value={userProperty.comission}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Comission Payment <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Comission Payement"
                      name="commissionPayment"
                      value={userProperty.commissionPayment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer Email <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="developerEmail"
                      value={userProperty.developerEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Representative <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Sales Representative"
                      name="salesRepresentatives"
                      value={userProperty.salesRepresentatives}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Office Telephone <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      name="salesOfficeTelephone"
                      value={userProperty.salesOfficeTelephone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Model Name"
                      name="modelName"
                      value={userProperty.modelName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model cost <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Model Cost"
                      name="modelCost"
                      value={userProperty.modelCost}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model size <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Model Size"
                      name="modelSize"
                      value={userProperty.modelSize}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Story <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Story"
                      name="story"
                      value={userProperty.story}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                
                   <div className="mb-3 col-6">
                   <label className="form-label">Front Lot Size <span className="text-danger">*</span></label>
                    <Select
                      options={frontLotOptions}
                      className="custom-react-select"
                      placeholder = "Enter Front Lot"
                      isSearchable={false}
                      value={frontLotOptions.find(option => option.value === userProperty.frontLotSize)}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          frontLotSize: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Lot Depth <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Front Lot size"
                      name="lotDepth"
                      value={userProperty.lotDepth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                
                  <div className="mb-3 col-6">
                    <label className="form-label">Bedrooms <span className="text-danger">*</span></label>
                    <Select
                      options={bedRoomsOptions} 
                      className="custom-react-select"
                      placeholder = "Enter Bedrooms"
                      isSearchable={false}
                      value={bedRoomsOptions.find( (option) => option.value === userProperty.bedrooms )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          bedrooms: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>
  
                  <div className="mb-3 col-6">
                    <label className="form-label">Garage <span className="text-danger">*</span></label>
                    <Select
                      options={garageOptions} 
                      className="custom-react-select"
                      placeholder = "Enter Garage"
                      isSearchable={false}
                      value={garageOptions.find( (option) => option.value === userProperty.garage )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          garage: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>
                 
                  <div className="mb-3 col-6">
                    <label className="form-label">Bathrooms <span className="text-danger">*</span></label>
                    <Select
                      options={bathRoomsOptions}
                      className="custom-react-select"
                      placeholder = "Enter Bathrooms"
                      isSearchable={false}
                      value={bathRoomsOptions.find( (option) => option.value === userProperty.bathrooms )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          bathrooms: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Basement <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Basement"
                      name="basement"
                      value={userProperty.basement}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                 
                  <div className="mb-3 col-6">
                    <label className="form-label">Basement Type <span className="text-danger">*</span></label>
                    <Select
                      options={basementTypeOptions}
                      className="custom-react-select"
                      placeholder= "Enter Basement Type"
                      isSearchable={false}
                      value={basementTypeOptions.find((option) => option.value === userProperty.basementType )}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          basementType: selectedOption.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Inclusion <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Inclusion"
                      name="inclusion"
                      value={userProperty.inclusion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Add on <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Add on"
                      name="addOn"
                      value={userProperty.addOn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Intersection <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Intersection"
                      name="intersection"
                      value={userProperty.intersection}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Phase <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Project Phase"
                      name="projectPhase"
                      value={userProperty.projectPhase}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Total Deposit <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Eneter Total Deposit"
                      name="totalDeposit"
                      value={userProperty.totalDeposit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Deposit Submission <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Deposit Submission"
                      name="depositSubmission"
                      value={userProperty.depositSubmission}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Development Charges <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Development Charges"
                      name="developmentCharges"
                      value={userProperty.developmentCharges}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Maintainance freehold <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Maintainance Freehold"
                      name="maintainanceFreehold"
                      value={userProperty.maintainanceFreehold}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Maintainance amount <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Maintainance amount"
                      name="maintainanceAmount"
                      value={userProperty.maintainanceAmount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">
                      Developer Special Incentive
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Developer Incentive"
                      name="developerSpecialIncentive"
                      value={userProperty.developerSpecialIncentive}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">DHRE SPECIAL INCENTIVE <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter DHRE Incentive"
                      name="dhreSpecialIncentive"
                      value={userProperty.dhreSpecialIncentive}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Website Link <span className="text-danger">*</span></label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Enter Website Link"
                      name="websiteLink"
                      value={userProperty.websiteLink}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className=" d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary">
                      Add New Property
                    </button>
                  </div>

                  <hr className="my-4" />

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">
                      Deposit with Agreement/Offer
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price :{price}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days : {days}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage : {percentage}%
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range mt-3"
                      min="0"
                      max="10000"
                      step="100"
                      value={rangeValue}
                      onChange={handleRangeChange}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Deposit structure 2 <span className="text-danger">*</span></label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price: {price}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days: {days}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage: {percentage}%
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                      value={rangeValue}
                      onChange={handleRangeChange}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Deposit structure 1 <span className="text-danger">*</span></label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price: {price}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days: {days}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage: {percentage}%
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                      value={rangeValue}
                      onChange={handleRangeChange}
                    />
                  </div>

                  <div className="mb-3 col-6" style={{ overflowX: "auto" }}>
                    <label className="form-label">Deposit structure 3 <span className="text-danger">*</span></label>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-primary me-2">
                        Price: {price}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Days: {days}
                      </button>
                      <button className="btn btn-outline-primary me-2">
                        Percentage: {percentage}%
                      </button>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                      value={rangeValue}
                      onChange={handleRangeChange}
                    />
                  </div>

                  <div className="mb-3 col-sm-6">
                    <label className="form-label">Developer Address <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address of your property"
                      name="address"
                      value={userProperty.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className=" d-flex justify-content-center">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>

              <div className="mb-3 col-6 ">
                    <label className="form-label">Upload Excel Sheet <span className="text-danger">*</span></label>
                    <br />
                    <div className="d-flex align-items-center">
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        name="excel_sheet"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                      <button
                        className="bg-gray p-2 m-2 border-0 "
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
