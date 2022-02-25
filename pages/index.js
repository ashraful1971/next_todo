import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  //using state
  const [todos, setTodos] = useState([])

  //extracting todo list from localstorage at load time
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')))
  }, [])

  //delete method
  const deleteTodo = (i) => {
    console.log(i)
    let a = todos?.filter((todo, index) => index !== i)
    setTodos(a)

    if (a.length === 0) {
      localStorage.removeItem('todos')
    } else {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  //creating array of the rows based on the todo list
  const rows = todos?.map((todo, i) => (
    <tr class="border-b last:border-b-0">
      <td
        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {todo.item}
      </td>
      <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div
          class="text-sm text-center font-semibold bg-yellow-200 text-yellow-600 rounded-full inline-block px-4 py-1">
          Pending</div>
      </td>
      <td
        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Link href={`/edit/${i}`}><a className='cursor-pointer text-green-600'>Edit</a></Link> | <span className='cursor-pointer text-red-600' onClick={() => deleteTodo(i)}>Delete</span>
      </td>
    </tr>
  ))
  return (
    <Layout>
      <Head>
        <title>Next.Js Todo App</title>
      </Head>
      {/* Table start */}
      <div>
        <div className='flex justify-between items-center my-4'>
          <h2 className='text-2xl font-bold'>All Todo</h2>
          <Link href='/add'><a className='px-4 py-2 bg-blue-600 rounded text-white'>Add New</a></Link>
        </div>
        <table class="min-w-full border">
          <thead>
            <tr class="border-b">
              <th scope="col"
                class="py-3 px-6 text-sm font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Todo
              </th>
              <th scope="col"
                class="py-3 px-6 text-sm font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Status
              </th>
              <th scope="col"
                class="py-3 px-6 text-sm font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

            {rows}
          </tbody>
        </table>
      </div>
      {/* Table end */}
    </Layout>

  )
}
