import React, { useState, useEffect } from 'react';
// import Card from '../card/Card';
import './favCity.css'
import { time } from './favCity.js'
import neutral from "../dashboard/images/neutral.png";

export default function FavCity() {

  const [allData, setAllData] = useState([]);
  const [favCities, setfavCities] = useState([])

  useEffect(() => {
    fetch('http://localhost:3002/favCities')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setfavCities(data)
        for (var i = 0; i < data.length; i++) {
          if (localStorage.getItem("loggedUser") === data[i].emailid) {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${data[i].cityName}&units=metric&appid=d4d33bb9156784fc45e030a132117fc5`;
            fetch(url)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
              })
              .then((data2) => {
                setAllData(allData => [...allData, data2]);
              });
          }
        }
      });
  }, []);
  const remove = (citytoBeDeleted) => {
    let idToBeDeleted
    console.log(citytoBeDeleted);
    //console.log(favCities);
    for (let i = 0; i < favCities.length; i++) {
      var favC=favCities[i].cityName.toUpperCase();
      if (favC === citytoBeDeleted.toUpperCase()) {
        idToBeDeleted = favCities[i].id;
      }
    }
    fetch(`http://localhost:3002/favCities/${idToBeDeleted}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      }).then((data) => {
        console.log(data)
        let cityList = allData.filter((city) => {
          return city.name !== citytoBeDeleted
        })
        setAllData(cityList)
      })

  }
  return (
    <>
    {
      allData.length==0?(
        <div className="row" style={{ backgroundColor: 'black', margin: '0px', padding: '10px',minHeight:'77.7vh',textAlign:'center' }}>
        <span>
        <img src={neutral} style={{width:'55%'}}></img>
        </span></div>
      )
      :
    (<div className="row" style={{ backgroundColor: 'black', margin: '0px', padding: '10px',minHeight:'77.7vh' }}>
      {
        allData.map((item) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-4" style={{ padding: '10px', opacity: '80%' }}>
            <div className="card" style={{ height: '82vh', borderRadius: '20px',backgroundColor:"rgba(143,152,177,1)" }}>
              <div style={{textAlign:'right',width:'97%',marginTop:'7px',marginRight:'10px',float:'right',position:'absolute'}}>
                <button class="icon-btn add-btn">  
                  <div class="btn-txt" onClick={() => remove(item.name)}
                  >Remove</div>
                </button>
              </div>
              <div className="card-body" style={{color:'white'}}>

                <h3 className="card-title" style={{ textAlign: 'center'}}><b>{item.name}</b></h3>
                <p className="card-text" style={{ textAlign: 'center' }} > Description : {item.weather[0].description}</p>
                <div className="row">
                  <div className="col">
                    <p className="card-text"  >Temp : {item.main.temp} &#8451;</p>
                  </div>
                  <div className="col">
                    <p className="card-text"  >Feels like : {item.main.feels_like} &#8451;</p>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col">
                    <p className="card-text"  >Max Temp : {item.main.temp_max} &#8451;</p>
                  </div>
                  <div className="col">
                    <p className="card-text"  >Max Temp : {item.main.temp_max} &#8451;</p>
                  </div>

                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <p className="card-text"  >Sunrise : {time(item.sys.sunrise)}</p>
                  </div>
                  <div className="col">
                    <p className="card-text"  >Sunset : {time(item.sys.sunset)}</p>
                  </div>

                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <p className="card-text"  >Humidity : {item.main.humidity} %</p>
                  </div>
                  <div className="col">
                    <p className="card-text"  >Pressure : {item.main.pressure} hPa</p>
                  </div>
                </div>
                <br/>

                <div className="row">
                  <div className="col">
                    <p className="card-text"  >Visibility : {item.visibility} m</p>
                  </div>
                  <div className="col">
                    <p className="card-text"  >Wind : {item.wind.speed}m/s</p>
                  </div>
                </div>
                </div>  
              </div>
          </div>
        ))}
    </div>)
}
</>
  );
}