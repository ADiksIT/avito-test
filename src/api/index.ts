export const fetchData = async (url: string, method: string = 'GET', body: any = '' ): Promise<{data: any, error: any}> => {
  let data, error
  try {
    data = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: method === 'POST' ? {
        'Content-Type': 'application/json;charset=utf-8'
      } : undefined,
    })
      .then(res => res.json())
      .then(res => res)
  } catch (e) {
    error = e
  }
  return { data, error }
}
