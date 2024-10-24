import { useReducer } from 'react';

const useLoggingReducer = <S, A>(reducer: React.Reducer<S, A>, initialState: S) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const loggingDispatch: React.Dispatch<A> = (action) => {
        console.log('Dispatching action:', action);
        dispatch(action);
    };

    return [state, loggingDispatch] as const;
};

export { useLoggingReducer };
