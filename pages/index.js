import React, { useState, useEffect } from 'react'
import Link from 'next/link'



const Index = () => {

  const storeProducts = [
    {

      title: "White Shirt",
      img: "shirt-model.png",
      price: 24.99,
      quantity: 1

    },
    {
      title: "Black Shirt",
      img: "black-shirt.png",
      price: 29.99,
      quantity: 1
    },
    {

      title: "Blue Shirt",
      img: "blue-shirt.png",
      price: 39.99,
      quantity: 1
    },
    {
      title: "Red Shirt",
      img: "red-shirt.png",
      price: 29.99,
      quantity: 1
    },
    {
      title: "Purple Shirt",
      img: "purple-shirt.png",
      price: 19.99,
      quantity: 1
    },
    {
      title: "Gray Shirt",
      img: "gray-shirt.png",
      price: 24.99,
      quantity: 1
    }
  ]

  const [newProducts, setNewProducts] = useState(storeProducts)

  const [searchValue, setSearchValue] = useState('')

  const [cart, setCart] = useState([])

  const [clearItens, setClearItens] = useState(0)

  const [numPedido, setnumPedido] = useState(0)

  const [effect, setEffect] = useState()


  const onChangeSearch = (evt) => {
    const value = evt.target.value
    setSearchValue(value)
  }

  const searchShirts = () => {
    if (searchValue === '') {
      setNewProducts(storeProducts)
    } else if (searchValue !== '') {
      const productsFound = storeProducts.filter((product) => {
        const regex = new RegExp(`(${searchValue})`, 'gim')
        return product.title.match(regex)
      })
      setNewProducts(productsFound)
    }
  }

  const getTotalValue = () => {
    let itensSoma = JSON.parse(localStorage.getItem('product'))
    let somaArr = []
    if (itensSoma !== null) {
      itensSoma.map((each) => {
        somaArr.push(each.quantity)
      })
      const somar = (acumulado, x) => acumulado + x;
      const total = somaArr.reduce(somar);
      setnumPedido(total)
      getCart()
    }
  }


  const addCart = (product) => {

    let status = localStorage.getItem('product')
    if (status === null) {
      let itens = []
      itens.push(product)
      localStorage.setItem('product', JSON.stringify(itens))
    } else {
      let itens = JSON.parse(localStorage.getItem('product'))
      const productAddedIndex = itens.findIndex(value => {
        return value.title === product.title
      })
      if (productAddedIndex !== -1) {
        itens[productAddedIndex].quantity = itens[productAddedIndex].quantity + product.quantity
        localStorage.setItem('product', JSON.stringify(itens))
      } else {
        itens.push(product)
        localStorage.setItem('product', JSON.stringify(itens))
      }
    }
    getCart()
    getTotalValue()
  }

  const getCart = () => {
    if (localStorage.getItem('product') !== null) {
      let itens = JSON.parse(localStorage.getItem('product'))
      setCart(itens)
    }
  }

  const clearCart = () => {
    setnumPedido(0)
    localStorage.clear()
    setClearItens(0)
    setCart([])
  }



  useEffect(() => {
    getTotalValue()
  }, [effect])


  return (
    <div className='bg-white mx-auto text-center'>
      <h1 className='w-full py-4 font-mono rounded-md bg-auto text-center text-3xl bg-gray-200 shadow'>Shirt Store
        <Link href='/cart'>
          <div className='flex float-right mr-6'>
            <input className='w-10' type='image' src='shopping-cart.png' />
            <div className='rounded-full h-6 w-6 flex items-center justify-center bg-red-500'>
              <h1 className='text-base'>{numPedido}</h1>
            </div>
          </div>
        </Link>
      </h1>
      <div className='py-10'>
        <form action=" " method='submit' className='pesquisa'>
          <input onKeyUp={searchShirts} className='py-4 w-9/12 rounded text-center text-xl  border-2' name='search' type='text' placeholder='Pesquisar' onChange={onChangeSearch} />
        </form>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {newProducts.map((product) => (
          <div className='shadow-2xl rounded-md border-solid border-gray  mb-10 text-center mx-auto'>
            <img className='max-h-96 min-h-70 rounded-lg pt-2 bg-gray-200' src={product.img}></img>
            <p className='italic text-2xl'>{product.title}</p>
            <div className='inline-flex	text-justify mt-4'>
              <p hidden className='text-justify text-xs px-2'>Tamanho</p>
              <select hidden className='w-12 text-xs rounded-lg bg-gray-100 '>
                <option value='PP'>PP</option>
                <option value='P'>P</option>
                <option value='M'>M</option>
                <option value='G'>G</option>
                <option value='GG'>GG</option>
              </select>
              <p hidden className='text-justify text-xs ml-5 px-2'>Quantidade</p>
              <select hidden className='w-12 text-xs rounded-lg bg-gray-100'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <p className='font-bold p-0 text-center text-lg my-4'>R${product.price}</p>
            <button className='bg-blue-400 rounded-lg hover-underline m-2 w-64 text-white text-xl h-12' onClick={() => { addCart(product) }}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </div>
  )
}




export default Index