import React from "react";


function Home() {  

  return (
    <div>
    <div className="row">
      <div className="col-sm-12 col-md-3">
          <div className="card property-card  bg-dark border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body me-3">
                  <p className="property-p mb-0 text-black font-w500 text-white">Total Agent</p>
                  <h2 className="fs-28 text-black font-w600">2024</h2>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <small className="text-primary">71%</small>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="col-sm-12 col-md-3">
          <div className="card property-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body me-3">
                  <p className="property-p mb-0 text-black font-w500">Total Properties</p>
                  <h2 className="fs-28 text-black font-w600">400</h2>
                </div>
                <div className=" ">
                  <i className="flaticon-home" />
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="col-sm-12 col-md-3">
          <div className="card property-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body me-3">
                  <h2 className="fs-28 text-black font-w600">2,356</h2>
                  <p className="property-p mb-0 text-black font-w500">Properties for Sale</p>
                  <span className="fs-13">Target 3k/month</span>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <small className="text-primary">71%</small>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="col-sm-12 col-md-3">
          <div className="card property-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body me-3">
                  <h2 className="fs-28 text-black font-w600">2,356</h2>
                  <p className="property-p mb-0 text-black font-w500">Properties for Sale</p>
                  <span className="fs-13">Target 3k/month</span>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <small className="text-primary">71%</small>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>


  
        <div className="card property-card ">
          <div className="card-body">
            <h6 className="text-left mb-4">Properties</h6>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Front Lot</th>
                  <th>Bedrooms</th>
                  <th>Bath</th>
                  <th>Sq ft</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Example Property 1</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Example Property 1</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Example Property 1</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Example Property 1</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Example Property 1</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Example Property 1</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                  <td>$100,000</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
     
    </div>
 

   
  );
}

export default Home;
