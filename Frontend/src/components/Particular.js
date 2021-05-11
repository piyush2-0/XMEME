import PropTypes from 'prop-types'


const Particular=({memes})=>{
    return(
        <div className='meme'>
        <h1>Name of Creator: </h1> 
           <h2> {memes.name}</h2>
        <h1>CAPTION: </h1>
       <h2>{memes.caption}</h2> 

        <h1>MEME: </h1>
       <img className="meme-image" src={memes.url} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg"}} alt="meme"/>
       </div>

    )
}
export default Particular