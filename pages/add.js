import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../components/Button"
import Layout from "../components/Layout"

export default function Add() {
    //using state
    const [todo, setTodo] = useState('')

    //using router
    const router = useRouter()

    //add todo method
    const addItem = () => {
        //getting data from localstorage
        const todos = JSON.parse(localStorage.getItem('todos'))
        let new_todos = [
            { item: todo }
        ]
        if (todos) {
            new_todos = [
                ...todos,
                { item: todo }
            ]
        }

        //storing data to localstorage
        localStorage.setItem('todos', JSON.stringify(new_todos))

        //empty field
        setTodo('')

        //redirect
        router.push('/')
    }
    return (
        <Layout>
            <Head>
                <title>Add Todo</title>
            </Head>
            <div className="flex flex-col justify-center space-y-4">
                <input onChange={(e) => setTodo(e.target.value)} value={todo} className='py-2 px-4 rounded w-full border' type='text' placeholder='What to do?' name='todo' />
                <Button onClick={addItem}>Add Item</Button>
                <Link href='/'><a className="text-center text-blue-500 font-bold">Go Back!</a></Link>
            </div>
        </Layout>
    )
}