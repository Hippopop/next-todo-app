"use client";

import { useGetTodosQuery } from '../../state/todo_slice';


export default function TodoList() {
    const { data, isLoading, error } = useGetTodosQuery();
    return (
        <>
            {isLoading ? <p>Loading...</p> : <>
                {
                    data?.data?.forEach((todo) => {
                        return <p id={todo.id!.toString()}>{todo.title}</p>
                    })
                }
            </>}
            {error ? <p> {error?.toString() ?? "Error"} </p> : <> </>}
        </>
    );
}
