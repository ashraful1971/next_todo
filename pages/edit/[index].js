import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Button from "../../components/Button"
import Layout from "../../components/Layout"

export default function Edit() {
    //using state
    const [todo, setTodo] = useState()
    const [todos, setTodos] = useState([])

    //use next.js router
    const router = useRouter()

    //useeffect
    useEffect(() => {
        const all_todo = JSON.parse(localStorage.getItem('todos'))
        setTodos(all_todo)

        const filtered_item = all_todo?.filter((todo, i) => i === parseInt(router.query.index))
        setTodo(filtered_item[0].item)
    }, [])

    const editItem = () => {
        const updated_items = todos?.map((item, i) => {
            if (i === parseInt(router.query.index)) {
                return { item: todo }
            }

            return item
        })

        //storing data to localstorage
        localStorage.setItem('todos', JSON.stringify(updated_items))

        //redirect
        router.push('/')
    }
    return (
        <Layout>
            <Head>
                <title>Update Todo</title>
            </Head>
            <div className="flex flex-col justify-center space-y-4">
                <input onChange={(e) => setTodo(e.target.value)} value={todo} className='py-2 px-4 rounded w-full border' type='text' placeholder='What to do?' name='todo' />
                <Button onClick={editItem}>Update Item</Button>
                <Link href='/'><a className="text-center text-blue-500 font-bold">Go Back!</a></Link>
            </div>
        </Layout>
    )
}