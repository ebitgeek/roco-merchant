export async function GET(request) {

    const {searchParams} = new URL(request.url);

    const bark = searchParams.get("bark");

    if (!bark) {
        return Response.json(
            {
                success: false,
                error: "missing bark parameter"
            },
            {
                status: 400
            }
        );
    }

    const response = await fetch(
        "https://www.taptap.cn/ug-apis/roco/v1/merchant/current",
        {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
            },
            cache: "no-store"
        }
    )

    const data = await response.json()

    const barkUrl = `https://api.day.app/${bark}`

    const triggerKeys = ['棱镜', '祝福', '炫彩', '国王']

    const goods = data.round.items.map(item => item.name);

    const trigger = goods.some((g) =>
        triggerKeys.some((t) => g.includes(t))
    );

    if (trigger) {
        const title = `远行商人 - ${data.round.date} ${data.round.slot}`;
        const body = goods.join(" ");

        await fetch(
            `${barkUrl}/${encodeURIComponent(
                title
            )}/${encodeURIComponent(
                body
            )}`
        )
    }
    return Response.json(data, {
        status: response.status
    })
}