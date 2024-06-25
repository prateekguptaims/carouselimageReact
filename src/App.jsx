import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchImages = async () => {
    setLoading(true)
    const url = "https://www.reddit.com/r/aww/top/.json?t=all"
    const res = await fetch(url)
    const data = await res.json()
    const result = data.data.children;
    console.log(result)
    const list = result.filter((e) => e.data.url_overridden_by_dest.includes('.jpg')).map((e) => e.data.url_overridden_by_dest)
    console.log(list)
    setImages(list)
    setLoading(false)

  }
  const handleClick=(dir)=>{
    console.log(("index",index))
    //0
    const lastIndex=images.length-1;
    if(dir==='left'){
      if(index===0){
        console.log("last images",lastIndex)
        setIndex(lastIndex)
      }
      else{
        setIndex((idx)=>idx-1)
      }

    }
    else if(dir==='right'){
      if(lastIndex===index){
        setIndex(0);
      }
      else{
        setIndex((index)=>index+1)
      }
    }

  }
  useEffect(() => {
    const tid=setInterval(() => {
      handleClick('right');
    }, 3000);
    return ()=>{
      clearInterval(tid)
    }   
  }, [index])
  useEffect(() => {
  fetchImages()
  }, [])
  


  return (
    <>
      <div className="App">
        {loading ?<div>loading.....</div>:
        <>
        <button className=''
          onClick={() => handleClick('left')}>
          {"<"}
        </button>
        <img src={images[index]} alt="not found" className='img' />
       
        <button className='right' 
        onClick={() => handleClick('right')}>
          {">"}
        </button>
        </>
        }
        
      </div>
    </>
  )
}

export default App
