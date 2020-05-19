import React from "react";
import "../App.css";
import DragAndDrop from "./DragAndDrop";
import RenderResults from "./RenderResults";
import {trackPromise} from "react-promise-tracker";
import {engineApi} from "../api/engineApi";
import LoadingIndicator from "./LoadingIndicator";
import {CSSTransition} from "react-transition-group";
import {fileActions} from "../actions/fileActions";

const initialState = {
  file: "",
  analysisReport: "",
  analysisReportString: "",
  validation: "",
  fileProcessed: false,
  loading: false
};

class ProcessFile extends React.Component {
  state = initialState;

  resetState() {
    this.setState(initialState);
  }

  handleDrop = file => {
    this.resetState();

    if(!fileActions.validFileSize(file[0])){
      this.setState({validation: "Please use a file under 20MB"});
      return;
    }

    trackPromise(
      fileActions.validFileType(file[0]).then(result => {
        if (!result){
          this.setState({validation: "Please use a supported file type"});
          return;
        }

        return engineApi.analyseFile(file[0])
      })
      .then(result => {
          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(result);

          this.setState({
            analysisReport: xml,
            analysisReportString: result,
            file: file[0],
            fileProcessed: true
          });
      })
      .catch(error => {
        console.log(error);
      })
    );
  };

  render() {
    return (
        <div className="app-body">
            <h1>Drag and drop a file to have it processed by the Glasswall d-FIRST&trade; Engine</h1>
            <DragAndDrop handleDrop={this.handleDrop}>
                <div className="loading-container">
                    <LoadingIndicator key={6} />
                </div>
            </DragAndDrop>
            <CSSTransition in={this.state.fileProcessed} timeout={{enter: 500, exit: 500}} classNames="results">
                <RenderResults key={5} file={this.state.file} analysisReport={this.state.analysisReport} analysisReportString={this.state.analysisReportString} validation={this.state.validation}/>
            </CSSTransition>
            {/* <div class="terms-link" onClick={this.props.toggleModal}>
              <button>Terms &amp; Conditions</button>
            </div> */}
        </div>
    );
  }
}

export default ProcessFile;