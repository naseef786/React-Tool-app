import React from 'react';

function adminProfileUpdate() {
  return (
    <main className="main">
      <div className="page-header text-center" style={{backgroundImage: "url('assets/images/page-header-bg.jpg')"}}>
        <div className="container">
          <h1 className="page-title">Admin Dashboard</h1>
          <span>manage</span>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
            <li className="breadcrumb-item"><a href="/">Shop</a></li>
            <li className="breadcrumb-item active" aria-current="page">My Account</li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="tab-updateProfile-link" data-toggle="tab" href="#tab-updateProfile" role="tab" aria-controls="tab-updateProfile" aria-selected="true">Update Profile</a>
                  </li>
                  {/* Add more list items */}
                  {/* ... */}
                </ul>
              </aside>
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-updateProfile" role="tabpanel" aria-labelledby="tab-updateProfile-link">
                    <form action="/admin/updateprofile" method="get">
                      <label>Email address *</label>
                      <input type="email" name="email" className="form-control" required />

                      <label>Current password (leave blank to leave unchanged)</label>
                      <input type="password" name="password" className="form-control" />

                      <button type="submit" className="btn btn-outline-primary-2">
                        <span>SAVE CHANGES</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>
                    </form>
                  </div>
                  
                  {/* Add more tab panes */}
                  {/* ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default adminProfileUpdate;
