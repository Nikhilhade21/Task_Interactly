import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(state => state.nodes);
  const edges = useSelector(state => state.edges);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState(null);

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const onConnect = useCallback(
    (params) => {
      dispatch({
        type: 'ADD_EDGE',
        payload: { ...params, id: `e${params.source}-${params.target}` },
      });
    },
    [dispatch]
  );

  const handleNodeClick = (event, node) => {
    const newTitle = prompt('Enter new title for the node:');
    if (newTitle) {
      dispatch({
        type: 'UPDATE_NODE',
        payload: { id: node.id, data: { label: newTitle } },
      });
    }
  };

  const handleNodeDelete = (nodeId) => {
    dispatch({ type: 'DELETE_NODE', payload: nodeId });
  };

  const handleEdgeDelete = (edgeId) => {
    dispatch({ type: 'DELETE_EDGE', payload: edgeId });
  };

  const handleAddNode = () => {
    const id = `node-${nodes.length + 1}`;
    const newNode = {
      id,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      style: { border: '1px solid #777', padding: 10, borderRadius: '50%' },
    };
    dispatch({ type: 'ADD_NODE', payload: newNode });
  };

  return (
    <div className="home">
      <button className="create-node-btn" onClick={handleAddNode}>
        Create Node
      </button>
      <div className="graph-panel">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onNodeMouseEnter={(event, node) => setHoveredNodeId(node.id)}
          onNodeMouseLeave={() => setHoveredNodeId(null)}
          onEdgeMouseEnter={(event, edge) => setHoveredEdgeId(edge.id)}
          onEdgeMouseLeave={() => setHoveredEdgeId(null)}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        {hoveredNodeId && (
          <div
            className="delete-icon"
            style={{
              position: 'absolute',
              left: nodes.find((n) => n.id === hoveredNodeId).position.x + 30,
              top: nodes.find((n) => n.id === hoveredNodeId).position.y - 10,
              zIndex: 1000,
              cursor: 'pointer',
            }}
            onClick={() => handleNodeDelete(hoveredNodeId)}
          >
            X
          </div>
        )}
        {hoveredEdgeId && (
          <div
            className="delete-icon"
            style={{
              position: 'absolute',
              left: edges.find((e) => e.id === hoveredEdgeId).sourceX,
              top: edges.find((e) => e.id === hoveredEdgeId).sourceY,
              zIndex: 1000,
              cursor: 'pointer',
            }}
            onClick={() => handleEdgeDelete(hoveredEdgeId)}
          >
            X
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
