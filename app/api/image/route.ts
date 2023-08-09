import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

import { increaseApiLimit, checkApiLimit } from '@/lib/apiLimit'
import { checkSubscription } from '@/lib/subscription'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amoutn = 1, resolution = '256x256' } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!configuration) return new NextResponse('OpenAi API Key not configured', { status: 500 })

    if (!prompt) return new NextResponse('Prompt is required', { status: 400 })

    if (!amoutn) return new NextResponse('Amount is required', { status: 400 })

    if (!resolution) return new NextResponse('Rsolution is required', { status: 400 })

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) return new NextResponse('Free trial has expired', { status: 403 })

    const response = await openai.createImage({
      prompt,
      n: parseInt(amoutn, 10),
      size: resolution
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.data.data)
  } catch (error) {
    console.log('[IMAGE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
