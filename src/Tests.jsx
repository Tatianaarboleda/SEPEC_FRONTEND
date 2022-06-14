/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import matriz from "./images/Matrix.jpeg";

const Tests = () => {
  let navigate = useNavigate();
  const [ordersa, setOrdersa] = useState([]);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);
  const [startTest, setStartTest] = useState();
  const [anserwesSent, setAnserwesSent] = useState(false);
  const [blockRoute, setBlockRoute] = useState([{ }]);

  const [showTrace, setShowTrace] = useState();
  let modifier = 38;
  const block = document.getElementById("block");
  const [displayArray, setDisplayArray] = useState([]);
  const [displayEl, setDisplayEl] = useState();
  const [alert, setAlert] = useState({ show: false, Title: "", message: "" });
  const [currentTest, setCurrentTest] = useState(1);
  
  // dominio/pregunta/1
  let test = {
    goalPosition: { top: "360px", left: "474px" },
    startPostion: { top: 192, left: 194 },
  };

  const { goalPosition, startPostion, obstacles } = test;

  const handleBlockedByBug = (nextTop, nextLeft) => {
    let availableToMove = true;
    // console.log(nextTop, nextLeft);
    obstacles.map((obstacle) => {
      if (`${obstacle.top}px` === nextTop) {
        console.log(nextTop, nextLeft);
        console.log(`${obstacle.top}px`);
        console.log(nextTop);

        // document.getElementById("block").style.top = `${
        //   parseInt(nextTop) - modifier
        // }px`;

        // availableToMove = false;
      }
      // else if (`${obstacle.left}px` === nextLeft) {
      //   document.getElementById("block").style.left = `${
      //     parseInt(nextLeft) + modifier
      //   }px`;
      // } else {
      //   return;
      // }
    });
    // return availableToMove;
  };

  const handleDirectionClick = (e) => {
    let instructionsList = document.querySelector(".ordersView");
    if (startTest && !anserwesSent) {
      instructionsList.innerHTML += e.target.name + "\n";
      setOrdersa((oldArray) => [...ordersa, e.target.name]);
      const { style } = block;

      switch (e.target.name) {
        case "arriba":
          if (`${parseInt(style.top) + modifier}` >= 207) {
            style.top = `${parseInt(style.top) - modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        case "abajo":
          if (`${parseInt(style.top) + modifier}` <= 433) {
            style.top = `${parseInt(style.top) + modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        case "izquierda":
          if (`${parseInt(style.left) + modifier}` >= 350) {
            style.left = `${parseInt(style.left) - modifier}px`;
          } else {
            alert("estas en el borde");
          }

          break;
        case "derecha":
          if (`${parseInt(style.left) + modifier}` <= 581) {
            style.left = `${parseInt(style.left) + modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        default:
          break;
      }
      setPositionTop(style.top);
      setPositionLeft(style.left);
      // handleBlockedByBug(style.top, style.left);
      setBlockRoute(blockRoute.concat({ top: style.top, left: style.left }));
      console.log(style.top, style.left, "top left");
    } else {
      return;
    }
  };

  const handleStartTest = (e) => {
    let canvasObject = document.createElement("CANVAS");
    let canvasBg = document.querySelector(".imgBg");
    let containerTestView = document.querySelector(".testView");
    let ctx = canvasObject.getContext("2d");
    setStartTest(true);

    ctx.canvas.width = 330;
    ctx.canvas.height = 300;
    ctx.drawImage(canvasBg, 0, 0);
    containerTestView.appendChild(canvasObject);
    document.getElementById("start").style.display = "flex";
    document.getElementById("goal").style.display = "flex";
    handleDirectionClick(e);
  };

  const handleNextTest = () => {
    setStartTest(false);
    setAnserwesSent(false);
    // handleStartTest();
    navigate("/test/2");
  };

  const revealBlock = () => {
    setShowTrace(true);
    let block = document.getElementById("block");
    block.style.zIndex = 10;
    block.style.display = "flex";
  };

  const validateSequence = () => {
    setCurrentTest(currentTest <= 5 ? currentTest + 1 : null);
    setAnserwesSent(true);
    // let data = {
    // };
    const { top, left } = goalPosition;
    // handleNextTest();
    console.log(test.goalPosition);
    console.log("top left respuesta usuario:>> ", positionTop, positionLeft);
    if (top === positionTop && left === positionLeft) {
      setAlert({
        show: true,
        title: "Excelente",
        message: "Has conseguido llegar al dragón",
      });
      revealBlock();
    } else {
      revealBlock();

      setAlert({
        show: true,
        title: "Oh, rayos",
        message: "Por poco lo consigues, presiona aceptar para pasar a la siguiente.",
      });
      return;
    }
  };

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });

  useEffect(() => {
    (async function () {
      for (let el of blockRoute) {
        await delay(1000);
        setDisplayEl(el);
      }
      setDisplayEl(undefined);
    })();
  }, [blockRoute]);

  useEffect(() => {
    displayEl && setDisplayArray((prev) => [...prev, displayEl]);
  }, [displayEl]);

  return (
    <div className="App">
      {alert.show && <Modal config={alert} setAlert={setAlert} />}
      <div className="fatherTitle">
        <div className="headerTitle">
          <h1 className="">SEPEC PRUEBA</h1>
        </div>
        <div></div>
      </div>
      <img src="" alt="" />
      <img
        className="imgBg"
        src={matriz}
        style={{ display: "none", height: "80px" , width: "80px" }}
        alt="grid img"
      />
      <img
        id="start"
        style={{
          display: "none",
          width: "30px",
          height: "34px",
          position: "absolute",
          top: startPostion?.top,
          left: startPostion?.left,
        }}
        src="https://lasimagenesdegoku.com/wp-content/uploads/2018/02/Small-Goku.png"
        alt="start"
      />
      <img
        id="block"
        style={{
          display: "none",
          width: "30px",
          height: "34px",
          position: "absolute",
          top: startPostion?.top,
          left: startPostion?.left,
        }}
        src="https://i.pinimg.com/originals/a5/f9/a2/a5f9a2eb5c0bfb1f66988696e1f31334.png"
        alt="start"
      />
      {showTrace &&
        displayArray.map((coodinates, index) => (
          <img
            key={index}
            id="block"
            style={{
              display: showTrace ? "flex" : "none",
              width: "30px",
              height: "34px",
              position: "absolute",
              top: coodinates.top,
              left: coodinates.left,
            }}
            src="https://i.pinimg.com/originals/a5/f9/a2/a5f9a2eb5c0bfb1f66988696e1f31334.png"
            alt="start"
          />
        ))}
      <img
        id="goal"
        style={{
          display: "none",
          width: "30px",
          height: "34px",
          position: "absolute",
          top: goalPosition.top,
          left: goalPosition.left,
        }}
        src="https://img.icons8.com/emoji/48/undefined/dragon-face.png"
        alt="goal"
      />
      {/* {obstacles.map((obstacle, index) => (
        <div
          key={index}
          id="obstacle"
          style={{
            display: "flex",

            width: "23px",
            height: "23px",
            position: "absolute",
            top: obstacle.top,
            left: obstacle.left,
          }}
        >
          <img
            src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/undefined/external-bug-coding-kiranshastry-lineal-color-kiranshastry.png"
            alt="bug"
          />
        </div>
      ))} */}

      <div className="test">
        <div className="testView">
          {/* <span className="testTitle">Prueba 1</span> */}
        </div>
        <div className="controls">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={handleDirectionClick} className="buttonStyle">
              <img
                name="arriba"
                className="imgSize button"
                src="https://img.icons8.com/doodle/48/undefined/up--v1.png"
                alt="up icon"
              />
            </button>
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 7 }}>
            <button className="buttonLeftStyles" onClick={handleDirectionClick}>
              <img
                name="izquierda"
                className="imgSize leftSide"
                alt="left icon button"
                src="https://img.icons8.com/doodle/48/undefined/up--v1.png"
              />
            </button>
            <button className="buttonStyle" onClick={handleDirectionClick}>
              <img
                name="abajo"
                className="imgSize downSide"
                src="https://img.icons8.com/doodle/48/undefined/up--v1.png"
                alt="down icon"

              />
            </button>
            <button
              className="buttonRightStyles"
              onClick={handleDirectionClick}
            >
              <img
                name="derecha"
                className="imgSize rightSide"
                alt="right icon button"
                src="https://img.icons8.com/doodle/48/undefined/up--v1.png"
              />
            </button>
          </div>
          <div className="ordersView"></div>
        </div>
      </div>
      <div
        id="actions"
        style={{
          display: "flex",
          "justify-content": "center",
          gap: "23px",
        }}
      >
        <button
          className="button-86"
          onClick={handleStartTest}
          disabled={startTest}
        >
          Empezar
        </button>
        <button
          className="button-30"
          disabled={anserwesSent}
          onClick={validateSequence}
        >
          Comprobar ruta
        </button>

        <button style={{ marginLeft: 60 }}>
        <Link to="/report">Reportes</Link>
      </button>

      </div>
      {anserwesSent && (
        <aside style={{ position: "absolute", right: "0", top: "50%" }}>
          siguiente
          <button onClick={handleNextTest}>test {currentTest}</button>
        </aside>
      )}
    </div>
  );
};

export default Tests;
