import React from 'react';


const CardStartUp = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default CardStartUp;