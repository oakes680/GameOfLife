import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  let arr = new Array(10).fill(0);
  let arr1 = new Array(10).fill(0);
  let arr2 = new Array(10).fill(0);
  let arr3 = new Array(10).fill(0);
  let arr4 = new Array(10).fill(0);
  let arr5 = new Array(10).fill(0);
  let arr6 = new Array(10).fill(0);




  let outerArray = [arr, arr1, arr2, arr3, arr4, arr5, arr6];

  const [grid, setGrid] = useState([]);
  const [go, setGo] = useState(0)
  
  
  const [size, setSize] = useState({xDimension:10, yDimension:10})
  const intervalRef = useRef(null);

  function arrayMaker() {
    let xArr = []
    for(let x=0; x < Number(size.xDimension); x++ ){
      let yArr = []
      for(let y=0; y < Number(size.yDimension);y++){
        yArr[y]=0
      }
      xArr.push(yArr);

    }
    setGrid([...grid, ...xArr])
  }
useEffect(()=>{
arrayMaker();
},[])
  
  function algo() {

      let clone = []
      
      clone = JSON.parse(JSON.stringify(grid));
    //  console.log('grid', grid)
    //  console.log('this is clone',clone)
    for (let x = 0; x < outerArray.length; x++) {
   
      for (let y = 0; y < arr.length; y++) {
       
        let checks2 = [
          grid[(outerArray.length + (x - 1)) % outerArray.length][
            (arr.length + (y - 1)) % arr.length
          ],
          grid[(outerArray.length + (x + 0)) % outerArray.length][
            (arr.length + (y - 1)) % arr.length
          ],
          grid[(outerArray.length + (x + 1)) % outerArray.length][
            (arr.length + (y - 1)) % arr.length
          ],
          grid[(outerArray.length + (x + 1)) % outerArray.length][
            (arr.length + (y + 0)) % arr.length
          ],
          grid[(outerArray.length + (x - 1)) % outerArray.length][
            (arr.length + (y + 0)) % arr.length
          ],
          grid[(outerArray.length + (x - 1)) % outerArray.length][
            (arr.length + (y + 1)) % arr.length
          ],
          grid[(outerArray.length + (x + 0)) % outerArray.length][
            (arr.length + (y + 1)) % arr.length
          ],
          grid[(outerArray.length + (x + 1)) % outerArray.length][
            (arr.length + (y + 1)) % arr.length
          ],
        ];
        
        // checks2.forEach(r => console.log("value: ", r))

        let count = checks2.reduce((acc, curr) => acc + curr);
        
        // if the current grid value = 1 and count = 2 or 3 don't do anything
        // if the current gird value =1 and the count > 3 or  < 2 change the value to 0
        // if current grid value is 0 and the count == 3 then change the value 1
        if (grid[x][y] === 1 && (count > 3 || count < 2)) {
          clone[x][y] = 0;
          console.log("this is true 1", clone[x][y] === grid[x][y])
        } else if (grid[x][y] === 0 && count === 3) {
          clone[x][y] = 1;
          console.log("this is true 2", clone[x][y] === grid[x][y])
        }


        else console.log('');
      }

    }
    
    setGrid((grid) =>  grid = JSON.parse(JSON.stringify(clone)));
    
  }

  useEffect(() => {
    
    algo()

  }, [go])




 
 
  const start = () => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() =>{
      setGo(go => go + 1);
      console.log('gooooo', go)
      console.log('hi')
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  function handleChange(e){
    e.preventDefault()
    setSize({...size,[e.target.name]:e.target.value})
  }

  console.log(size)
  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}> Stop </button>
      <form>
        <div>
          
          <label>
          xDimension:
            <input type="text" value={size.xDimension} name='xDimension' onChange={handleChange} />
            </label>
            <label>
            yDimension:
            <input type="text" value={size.yDimension} name='yDimension' onChange={handleChange} />
            </label>

          </div>
      </form>
      <div className="border1">
        {grid.map((x, ind1) =>
          x.map((y, ind2) => (
            <div
              onClick={() => {
                // setCellStatus(!cellStatus)
                const newGrid = [...grid];
                newGrid[ind1][ind2] = grid[ind1][ind2] ? 0 : 1;
                setGrid(newGrid);
                console.log("localstate", grid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[ind1][ind2] === 1 ? "blue" : "green",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  
  );
};

export default App;
