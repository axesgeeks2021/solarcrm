import React, { useEffect } from 'react'

function NonAdminProfile() {

  const fetchData = () => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
        myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://solar365.co.in/get_none_admin_profile/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setNonAdminList(result)
            })
            .catch(error => console.log('error', error));
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  const subscribe = fetchData()

  return () => [subscribe ]
}, [])
  return (
    <div>
      <h1>Non admin prodile</h1>
    </div>
  )
}

export default NonAdminProfile