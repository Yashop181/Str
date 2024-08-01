import { Link,Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div>
      <Link to="/">ADD</Link>
      <br/>
      <Link to="/list">List</Link>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
