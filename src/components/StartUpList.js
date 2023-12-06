import React from 'react';

import CardStartUp from './UIElements/CardStartUp';
import StartUpItem from './StartUpItem';
//import { ChatState } from '../Context/ChatProvider';
import '../styles/StartUpList.css'

const StartUpList = props => {
  let startUpClassName = 'start-up__list'
  if (props.items.length === 1) {
    startUpClassName = 'start-up__single';
  }

  return (
    <ul className={startUpClassName}>
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
