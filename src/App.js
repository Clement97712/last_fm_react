import React, { Component } from "react";
import "./css/App.css";
import axios from "axios";
import img from "./images/jesse_darland.jpg";
import fond from "./images/federico_beccari.jpg";

class App extends Component {
  state = {
    data: [],
    dataTopAlbums: [],
    dataAlbumInfo: []
  };

  update = event => {
    alert(event.target.value);
    this.setState({
      dataTopAlbums: [],
      data: []
    });

    this.getDateArtist(event.target.value);
  };

  getDateArtist = value => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
          value +
          "&api_key=35b4f62d17131918666956d6859b384e&format=json"
      )
      .then(response => {
        console.log(response.data.topalbums.album[0].name);
        for (var i = 0; i <= 4; i++) {
          this.setState({
            dataTopAlbums: [
              ...this.state.dataTopAlbums,
              response.data.topalbums.album[i]
            ]
          });
        }
      })
      .catch(error => {
        console.log("Error");
      });

    //Artiste

    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
          value +
          "&api_key=35b4f62d17131918666956d6859b384e&format=json"
      )
      .then(response => {
        this.setState({
          data: [...this.state.data, response.data.artist]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getInfoAlbum = value => {
    alert("Mot: " + value);
  };

  componentDidMount() {
    let element = "Migos";
    this.getDateArtist(element);
  }

  render() {
    return (
      <div className="">
        <div className="box">
          <img src={img} className="picture" alt="Images" />
          <span className="slogan">
            <h1 className="sentence">The world love music</h1>
          </span>
          <span className="palabras">
            <p className="sentence">photo de jesse on unsplash</p>
          </span>
        </div>

        <div className="sectionBack">
          <div className="choix form-group">
            <label className="subtitle">You can choose an artist:</label>
            <select className="form-control" onChange={this.update.bind(this)}>
              <optgroup label="-- Female(s) --">
                <option>Aya nakamura</option>
                <option>Cassie</option>
                <option>Mc pocahontas</option>
                <option>Rihanna</option>
                <option>Shakira</option>
                <option>Tinashe</option>
              </optgroup>

              <optgroup label="-- Male(s) --">
                <option>Daly</option>
                <option>Drake</option>
                <option>J Balvin</option>
                <option>Kendrick lamar</option>
                <option selected>Migos</option>
                <option>Vybz kartel</option>
              </optgroup>
            </select>
          </div>

          <div className="title">
            <p className="subtitle">Artiste:</p>
          </div>
          <div className="contenu">
            {this.state.data.map((el, i) => {
              return (
                <div key={i} className="test">
                  <img src={el.image[4]["#text"]} alt={i} />
                  <p>{el.name}</p>
                </div>
              );
            })}
          </div>
          <div className="title">
            <p className="subtitle">5 Tops Albums de l'artiste: </p>
          </div>
          <div className="contenu boite">
            {this.state.dataTopAlbums.map((el, i) => {
              const nom = el.name;
              return (
                <div key={i} className="albums">
                  <img
                    src={el.image[2]["#text"]}
                    alt={i}
                    className="pictureArtist"
                  />
                  <a
                    type="button"
                    onClick={() => {
                      this.getInfoAlbum(nom);
                    }}
                  >
                    {el.name}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="title">
            <p className="subtitle">Artistes similaires:</p>
          </div>
          <div className="contenu boite">
            {this.state.data.map((element, index) => {
              const name = element.name;
              return (
                <div key={index} className="boites">
                  {element.similar.artist.map((el, i) => {
                    return (
                      <div key={i} className="">
                        <img
                          src={el.image[2]["#text"]}
                          alt={i}
                          className="pictureArtist"
                        />
                        <p>{el.name}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer">
          <p>Create by Alex MJ</p>
        </div>
      </div>
    );
  }
}

export default App;
