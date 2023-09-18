
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
const Body = () => {


    // Handles the state of input
    const [meme, setMeme] = useState({
        topText:'',
        bottomText:'',
        randomImage: ''
    });

    // Handles the state changes in inpue
    function handleInput(event){
        const {name,value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value

        }))
    };

    // Handles the get memes state change from the api
    const [getMemes, setGetMemes] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setGetMemes(data.data.memes))
}, []);

    

    function handleChangeEvent(event){
        event.preventDefault()
        const random = Math.floor(Math.random() * getMemes.length)
        const url = getMemes[random].url

        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
    }))
};

    
    return(
        <main>

            <form
            className='main--form'>

                <input
                type='text'
                name='topText'
                value={meme.topText}
                onChange={handleInput}
                />

                <input
                type='text'
                name='bottomText'
                value={meme.bottomText}
                onChange={handleInput}
                />

                <button
                onClick={handleChangeEvent}
                className='button--keypad'>Get meme image 📷
                </button>
            </form>

            

            <div>
                <img src={meme.randomImage}
                alt='meme--logo'
                className='meme--logo'/>

                <h1 className='meme--text1'>{meme.topText}</h1>
                <h1 className='meme--text2'>{meme.bottomText}</h1>

            </div>


            
        
                

            
            

            

        </main>
    );
};

export default Body;