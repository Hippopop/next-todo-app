
import { createApi } from '@reduxjs/toolkit/query/react';
import { rtkBaseQuery } from '@/lib/api/baseQuery';
import { ResponseWrapperSchema } from '@/lib/api/models/response';
import z from 'zod';
import { TODOSchema } from '../schemas/todo';



const TodoResponseSchema = ResponseWrapperSchema(TODOSchema.array());
type TodosResponseType = z.infer<typeof TodoResponseSchema>;


export const todoSlice = createApi({
    reducerPath: 'todos',
    baseQuery: rtkBaseQuery,
    endpoints: (builder) => ({
        getTodos: builder.query<TodosResponseType, void>({
            query: () => ({
                method: 'GET',
                url: '/todos/all',
                responseSchema: TodoResponseSchema,
            }),
        }),
    }),
});

export default todoSlice.reducer
export const { useGetTodosQuery } = todoSlice;