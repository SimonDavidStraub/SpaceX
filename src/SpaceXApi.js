import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useSpaceXApi(method, path) {
  const [data, setData] = useState(null);

  useEffect(() => {
    spacexApi(
      method,
      path,
      data => setData(data)
    )
  }, [method, path])

  return data;
}

export function spacexApi(method, path, callback, data = {}) {
  const baseUrl = 'https://api.spacexdata.com/v4'

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    data
  }).then((response) => callback(response.data))
}
