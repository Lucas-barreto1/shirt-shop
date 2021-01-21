import React, { useEffect, useState } from 'react'
import Link from 'next/link'



const cart = () => {

  const [cartProducts, setcartProducts] = useState([])

  const [effect, setEffect] = useState()

  const [clearItens, setClearItens] = useState(0)

  const [totalPrice, settotalPrice] = useState([])



  const getProduct = () => {
    let status = localStorage.getItem('product')
    if (status === null) {
      setcartProducts([])
    } else {
      setcartProducts(JSON.parse(localStorage.getItem('product')))
    }
  }


  const clearCart = () => {
    localStorage.clear()
    setClearItens(0)
    setcartProducts([])
    settotalPrice([])
  }

  const totalValue = () => {
    let itensTotal = JSON.parse(localStorage.getItem('product'))
    let somaArr = []
    if (itensTotal !== null) {
      itensTotal.map((each) => {
        somaArr.push(each.price)
      })
      const somar = (acumulado, x) => acumulado + x;
      const total = somaArr.reduce(somar);
      settotalPrice(total)
      getProduct()
    }
  }


  useEffect(() => {
    totalValue()
    getProduct()
  }, [effect])



  return (
    <div className='bg-white'>
      <div className='bg-gray-100'>
        <h1 className='w-full py-4 font-mono rounded-md bg-auto text-center text-3xl bg-gray-200 '>Carrinho
        <Link href='/'>
            <input className='flex float-left w-12' type='image' src='/back.png' />
          </Link>
        </h1>
        <div className='text-right bg-white p-2'>
          {cartProducts.length !== 0 &&
            <button className=' hover:underline text-center text-base text-black rounded-lg w-40 h-16 p-4 ' onClick={() => { clearCart(JSON.parse(localStorage.getItem('product'))) }}>Limpar Carrinho</button>
          }
        </div>
      </div>
      <div className='bg-white grid space-y-12 max-w-7xl min-h-full shadow-3xl rounded border-solid border-current m-auto p-auto'>
        {cartProducts.length > 0 && cartProducts.map((product) => (
          <div className='shadow-2xl rounded-md border-solid ml-4'>
            <img className='w-32 h-auto rounded-lg pt-2' src={product.img} />
            <div className='flex ml-4'>
              <p className='italic text-2xl pt-4'>{product.title}</p>
            </div>
            <div className='text-left pt-4 m-4'>
              <p className='font-bold p-0 text-3xl my-2'>R${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='bg-white text-center text-xl max-w-4xl min-h-full m-auto p-auto '>
        {cartProducts.length == 0 &&
          <h1 className='text-black text-2xl font-bold'>Seu Carrinho esta vazio!
          <h1 className='text-black text-2xl font-bold'>Retorne para a página principal!</h1>
          </h1>
        }
      </div>
      <div className='flex float-left bg-white pt-11 pl-80'>
        {cartProducts.length !== 0 &&
          <h1 className='bg-blue-500 rounded-lg w-40 h-12 p-2 m-4 text-center text-white text-lg'>TOTAL: R${totalPrice}</h1>
        }
      </div>
      <div className='flex float-right bg-white pt-12 pr-80'>
        {cartProducts.length !== 0 &&
          <button className='bg-blue-500 hover:underline rounded-lg w-40 h-12 p-2 m-4 text-center text-white text-lg'>Finalizar Compra</button>
        }
      </div>
    </div>
  )
}


export default cart