import React, { Children } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const list = [
    {
        id: 1,
        question: "Why is the sky blue?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti."
    },
    {
        id: 2,
        question: "Why is the sky blue?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti."
    },
    {
        id: 3,
        question: "Why is the sky blue?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti."
    },
    {
        id: 4,
        question: "Why is the sky blue?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti."
    },
    {
        id: 5,
        question: "Why is the sky blue?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti."
    },
]

function Accordian(props) {

    const [show, setShow] = useState()

    const showAccordian = id => {
        setShow(id)
    }

    const click = e => {
        console.log(e)
    }

    return(
        <div key={props.idx} className='accordian__box' onClick={props.onClick}>
                                <div className='accordian__question'>{props.heading}</div>
                                <div style={{height: 0, overflow: 'hidden',transition: "0.3s"}} className='accordian__answer'>
                                    {
                                        props.children
                                    }
                                </div>
                            </div>
    )
    
    // return (
    //     <div className="px-5" onClick={() => click()}>
    //         <h2>Frequently Asked Questions</h2>
    //          <div className="">
    //             {
    //                 list.map((ele, idx) => {
    //                     return ( 
    //                         <div key={props.idx} className='accordian__box' onClick={props.onClick}>
    //                             <div className='accordian__question'>{props.heading}</div>
    //                             <div style={{height: show === props.idx ? 'auto' : 0, overflow: 'hidden',transition: "0.3s"}} className='accordian__answer'>
    //                                 {
    //                                     props.children
    //                                 }
    //                             </div>
    //                         </div>
    //                      )
    //                 })
    //             }

    //         </div>
    //      </div>
    // )
}

export default Accordian