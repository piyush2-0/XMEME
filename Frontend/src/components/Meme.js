import { useState } from "react"
import EditMeme from "./editMeme"

const Meme = ({ meme , onDelete , onEdit}) =>{
    const [showEditMeme, setShowEditMeme ] = useState(true);
    const OnEdit=async(id)=>{
        setShowEditMeme(!showEditMeme);
    }
    

    return (
        <div className='meme'>
            <br></br>
            <hr></hr>
            <hr></hr>
        {/* add the fields which you want to display */}
       <div class="highlight">Name of Creator: {meme.name}</div> 
     
        <div class="highlight">CAPTION: {meme.caption}</div>
     
       <div class="highlight"> MEME:</div>

       <div>
       <img className="meme-image" src={meme.url} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg"}} alt="meme"/>
       </div>
        
        <button class="btn btn-danger" onClick={()=>onDelete(meme.id)}>
            DELETE
        </button>

        
        <button class="btn btn-danger" onClick={()=>OnEdit(meme.id)} >
            EDIT
           </button>
        

        {(showEditMeme) ? (
            <div></div>
        ):(
            <EditMeme Meme onEdit={onEdit} meme={meme} />
        )}

        </div>
    )
}

export default Meme;