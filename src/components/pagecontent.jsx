import React, { Component } from 'react';
import Footer from './common/footer';
import Navbar from './common/navbar';
import Item from './item/item';
import Dashboard from './common/dashboard';
import Party from './party/party';

class PageContent extends Component {
  
  checkPath = () =>{
    const {pathname} = this.props;
    if(pathname === "/dashboard"){
        return <><h1 className="h3 mb-4 text-gray-800">Dashboard</h1><Dashboard /></>;
      }else if(pathname === "/item"){
        return <><h1 className="h3 mb-4 text-gray-800">Item Management</h1><Item /></>;

      }else{
        return <><h1 className="h3 mb-4 text-gray-800">Party Management</h1><Party /></>;
    }
  }
  render() {
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <Navbar />
        <div id="content">
          <div className="container-fluid">
            {this.checkPath()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PageContent;