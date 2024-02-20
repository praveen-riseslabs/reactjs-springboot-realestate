import React, { useState, useEffect  } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
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

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Assuming your Excel sheet has headers and you want to convert each row into an object
        const objectsArray = jsonData.slice(1).map((row) => {
          const obj = {};
          jsonData[0].forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });
        console.log(objectsArray);

      

        axios.post('http://localhost:8086/api/public/project-details/upload-customers-data', objectsArray)
        .then(response => {
          console.log('Excel sheet Data sent to backend successfully');
        })
        .catch(error => {
          console.error('Error sending data to backend:', error);
        })
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error reading file:", error);
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
                      name="projectName"
                      value={userProperty.projectName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Type</label>
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
                    <label className="form-label">Property Area</label>
                    <input
                      type="text"
                      className="form-control"
                      name="propertyArea"
                      value={userProperty.propertyArea}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer</label>
                    <input
                      type="text"
                      className="form-control"
                      name="developer"
                      value={userProperty.developer}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Property Closing</label>
                    <input
                      type="text"
                      className="form-control"
                      name="propClosing"
                      value={userProperty.propClosing}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Closing year</label>
                    <input
                      type="number"
                      className="form-control"
                      name="propClosingYear"
                      value={userProperty.propClosingYear}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">status</label>
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
                    <label className="form-label">Comission</label>
                    <input
                      type="number"
                      className="form-control"
                      name="comission"
                      value={userProperty.comission}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Comission Payment</label>
                    <input
                      type="text"
                      className="form-control"
                      name="commissionPayment"
                      value={userProperty.commissionPayment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Developer Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="developerEmail"
                      value={userProperty.developerEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Representative</label>
                    <input
                      type="text"
                      className="form-control"
                      name="salesRepresentatives"
                      value={userProperty.salesRepresentatives}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Sales Office Telephone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="salesOfficeTelephone"
                      value={userProperty.salesOfficeTelephone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="modelName"
                      value={userProperty.modelName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model cost</label>
                    <input
                      type="number"
                      className="form-control"
                      name="modelCost"
                      value={userProperty.modelCost}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Model size</label>
                    <input
                      type="number"
                      className="form-control"
                      name="modelSize"
                      value={userProperty.modelSize}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Story</label>
                    <input
                      type="number"
                      className="form-control"
                      name="story"
                      value={userProperty.story}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                
                   <div className="mb-3 col-6">
                   <label className="form-label">Front Lot Size</label>
                    <Select
                      options={frontLotOptions}
                      className="custom-react-select"
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
                    <label className="form-label">Lot Depth</label>
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
                    <label className="form-label">Bedrooms</label>
                    <Select
                      options={bedRoomsOptions} 
                      className="custom-react-select"
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
                    <label className="form-label">Garage</label>
                    <Select
                      options={garageOptions} 
                      className="custom-react-select"
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
                    <label className="form-label">Bathrooms</label>
                    <Select
                      options={bathRoomsOptions}
                      className="custom-react-select"
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
                    <label className="form-label">Basement</label>
                    <input
                      type="text"
                      className="form-control"
                      name="basement"
                      value={userProperty.basement}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                 
                  <div className="mb-3 col-6">
                    <label className="form-label">Basement Type</label>
                    <Select
                      options={basementTypeOptions}
                      className="custom-react-select"
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
                    <label className="form-label">Inclusion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="inclusion"
                      value={userProperty.inclusion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Add on</label>
                    <input
                      type="text"
                      className="form-control"
                      name="addOn"
                      value={userProperty.addOn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Intersection</label>
                    <input
                      type="text"
                      className="form-control"
                      name="intersection"
                      value={userProperty.intersection}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Project Phase</label>
                    <input
                      type="number"
                      className="form-control"
                      name="projectPhase"
                      value={userProperty.projectPhase}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Total Deposit</label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalDeposit"
                      value={userProperty.totalDeposit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Deposit Submission</label>
                    <input
                      type="text"
                      className="form-control"
                      name="depositSubmission"
                      value={userProperty.depositSubmission}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Development Charges</label>
                    <input
                      type="number"
                      className="form-control"
                      name="developmentCharges"
                      value={userProperty.developmentCharges}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Maintainance freehold</label>
                    <input
                      type="number"
                      className="form-control"
                      name="maintainanceFreehold"
                      value={userProperty.maintainanceFreehold}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Maintainance amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="maintainanceAmount"
                      value={userProperty.maintainanceAmount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">
                      Developer Special Incentive
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="developerSpecialIncentive"
                      value={userProperty.developerSpecialIncentive}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">DHRE SPECIAL INCENTIVE</label>
                    <input
                      type="number"
                      className="form-control"
                      name="dhreSpecialIncentive"
                      value={userProperty.dhreSpecialIncentive}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Website Link</label>
                    <input
                      type="url"
                      className="form-control"
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

               

                  {/* <div className=" d-flex justify-content-center">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form> */}
              <div className="mb-3 col-6 ">
                    <label className="form-label">Upload Excel Sheet</label>
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
