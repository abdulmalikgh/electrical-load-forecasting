import React, {Component} from "react";
import Clock from "./Clock";

class ShortTerm extends Component {
  render() {
    const localDate = this.props.date;
    const date = localDate.toDateString();

    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="card">
              <h1>The data is shiping now </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortTerm;
