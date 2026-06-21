// app/api/merchant/route.js


export async function GET() {
  const response = await fetch(
    "https://www.taptap.cn/ug-apis/roco/v1/merchant/current",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
      },
      next: {
        revalidate: 300
      }
    }
  )

  const data = await response.json()

  return Response.json(data, {
    status: response.status
  })
}