import Head from 'next/head'
import { Inter } from 'next/font/google'
import items from "@/store/items.json"
import { Item } from '@/components/atoms/item'
import { useState } from 'react'
import { Wheel } from '@/components/atoms/wheel'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [selectedItem , setSelectedItem] = useState(null)

  return (
    <>
      <Head>
        <title>Online Mystery Boxes by HypeDrop: Authentic Products, Fairly Packed</title>
        <meta name="description" content="Online Mystery Boxes by HypeDrop: Authentic Products, Fairly Packed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="/main.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      </Head>
      <main className={`main ${inter.className}`}>
        <div className={'productsContainer bg-red-500'}>
          {items.map((item, index) => (
            <div key={index} className={'itemContainer'}>
              <Item item={item} setSelectedItem={setSelectedItem}/>
            </div>
          ))}
        </div>
        <div className='wheelContainer'>
          <Wheel item={selectedItem}/>
        </div>
      </main>
    </>
  )
}
