import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import ErrorPage from './routes//error-page'
import Contact, { loader as contactLoader } from './routes/contact'
import EditContact, { action as editAction } from './routes/edit'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
    ],
  },
])

const Test = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
