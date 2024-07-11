import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export const Profile = () => {
    const data=useSelector(store=>store.user.data)
    console.log(data);
  return (
   <> <div>{data.role}</div><Link to={'/topic/66753fd74fb9256286cc58a1'}>Add New Topic</Link></>

  )
}
