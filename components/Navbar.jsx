import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/router'
import icon from '../images/icon-60.png'
import Image from 'next/image'

function Navbar() {
   const [value, setValue] = useState('')
   
   const location = useRouter();

   const searchVal = (e) =>{
    if(e.key === 'Enter'){
        location.push(`/movies/${value}`)
    }
   }

   const setInput = (e) =>{
      setValue(e.target.value)
   }

    return (
        <nav id="navbar">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <ul className="d-flex">
                            <Link href='/'>
                            <li style={{color : location.pathname === '/' ? '#ff168a' : '#fff'}}>Home</li>
                            </Link>
                            <Link href='/tv'>
                            <li style={{color : location.pathname === '/tv' ? '#ff168a' : '#fff'}}>Tv Shows</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="col-md-8">
                      <div className="input-group">
                        <input onKeyDown={searchVal} onChange={setInput} type="text" value={value} placeholder='Search for movie or tv show' className='search__input w-100' />
                        <Link href={`/movies/${value}`}>
                            <span className='icon-wrapper'><Image src={icon} alt='icon'/></span>
                        </Link>
                      </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
