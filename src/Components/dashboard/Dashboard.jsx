import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import neutral from "./images/neutral.jpg";
import winter from "./images/winter.jpg";
import cloudy from "./images/cloudy.jpg";
import sunny from "./images/sunny.jpg";
import sunnyicon from "./images/sunnyicon.png";
import minTemp from "./images/minimumtemperature.png";
import maxTemp from "./images/maximumtemperature.png";
import humidity from "./images/humidity.png";
import pressure from "./images/pressure.png";
import information from "./images/information.png";
import sunrise from "./images/sunrise.png";
import sunset from "./images/sunset.png";
import { time } from "../readNow/favCity.js";
import north from "./images/north.png";
import south from "./images/south.png";
import east from "./images/east.png";
import west from "./images/west.png";
import northeast from "./images/northeast.png";
import northwest from "./images/northwest.png";
import southeast from "./images/southeast.png";
import southwest from "./images/southwest.png";

export default function Dashboard() {
  let history = useHistory();
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [bgstate, setBgstate] = useState("yellow");
  const [bgimgstate, setBgimgstate] = useState(neutral);
  const [textstate, setTextstate] = useState("black");
  const [iconsate, setIconstate] = useState(sunnyicon);
  const [suggestionstate, setSuggestionstate] = useState(
    "no suggestions avialbale"
  );
  const [spinnerstate,setSpinnerstate]=useState(1);

  function debounce(func, delay) {     //use of debouncing
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const fetchCall = useCallback(         //for memoizing function calls
     debounce((search) => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d4d33bb9156784fc45e030a132117fc5`;
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          if (data) {
            if (data.main.temp > 20) {
              setBgstate("red");
              setBgimgstate(sunny);
              setTextstate("white");
              if (data.main.temp <= 25) {
                setSuggestionstate(
                  "Hey! Awesome weather, Have a beach day fun!"
                );
              } else {
                setSuggestionstate(
                  "Little hot, got out with goggles and suncream please!"
                );
              }
            } else if (data.main.temp > 10 && data.main.temp <= 20) {
              setBgstate("green");
              setBgimgstate(cloudy);
              setTextstate("white");
              setSuggestionstate("You might need an umbrella today!!!!");
            } else {
              setBgstate("blue");
              setBgimgstate(winter);
              setTextstate("white");
              if (data.main.temp <= 0) {
                setSuggestionstate(
                  "Its frosty there!!! you may go out with pure precautions"
                );
              } else if (data.main.temp > 0 && data.main.temp <= 5) {
                setSuggestionstate(
                  "Hey Buddy its too cold out there, Enjoy with a cup of tea inside home"
                );
              } else {
                setSuggestionstate(
                  "Hey Buddy its a sweet winter. Enjoy with little care"
                );
              }
            }
          } else {
            setBgstate("yellow");
            setBgimgstate(neutral);
            setTextstate("black");
            setSuggestionstate("no suggestions avialable");
          }
        });
        setSpinnerstate(3);
    }, 800),
    []
  );

  useEffect(() => {                 //for calling usecallback as soon as state changes
    setSpinnerstate(2);
    fetchCall(search);
  }, [search]);

  function addToFavButton() {
    const newFavCity = {
      cityName: search,
      emailid: localStorage.getItem("loggedUser"),
    };
    fetch("http://localhost:3002/favCities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFavCity),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("Response", data);
        history.push("/fav");
      });
  }

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${bgimgstate})`,
        backgroundSize: "100% 100%",
        marginTop: "1px",
      }}
    >
      <div
        className="card  shadow-lg mt-2 border-2 border-white "
        id="containerCard"
        style={{
          width: "30rem",
          borderRadius: "20px",
          maxHeight: "70vh",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, .35)",
        }}
      >
        <div
          style={{
            width: "45%",
            margin: "auto",
            paddingTop: "10px",
            textAlign: "center",
            display: "inline-flex",
          }}
          className="form-outline"
        >
          <div>
            <input
              type="search"
              style={{ width: "100%", marginTop: "5px" }}
              id="form1"
              className="form-control"
              placeholder="Search City"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {
              (spinnerstate===2)?
            (<div class="spinner-border" role="status" style={{marginTop:'10px'}}>
              <span class="sr-only">Loading...</span>
            </div>):<></>
          
            }
            </div>
          <div>
            <a href="#exampleModal" role="button" data-toggle="modal">
              <img
                src={information}
                type="button"
                style={{
                  width: "40px",
                  height: "40px",
                  marginTop: "4px",
                  marginLeft: "5px",
                }}
              />
            </a>
          </div>
        </div>
        <div className="card-body">
          {!weather ? (
            <>
              {search == "" ? (
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Enter the city name !!!
                </h2>
              ) : (
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Enter the valid city name !!!
                </h2>
              )}
            </>
          ) : (
            <div
              style={{ textAlign: "center", paddingTop: "5px", color: "black" }}
            >
              <h2 style={{ fontWeight: "bold" }}>
                {search.toUpperCase()},{weather.sys.country}
              </h2>

              <h3 style={{ fontWeight: "bold" }}>
                Temperature: {weather.main.temp}&#176;C
              </h3>

              <h5 style={{ fontWeight: "bold" }}>
                <img src={minTemp} style={{ width: "20px", height: "30px" }} />
                Minimum Temp: {weather.main.temp_min}&#176;C
                <br />
                <img src={maxTemp} style={{ width: "25px", height: "35px" }} />
                Maximum Temp: {weather.main.temp_max}&#176;C
              </h5>

              <h5 style={{ fontWeight: "bold" }}>
                <img src={humidity} style={{ width: "25px", height: "25px" }} />
                Humidity: {weather.main.humidity}%&nbsp;|
                <img src={pressure} style={{ width: "30px", height: "30px" }} />
                Pressure: {weather.main.pressure} hPa
              </h5>

              <h5 style={{ fontWeight: "bold" }}>
                <img src={sunrise} style={{ width: "38px", height: "30px" }} />
                Sunrise: {time(weather.sys.sunrise)} |
                <img src={sunset} style={{ width: "36px", height: "30px" }} />
                Sunset: {time(weather.sys.sunset)}
              </h5>

              <h5 style={{ fontWeight: "bold" }}>
                Wind Speed: {weather.wind.speed}m/s,
                {weather.wind.deg == 0 || weather.wind.deg == 360 ? (
                  <img src={north} style={{ width: "30px", height: "30px" }} />
                ) : weather.wind.deg > 0 && weather.wind.deg < 90 ? (
                  <img
                    src={northeast}
                    style={{ width: "30px", height: "30px" }}
                  />
                ) : weather.wind.deg == 90 ? (
                  <img src={east} style={{ width: "30px", height: "30px" }} />
                ) : weather.wind.deg > 90 && weather.wind.deg < 180 ? (
                  <img
                    src={southeast}
                    style={{ width: "30px", height: "30px" }}
                  />
                ) : weather.wind.deg == 180 ? (
                  <img src={south} style={{ width: "30px", height: "30px" }} />
                ) : weather.wind.deg > 180 && weather.wind.deg < 270 ? (
                  <img
                    src={southwest}
                    style={{ width: "30px", height: "30px" }}
                  />
                ) : weather.wind.deg == 270 ? (
                  <img src={west} style={{ width: "30px", height: "30px" }} />
                ) : weather.wind.deg > 270 && weather.wind.deg < 360 ? (
                  <img
                    src={northwest}
                    style={{ width: "30px", height: "30px" }}
                  />
                ) : (
                  <div></div>
                )}
              </h5>

              {localStorage.getItem("loggedUser") ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addToFavButton();
                  }}
                >
                  Add to Favourite
                </button>
              ) : (
                <p></p>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog bg-warning" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                A weatherly tip :)
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{suggestionstate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
