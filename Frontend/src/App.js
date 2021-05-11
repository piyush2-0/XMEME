import { useState, useEffect } from "react"
import Header from "./components/Header";
import Memes from "./components/Memes";
import CreateMeme from "./components/CreateMeme";
import Substitute from"./components/Substitute"
import Particular from"./components/Particular"


const App = () => {
  const [showCreateMeme, setShowCreateMeme ] = useState(false)
  const [memes, setMemes] = useState([])



  useEffect(() => {
    const getMemes = async () => {
      const memesFromServer = await fetchMemes()
      setMemes(memesFromServer)
    }
    getMemes()
  
  }, [])

  

  //Fetch Memes
  const fetchMemes = async () => {
    const path=window.location.pathname;
    const res = await fetch(`http://localhost:8081${path}`);
    const data = await res.json();
    return data;
  };


  // Create Meme
  const createMeme = async (meme) => {
     await fetch("http://localhost:8081/memes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(meme),
    })
    .then(result =>{
       setMemes([...memes, result])
    })
    .catch(err =>{
      console.log("gfgdf");
    })
  }

  // Delete Meme
  const deleteMeme = async (id) => {
    await fetch(`http://localhost:8081/memes/${id}`, {
    method: "DELETE",
    })
    setMemes(memes.filter((meme) => meme.id !== id));
    
  }

  //Edit Meme
  const editMeme = async (id,meme)=> {
   const res= fetch(`http://localhost:8081/memes/${id}`,{
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(meme),
    })

    setMemes([...memes, res])
     
  }

  //sending the required pages as per request
  return (
    <div className="container">
       <Header
          onCreate={() => setShowCreateMeme
            (!showCreateMeme)}
          showCreate={showCreateMeme} />
           {showCreateMeme && <CreateMeme onCreate={createMeme} />}
          
      {(memes.length > 0) ? (
        <div>
        <Memes memes={memes} onDelete={deleteMeme} onEdit={editMeme} />
         </div>
        ) : (memes.name!=undefined )? ( <Particular memes={memes}/> ):(
           <Substitute />
        )
      }
    </div>
  )
}


export default App;