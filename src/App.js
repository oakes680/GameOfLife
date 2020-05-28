import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  // let arr = new Array(10).fill(0);
  // let arr1 = new Array(10).fill(0);
  // let arr2 = new Array(10).fill(0);
  // let arr3 = new Array(10).fill(0);
  // let arr4 = new Array(10).fill(0);
  // let arr5 = new Array(10).fill(0);
  // let arr6 = new Array(10).fill(0);

  // let outerArray = [arr, arr1, arr2, arr3, arr4, arr5, arr6];

  const [grid, setGrid] = useState([]);
  const [go, setGo] = useState(0);
  const [randomGen, setRandomGen] = useState(false);
  const [size, setSize] = useState({ xDimension: 10, yDimension: 10 });
  const [speed, setSpeed] = useState(5);
  const [stopAlgo, setStopAlgo] = useState(false);
  const intervalRef = useRef(null);

  

  function arrayMaker() {
    let xArr = [];
    for (let x = 0; x < Number(size.xDimension); x++) {
      let yArr = [];
      for (let y = 0; y < Number(size.yDimension); y++) {
        if (randomGen) {
          yArr[y] = Math.round(Math.random() * 1);
        } else {
          yArr[y] = 0;
        }
      }
      xArr.push(yArr);
    }
    setGrid([...xArr]);
  }

  useEffect(() => {
    arrayMaker();
  }, [size.xDimension, size.yDimension, randomGen]);

 
  function algo() {
    let flag = true;
    let clone = [];

    clone = JSON.parse(JSON.stringify(grid));
    //  console.log('grid', grid)
    //  console.log('this is clone',clone)
    for (let x = 0; x < size.xDimension; x++) {
      for (let y = 0; y < size.yDimension; y++) {
        let checks2 = [
          grid[(size.xDimension + (x - 1)) % size.xDimension][
            (size.yDimension + (y - 1)) % size.yDimension
          ],
          grid[(size.xDimension + (x + 0)) % size.xDimension][
            (size.yDimension + (y - 1)) % size.yDimension
          ],
          grid[(size.xDimension + (x + 1)) % size.xDimension][
            (size.yDimension + (y - 1)) % size.yDimension
          ],
          grid[(size.xDimension + (x + 1)) % size.xDimension][
            (size.yDimension + (y + 0)) % size.yDimension
          ],
          grid[(size.xDimension + (x - 1)) % size.xDimension][
            (size.yDimension + (y + 0)) % size.yDimension
          ],
          grid[(size.xDimension + (x - 1)) % size.xDimension][
            (size.yDimension + (y + 1)) % size.yDimension
          ],
          grid[(size.xDimension + (x + 0)) % size.xDimension][
            (size.yDimension + (y + 1)) % size.yDimension
          ],
          grid[(size.xDimension + (x + 1)) % size.xDimension][
            (size.yDimension + (y + 1)) % size.yDimension
          ],
        ];

        // checks2.forEach(r => console.log("value: ", r))

        let count = checks2.reduce((acc, curr) => acc + curr);

        // if the current grid value = 1 and count = 2 or 3 don't do anything
        // if the current gird value =1 and the count > 3 or  < 2 change the value to 0
        // if current grid value is 0 and the count == 3 then change the value 1
        if (grid[x][y] === 1 && (count > 3 || count < 2)) {
          clone[x][y] = 0;
          flag = false;
          // console.log("this is true 1", clone[x][y] === grid[x][y])
        } else if (grid[x][y] === 0 && count === 3) {
          clone[x][y] = 1;
          flag = false;
          // console.log("this is true 2", clone[x][y] === grid[x][y])
        } else console.log("");
      }
    }

    setStopAlgo(flag);

    setGrid(clone);
  }

  console.log('stoppalgo',stopAlgo)
  useEffect(() => {
    if (stopAlgo === true) {
      stop();
    }

    if (go != 0) {
      algo();
    }
  }, [go, stopAlgo]);

  const start = () => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setGo((go) => go + 1);
    }, speed * 200);
  };

  const stop = () => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  function reset() {
    stop();
    setRandomGen(false);
    arrayMaker();
    setGo(0);
  }

  function handleChange(e) {
    e.preventDefault();
    setSize({ ...size, [e.target.name]: Number(e.target.value) });
  }

  function handleSpeed(e) {
    e.preventDefault();
    setSpeed(e.target.value);
    stop()

    if(go !==0) {
      start();
    }
    
    
    
  }

  return (
    <div>
      <div className='buttonDiv'>
        <button onClick={start}>Start</button>
        <button onClick={stop}> Stop </button>
        <button onClick={reset}>Clear</button>
        <button onClick={() => setRandomGen(!randomGen)}>Random</button>
      </div>

      <form>
        <div className='formDiv'>
        <div className="slidecontainer">
          <span>Speed:</span>
          <span>{speed}</span>
            <input
              className="slider"
              name="speed"
              type="range"
              min="1"
              max="10"
              step="1"
              value={speed}
              onChange={handleSpeed}
            />
          
          <label className='labelSize'>
            <span className="mRight">xDimension:</span>
            <input
              className='inputSize'
              type="text"
              value={size.xDimension}
              name="xDimension"
              onChange={handleChange}
            />
          </label>
          <label className='labelSize'>
            <span className="mRight">yDimension:</span>
            <input
            className='inputSize'
              type="text"
              value={size.yDimension}
              name="yDimension"
              onChange={handleChange}
            />
          </label>
        </div>
        </div>
      </form>
      <div
        className="border1"
        style={{ gridTemplateColumns: `repeat(${size.yDimension}, 20px)` }}
      >
        {grid.map((x, ind1) =>
          x.map((y, ind2) => (
            <div
              onClick={() => {
                const newGrid = [...grid];
                newGrid[ind1][ind2] = grid[ind1][ind2] ? 0 : 1;
                setGrid(newGrid);
                // setStopAlgo(false)
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[ind1][ind2] === 1 ? "#18a8a8" : "white",
                border: "solid 1px black",
              }}
            />
          ))
        )}
        <div>Generations {stopAlgo ? go - 1 : go}</div>
      </div>
    </div>
  );
};

export default App;
