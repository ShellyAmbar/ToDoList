import React, { PureComponent } from "react";

class Card extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div  className="card" style={{margin:"5px"}}>
        <div  className="card-body">
          <h5  className="card-title">
            {this.props.title != null ? this.props.title : ""}
          </h5>

          <p  className="card-text">
            {this.props.body != null ? this.props.body : ""}
          </p>
          <button
            
            onClick={this.props.editToDoInList}
            className="btn btn-success"
            style={{margin:"2px"}}
          >
            {this.props.link1 != null ? this.props.link1 : ""}
          </button>
          <button
            
            onClick={this.props.deleteToDoFromList}
            className="btn btn-danger"
            style={{margin:"2px"}}
          >
            {this.props.link2 != null ? this.props.link2 : ""}
          </button>
        </div>
      </div>
    );
  }
}

export default Card;
