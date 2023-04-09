import React from 'react'

const spinner = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921";
const Spinner =()=>{
    return (
      <div className='text-center'>
            <img src={spinner} alt="wait for it" width={"20%"} height={"20%"}  />
      </div>
    )
  }

export default Spinner
