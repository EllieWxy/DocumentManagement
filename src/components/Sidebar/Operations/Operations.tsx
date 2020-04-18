import * as React from 'react'
import Operation from "./Operation/Operation";
import './Operations.css'

export default class Operations extends React.Component{

    addClick = function(event:any) : void{
        console.log(event)
    }

    render(){
        return <div className='operations'>
            <Operation icon="M816 816m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0ZM512 968a456 456 0 1 1 395.76-229.36 32 32 0 0 1-55.52-32 392 392 0 1 0-145.44 145.44 32 32 0 0 1 32 55.52A456 456 0 0 1 512 968zM704 544H320a32 32 0 0 1 0-64h384a32 32 0 0 1 0 64zM512 736a32 32 0 0 1-32-32V320a32 32 0 0 1 64 0v384a32 32 0 0 1-32 32z"
                       click={this.addClick}/>
            <Operation icon="M931.882 259.882l-167.764-167.764A96 96 0 0 0 696.236 64H160C106.98 64 64 106.98 64 160v704c0 53.02 42.98 96 96 96h704c53.02 0 96-42.98 96-96V327.764a96 96 0 0 0-28.118-67.882zM608 160v160H352V160h256z m244 704H172a12 12 0 0 1-12-12V172a12 12 0 0 1 12-12h84v208c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V167.764l156.486 156.486a12 12 0 0 1 3.514 8.486V852a12 12 0 0 1-12 12zM512 464c-97.046 0-176 78.954-176 176s78.954 176 176 176 176-78.954 176-176-78.954-176-176-176z m0 256c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80z"
                       click={null}/>
            <Operation icon="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768zM416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768zM928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160zM736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z"
                       click={null}/>
            </div>

    }
}
