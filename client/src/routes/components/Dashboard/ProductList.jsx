import React, { useEffect } from 'react'
import { FaEdit, FaTrashAlt} from 'react-icons/fa'
// redux
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../../Redux/dashboardSlice"

export default function ProductList() {
    const dispatch = useDispatch()
    const productList = useSelector( state => state.dashboard.productList)
console.log('list')
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);
  return (
      <table>
          <thead>
              <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Color</th>
            <th>Price</th>
            <th>Stock</th>
                  <th>Actions</th>
                  </tr>
          </thead>
          <tbody>
              {productList?.map(p => {
                  return (
                      <tr key={p.id}>
                          <td >{ p.brand}</td>
                          <td >{ p.model}</td>
                          <td >{ p.color}</td>
                          <td >{ p.price}</td>
                          <td >{ p.stock}</td>
                          <td ><FaEdit/> <FaTrashAlt/> </td>
                      </tr>

                    )

              })

       }
          </tbody>

          </table>
  )
}
