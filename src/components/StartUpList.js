import React from 'react';

import CardStartUp from './UIElements/CardStartUp';
import StartUpItem from './StartUpItem';

import '../styles/StartUpList.css'

const StartUpList = props => {
  return (
    <ul className='start-ap__list'>
        {props.items.map((startUp)=>{
            return(
                <StartUpItem key={startUp.id}
                id={startUp.id}
                image={startUp.image}
                name={startUp.name}
                text = {startUp.text}/>
            )
        })}
    </ul>
  )
}

export default StartUpList;
