import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import OrderList from '../../../components/orders/OrderList'
import { BiLogOut } from 'react-icons/bi'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom'

function RequestForOtherComponent() {

  const [cookies, removeCookies] = useCookies()
  const [orderList, setOrderList] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const url = "https://solar365.co.in/order/"
      const headers = new Headers()
      headers.append('Authorization', `Token ${cookies.Authorization}`)

      const res = await fetch(url, {
        headers: headers
      })
      const data = await res.json()
      setLoading(false)
      setOrderList(data)
      console.log('customer', data)
      return
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    removeCookies('Authorization', { path: "/" })
    return navigate('/login')
}

  useEffect(() => {
    const subscribe = fetchOrder()
    setInterval(() => {
      const subscribe = fetchOrder()
    }, 60000)

    return () => [subscribe]
  }, [])

  return (
    <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <AdminSideNavigation />
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
          <BiLogOut />
          <Button title="Logout" onclick={logout} />
        </div>
      </div>
      <div className="container py-5">
        
        <ul className="responsive-table">
          <li className="table-header py-3 py-2">
            <div className="col col-2 text-center text-slate-50 text-base font-bold">Id</div>
            <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
            <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
            <div className="col col-2 text-center text-slate-50 text-base font-bold">System Size</div>
            <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
            <div className="col col-2 text-center text-slate-50 text-base font-bold">Nmi No.</div>
          </li>
          
          {
            orderList?.length < 1 ? <h2>There is no order available right now...</h2> : orderList?.filter(ele => ele?.is_add_other === true)?.map((ele, idx) => {
              return (
                <Link to="/admin/approve-request-for-other-component" state={{ ele }} key={idx}>
                  <OrderList
                    Id={ele.id}
                    Project={ele.project}
                    CustomerName={ele.customer_name}
                    systemSize={ele.system_Size}
                    BuildingType={ele.building_Type}
                    NmiNo={ele.nmi_no}
                  />
                </Link>
              )
            })
          }
        </ul>
      </div>
          
    </div>
  )
}

export default RequestForOtherComponent
