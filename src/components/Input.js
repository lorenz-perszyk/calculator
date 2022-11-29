import React from 'react'
import '../styles/Input.scss';

const Input = ({input, clear, equals, math, state, percent, plusMinus}) => {

    const handleMath = ({target}) => {
        math(target.value);
    }

  return (
    <div className='input'>
        <button className='dark' onClick={() => clear()}>{state}</button>
        <button className='dark' onClick={() => plusMinus()}>+/-</button>
        <button className='dark' onClick={() => percent()}>%</button>
        <button className='color' value='/' onClick={handleMath} >÷</button>
        <button className='light' onClick={() => input(7)}>7</button>
        <button className='light' onClick={() => input(8)}>8</button>
        <button className='light' onClick={() => input(9)}>9</button>
        <button className='color' value='*' onClick={handleMath}>x</button>
        <button className='light' onClick={() => input(4)}>4</button>
        <button className='light' onClick={() => input(5)}>5</button>
        <button className='light' onClick={() => input(6)}>6</button>
        <button className='color' value='-' onClick={handleMath}>–</button>
        <button className='light' onClick={() => input(1)}>1</button>
        <button className='light' onClick={() => input(2)}>2</button>
        <button className='light' onClick={() => input(3)}>3</button>
        <button className='color' value='+' onClick={handleMath}>+</button>
        <button className='light zero' onClick={() => input(0)}>0</button>
        <button className='light' onClick={() => input('.')}>.</button>
        <button className='color' onClick={() => equals()}>=</button>
    </div>
  )
}

export default Input