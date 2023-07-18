export const fetchRequest =async (token, url) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);
        myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const res = await fetch(url, requestOptions)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}