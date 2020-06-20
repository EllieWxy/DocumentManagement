export default async function fetch(
  url: string,
  method?: string,
  body?: object
) {
  const response = await window.fetch(url, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body && JSON.stringify(body) //考虑传headers或其他参数的情况
  })

  if (!response.ok) {
    // 异常时抛出错误
    const text = await response.text()
    throw new Error(text)
  }

  return response.json()
}
