import Meme from './Meme'

const Memes = ({memes , onDelete , onEdit}) => {
    const List=[];
    for(let i=Math.min(100,memes.length-1) ; i>=0 ;i--)
        List.push(memes[i]);
    return (
        <>
        <h2>SOME LATEST MEMES</h2>
            {List.map((meme) => (
                // enter arrayname.field also h3 should have a unique key here it is id of the array
                //loop through the tasks and pass as prop 
                <Meme key={meme.id} meme={meme} 
                onDelete={onDelete} onEdit={onEdit} />
            ))}
        </>
    )
}

export default Memes
