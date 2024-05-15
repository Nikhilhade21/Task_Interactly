import { createStore } from 'redux';

const initialState = {
  nodes: [],
  edges: [],
};

function graphReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NODE':
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
      };
    case 'UPDATE_NODE':
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.payload.id ? { ...node, ...action.payload } : node
        ),
      };
    case 'DELETE_NODE':
      return {
        ...state,
        nodes: state.nodes.filter(node => node.id !== action.payload),
        edges: state.edges.filter(edge => edge.source !== action.payload && edge.target !== action.payload),
      };
    case 'ADD_EDGE':
      return {
        ...state,
        edges: [...state.edges, action.payload],
      };
    case 'DELETE_EDGE':
      return {
        ...state,
        edges: state.edges.filter(edge => edge.id !== action.payload),
      };
    default:
      return state;
  }
}

const store = createStore(graphReducer);

export default store;
