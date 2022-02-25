export default function Button({ children, onClick }) {
    return <button onClick={onClick} className='px-4 py-2 bg-blue-600 rounded text-white cursor-pointer'>{children}</button>
}