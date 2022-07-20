import Link from 'next/link'
import Slider from "react-slick";
import Image from 'next/image'

export const getStaticProps = async () =>{
  const resOne = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US')
  const popular = await resOne.json()

  const resTwo = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US')
  const top_rated = await resTwo.json()

  return {
    props : {
      popular,
      top_rated,
    }
  }
}

export default function Home({popular, top_rated}) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  const settings2 = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  }

  return (
    <>
     <section id='popular'>
      <div className='page-title'>
        <h2>Popular</h2>
      </div>
      <Slider {...settings}>
          {popular.results.map((movie) =>(
            <Link href={`/movieinfo/movie/${movie.id}`} key={movie.id}>
            <div className='result-container'>
            <picture>
                <source srcSet={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''} type="image/webp" />
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''} alt={movie.title} />
           </picture>
              <div className='text-content'>
                <h2 className='animate__animated animate__fadeIn d-none'>{movie.title}</h2>
              </div>
            </div>
            </Link>
          ))} 
      </Slider>

      </section>  

      <section id='top_rated'>
      <div className='page-title'>
        <h2>Top Rated</h2>
      </div>
    <Slider  {...settings2}>
          {top_rated.results.map((movie) =>(
              <Link href={`/movieinfo/movie/${movie.id}`} key={movie.id}>
            <div className='result-container'>
            <picture>
                <source srcSet={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ''} type="image/webp" />
                <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ''} alt={movie.title} />
           </picture>
              <div className='text-content'>
                 <h2 className='animate__animated animate__fadeIn'>{movie.title} <span>({movie.release_date.slice(0, 4)})</span></h2>
              </div>
            </div>
            </Link>
          ))} 
        </Slider>
      </section>  

    </>
  )
}