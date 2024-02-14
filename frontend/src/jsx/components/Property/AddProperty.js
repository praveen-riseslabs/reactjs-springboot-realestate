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
    developerAddress: "",
    developmentFee: "",
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
    propertyPrice: "",
    customerSpecialIncentive: "",
    brokerageSpecialIncentive: "",
    beds: "",
    baths: "",
    area: "",
    premiere: "",
    address: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserProperty({ ...userProperty, [name]: value });
    // console.log(name, value);
  };

  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(userProperty);
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
                      placeholder="Enter Project Name"
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
                      placeholder="Enter Project Name"
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
                    <label className="form-label">Developer Address</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developerAddress"
                      value={userProperty.developerAddress}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Development Fee</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      name="developmentFee"
                      value={userProperty.developmentFee}
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
                    <label className="form-label">Property Price</label>
                    <output className="form-output d-block text-end">
                      ${userProperty.propertyPrice}
                    </output>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="10000"
                      step="100"
                      value={userProperty.propertyPrice}
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
                      name="customerSpecialIncentive"
                      value={userProperty.customerSpecialIncentive}
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
                      name="brokerageSpecialIncentive"
                      value={userProperty.brokerageSpecialIncentive}
                      onChange={handleInputChange}
                    />
                  </div>

                  <hr className="my-4" />

                  <div className="mb-3 col-6">
                    <label className="form-label">Beds</label>
                    <Select
                      options={beds} // Assuming 'beds' is the correct array of options
                      defaultValue={beds.find(
                        (option) => option.value === userProperty.bedrooms
                      )}
                      className="custom-react-select"
                      isSearchable={false}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          bedrooms: selectedOption.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label className="form-label">Baths</label>
                    <Select
                      options={bathrooms}
                      defaultValue={bathrooms.find(
                        (option) => option.value === userProperty.bathrooms
                      )}
                      className="custom-react-select"
                      isSearchable={false}
                      onChange={(selectedOption) =>
                        setUserProperty({
                          ...userProperty,
                          bathrooms: selectedOption.value,
                        })
                      }
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

                  <div className="mb-3 col-6">
                    <label className="form-label">Premiere</label>
                    <Select
                      options={options2}
                      defaultValue={options2[0]}
                      className="custom-react-select"
                      isSearchable={false}
                    />
                  </div>

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
                      name="zipCode"
                      value={userProperty.zipCode}
                      onChange={handleInputChange}
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
