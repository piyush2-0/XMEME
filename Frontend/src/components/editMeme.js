import { useState } from 'react'


const EditMeme = ({onEdit , meme}) => {
    const[name,setName]=useState(meme.name)
    const[url,setUrl]=useState(meme.url)
    const[caption,setCaption]=useState(meme.caption)
    const onSubmit =(e) =>{
        onEdit(meme.id,{name,url,caption})
        setName('')
        setUrl('')
        setCaption('')
    }



return (
    <form className="add-form" className=".col-6" onSubmit={onSubmit}>
        <div className="form-control">
            <label>NAME</label>
            <input type="text" placeholder="Enter Full Name" required
            value ={name}
            onChange={(e) => 
             setName(e.target.value)} disabled="disabled"
             />
        </div>
        <div className="form-control">
            <label>URL</label>
            <input type="url" placeholder="Enter the URL of your MEME" required
             value ={url}
             onChange={(e) => 
              setUrl(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label>CAPTION</label>
            <input type="text" placeholder="Be creative with the Caption" required
             value ={caption}
             onChange={(e) => 
                 setCaption(e.currentTarget.value)}
                 />
        </div>

        <input type="submit" value="Update Meme" className="btn btn-success" />
    </form>
 )
}

export default EditMeme;

