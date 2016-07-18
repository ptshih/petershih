import { createSelector } from 'reselect';

const initialState = {
  isFetched: false,
  isFetching: false,
  error: null,

  contact: {
    email: null,
    first_name: null,
    last_name: null,
    photo: null,
    bio: null,
    stack: [],
    links: [],
    projects: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_ROOT_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCH_ROOT_SUCCESS':
      return { ...state, isFetched: true, isFetching: false, contact: action.response };
    case 'FETCH_ROOT_FAILURE':
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}

// Use Selector to choose State
export const selector = createSelector(
  (state) => (state.root),
  (root) => root
);

// Map Selector to Props
export function mapStateToProps(state) {
  return selector(state);
}

// Map Actions to Props
export function mapDispatchToProps(dispatch) {
  return {
  };
}
