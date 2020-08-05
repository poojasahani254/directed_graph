import React, {useEffect, useState} from 'react';
import { Graph } from "react-d3-graph";
import jsondata from './directed.json';
import CustomNode from './customNode';

const App = () => {

  const [snode,setNode] = useState([]);
  const [slink,setLink] = useState([]);
  const [value,setValue] = useState({
    node: '',
    linkNode: ''
  })

  useEffect(()=>{
    [jsondata].map((item)=>{
      let result = Object.keys(item).map((key) =>  item[key]);
      let data = result.map((item,index)=> {
        return {
        id: item.step.name,
        symbolType: "circle",
        size: 600,
        x: -60+index*35,
        y: -50+index*35
        }
      })

      let linkdata = result.map(item=>item.step.paths?{ id: item.step.name, paths:item.step.paths} : [])
      let pathdata= linkdata.map(i=>i.paths ? i.paths.map(b=> {
        return {
        id: b.label,
        symbolType: "circle",
        icon: b.icon,
        size: 600,
        }
      }):[])

      let arr = []
      pathdata.map(item=>{
        Object.values(item).map((i)=>{
          arr.push(i);
          return true;
        })
        return arr;
      })
      let nodearr = data.concat(arr)

      let linkarr = []
      linkdata.map((i)=>{
        i.paths && i.paths.map(item=>{
          let obj = {
            source: i.id,
            target: item.label
          }
          linkarr.push(obj)
          return true
        })
        return linkarr
      })

      setNode(nodearr)
      setLink(linkarr)
      return true
    })
  },[])

  const myConfig = {
    nodeHighlightBehavior: true,
    maxZoom: 4,
    minZoom: 0.6,
    gravity: -500 ,
    directed:true,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 800,
      highlightStrokeColor: "blue",
      viewGenerator: node => <CustomNode nodeData={node} />,
      mouseCursor: "pointer",
      highlightFontSize: 12,
      highlightFontWeight: "bold",
      highlightStrokeWidth: "SAME",
      labelProperty: "name",
    },
    d3: {
      alphaTarget: 0.05,
      gravity: -500,
      linkLength: 100,
      linkStrength: 1,
      disableLinkForce: false
    },
    link: {
      highlightColor: "blue",
      strokeWidth: 2.3,
      renderLabel: true,
    },

  };


  // graph event callbacks
  const onClickNode = nodeId => {
    window.alert(`Node Is ${nodeId}`);
  };

  const onClickLink = (source, target) => {
    window.alert(`Edages between ${source} and ${target}`);
  };

  const onNodePositionChange = (nodeId, x, y) => {
    window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
  };

  const onAddNode = () => {
      let node = {
        id: value.node,
        icon: '',
        size: 600,
        x: -60+3*35,
        y: -50+5*35
      }
      if(value.linkNode!==""){
        let link = {
          target: value.node,
          source: value.linkNode
        }
        setLink(state => [...state, link])
      }

      setNode(state => [...state, node])
  }
  let snodeList = snode.length > 0
      && snode.map(item => item.id)
          .filter((value, index, self) => self.indexOf(value) === index).map((item, i) => {
        return (
            <option key={i} value={item}>{item}</option>
        )
      });

  const textChange = (e) => {
    const {name , value} = e.target
    setValue(prev=>({
      ...prev,
      [name] : value
    }))
  }
  return (
    <div className="App">
      <input onChange={textChange} name="node"/>
      <select onChange={textChange} name="linkNode">
        {snodeList}
      </select>
      <button onClick={onAddNode} className="button">+</button>
      {
      slink.length> 0 && snode.length> 0 ? (
          <Graph
              id="graph-id"
              data={{
                links: slink,
                nodes: snode,
                focusedNodeId: "nodeIdToTriggerZoomAnimation"
              }}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
              onNodePositionChange={onNodePositionChange}
          />
      ) : <></>
    }
    </div>
  );
}

export default App;
