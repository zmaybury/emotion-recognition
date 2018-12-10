import React from 'react';
import logo from './e-r-icon.jpg';
import placeholderImage from './placeholder.png';
import {uploadImage, detectFaces, detectFacesAndEmotion} from './services/api';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: {
        name: null,
        image: null
      },
      resultFile: {
        name: null,
        image: null
      },
      emotions: [],
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Emotion Recognition</h2>
        </div>
        <section>
          <div className="centered-container header-row">
            <span className="margin-right"> pick a .png or .jpg file: </span>
            <input type="file" onChange={(e) => {
              uploadImage(e.target.files[0]).then((file) => {
                this.setState({
                  selectedFile: {
                    image: file.image,
                    name: file.name
                  }
                });
              });
            }} />
            <button disabled={!this.state.selectedFile.image} onClick={() => {
              detectFaces(this.state.selectedFile.image)
              .then((body) => {
                this.setState({
                  resultFile: {
                    image: body.resultImage
                  }
                })
              });
            }}>
              Detect Faces
            </button>
            <button disabled={!this.state.selectedFile.image} onClick={() => {
              detectFacesAndEmotion(this.state.selectedFile.image)
              .then((body) => {
                this.setState({
                  emotions: body,
                })
              });
            }}>
              Detect Emotion
            </button>
          </div>
        </section>
        <section>
          <div className="centered-container">
            <img className="padded-image" id="input" alt="input" src={this.state.selectedFile.image || placeholderImage} width="500" height="500" />
            <img className="padded-image" id="output" alt="output" src={this.state.resultFile.image || placeholderImage} width="500" height="500" />
          </div>
        </section>
        <section>
          <div className="centered-container">
            {this.state.emotions.map((val, idx) => {
              return (
                <div key={`${idx}`}>
                  <div> Emotion: {val.emotion.label}</div>
                  <div> Confidence: {val.emotion.maxVal.toFixed(3)}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
