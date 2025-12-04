import ThemeSwitcher from '@/components/providers/theme/ThemeSwitcher'
import TodoList from '@/features/todos/views/todos/TodosView'
import React from 'react'

export default function HeroSection() {
    return (
        <div>
            <h1>Hero Section</h1>
            <TodoList />
            <ThemeSwitcher />
        </div>
    )
}
