import React, {useState, useEffect,useRef}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

let selectedItem = "hello";
const URL = window.location.origin


async function getArr (item) 
{
  const arrItens = await fetch(`${URL}/files`).then(r => r.json())
  console.log(arrItens)
  item(arrItens);
}

async function deleteFile(namess, array)
{
 const data = await axios.post(`${URL}/delete`, {"name": namess})
 array(data.data)
}




 function App() {
  const [arrFiles, setarrFiles] = useState([]);
  const [AbleToSubmit, SetAbleToSubmit] = useState(0)
  const [visibilityValue, SetVisibilityValue] = useState("hidden")
  const form = useRef()
  const textPart = useRef()
  const toggleDiv = useRef()
  const download = useRef()
  const closeRef = useRef()
  const deleteRef = useRef()
  


  useEffect(() => {
  getArr(setarrFiles);    

  }, [])

  return (
    <div className="body">
      <header>
        <form action={`${URL}/upload`} method="POST"  ref={form}encType="multipart/form-data" class="head">
          <label>
          <input type="file" id="files" name="fileUpload" onChange={(e) => {form.current.submit()}} style={{visibility:"hidden", width:"48vw", margin:0, padding:0}}></input>
            Files
          </label>
          {/* <input type="anything" style={{visibility:'hidden'}} value={URL}></input> */}
        </form>
      </header>
      <form action={`${URL}/files`} method="POST" encType="multipart/form-data" style={{height:"93vh",  overflowY:"auto" , background:"linear-gradient(to right, #8e2de2, #4a00e0)"}}>
        {arrFiles.map(m =>(
          <Item text={m} textref={textPart} downloadref={download} deleteref={deleteRef} div={toggleDiv}closeref={closeRef}></Item>
        ))}
      </form>
      <div ref={toggleDiv} style={{width:"50vw", height:"93vh", visibility:"hidden" , position:"absolute" , right:0 , bottom:"0" , background:"rgba(0,0,0,0.6)"}}>
          <div style={{height:"73vh" , color:"white" , fontFamily:"sans-serif" , wordBreak:"break-all", fontSize:"5vw" , overflowY:"auto"}} ref={textPart}></div>
          <div style={{position:"absolute", display:"flex", flexDirection:"column"  , bottom:0 , width:"50vw", height:"30vh"}}>
          <form class="formthis"action={`${URL}/files`} method="POST" encType="multipart/form-data" >
            <input type="radio" name="name" checked ref={download} style={{visibility:"hidden"}} ></input>
            <button style={{height:"10vh", width:"50vw" , background:"blue" , border:"none" , color:"white"}} type="submit">Download</button>
          </form>
          <button style={{height:"10vh" , width:"50vw" , background:"yellow" , border:"none" , color:"black", margin:0 , padding:0}} ref={closeRef} onClick={() => {toggleDiv.current.style.visibility = "hidden"}} >Close</button>
            <button style={{height:"10vh" , width:"50vw" , background:"red" , border:"none" , color:"white"}} ref={deleteRef} onClick={async () => {await axios.post(`${URL}/delete` , {name:deleteRef.current.value}) ; window.location.reload()}}>Delete</button>
          </div>
      </div>
    </div>
  );
}





function Item({text , textref , downloadref , deleteref  ,div})
{
  const [arrFiles, setarrFiles] = useState([]);
  const [AbleToSubmit, SetAbleToSubmit] = useState(0)
  const [visibilityValue, SetVisibilityValue] = useState("hidden")
  const click = (e) => {
    const checked = e.target.checked
    // console.log(e.target.variableInjected)
    if(checked === true){
      SetAbleToSubmit(AbleToSubmit + 1)
      // selectedItem = e.target.value
      downloadref.current.value = text 
      deleteref.current.value = text
      textref.current.innerHTML = text
      div.current.style.visibility = "visible"
      console.log(textref)
      // downloadref.current.click()
    }
    // if(AbleToSubmit < 1){
    //   SetVisibilityValue('visible')
    // }
  }
  const deleteFilevar = () =>
  {
    SetVisibilityValue('hidden')
    deleteFile(selectedItem, setarrFiles)
  }

  return(          
  <div className={"item"}>
  <input type="radio" value={text} name="name" key={text+'keycheck'}  onClick={click}></input>
  <h4>{text}</h4>
  {/* <button type="button" style={{visibility: "visible"}} onClick={deleteFilevar}>delete</button> */}
  {/* <button type="submit" style={{visibility: "visible"}} value={text}>download</button> */}
  </div>);
}








//render
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

