import React from "react";
import './App.css';
import {FontAwesomeIcon} from './icons';

const CustomNode = ({ nodeData }) => {
    return (
        <div style={{height:'20px',width:'20px'}}>
            {
                nodeData.icon?
                    <div className="numberSquare">
                        <FontAwesomeIcon icon={nodeData.icon} />
                    </div> :
                    nodeData.icon=== ''?<div className="numberSquare"/> :
                    <div className="numberCircle" />
            }
        </div>

    );
}

export default CustomNode;