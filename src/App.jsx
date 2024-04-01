import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const getValueLocalStorage = () => {
  let val = localStorage.getItem("item");
  if (val !=='') {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
};

function App() {
  // useState hook use to manage state for set Data
  const [store, setStore] = useState(getValueLocalStorage());
  

  // handle the form submittion and get data from input field and store inside the array
  const handleData = (e) => {
    e.preventDefault();
    // console.log(e.target.form[0].value);
    const data = e.target[0].value;
    setStore([...store, data]);
  };

  // delete item from localStorage
  const handleDelete = (ind) => {
    // id.preventDefault()

    let deleteData = store.filter((vals, id) => {
      return id !== ind;
    });

    setStore(deleteData);
  };


  // useEffect use to sote data in localStorage
  //locaStorage take two value key/value
  //JSON.stringify use to convert array to string because localStorage store data in string format

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(store));
  }, [store]);

  return (
    <>
      <form
        onSubmit={handleData}
        className="flex flex-col gap-5 justify-center items-center bg-emerald-400 py-2 rounded-xl mb-1"
      >
        <input
          type="text"
          placeholder="Enter the text"
          className="border-2 border-slate-800 p-[10px_10px_10px_10px] rounded text-2xl text-slate-800 outline-none"
        />
        <button className="bg-green-500 p-[5px_15px] text-2xl font-semibold rounded-xl border-x-slate-600 border-1">
          Add Data
        </button>
      </form>
      <section className="flex flex-col justify-center items-center bg-rose-400 rounded-xl gap-2">
        {store.map((val, ind) => {
          if (val != "") {
            return (
              <div className="flex justify-between w-80 py-3 px-3   bg-teal-300 m-2 rounded-xl" key={ind}>
                <p className='text-1xl font-semibold' >{val}</p>
                <button className='bg-red-400 px-1 rounded font-bold' key={ind} onClick={() => handleDelete(ind)}>Delete</button>
              </div>
            );
          }
        })}
      </section>
    </>
  );
}

export default App;
