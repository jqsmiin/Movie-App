import imgmovie from '../../images/movieImg.png'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

export const getServerSideProps = async (context) =>{
    const resOne = await fetch(`https://api.themoviedb.org/3/search/movie?query=${context.params.movie}&api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US&page=1&include_adult=false`)
    const movies = await resOne.json()

    const resTwo = await fetch(`https://api.themoviedb.org/3/search/tv?query=${context.params.movie}&api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US&page=1&include_adult=false`)
    const tvs = await resTwo.json()
 
    return {
      props : {
        movies,
        tvs
      }
    }
}


function Movie({movies, tvs}) {

    const router = useRouter()
    const query = router.query.movie

    useEffect(() => {
        if(movies.results.length < 1){
            router.push(`/no-result/${query}`)
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps 
      }, [movies]) 

    return (
       <section id="movie-search">
          <div className="container">
            <div className="row">
                {tvs.results.map((movie) =>{
                   return(
                    <div className="col-md-3 item" key={movie.id}>
                        <Link href={`/movieinfo/tv/${movie.id}`}>
                        <picture>
                          <source srcSet={movie.poster_path !== null ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : imgmovie.src} type="image/webp" />
                          <img src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : imgmovie.src} alt={movie.original_title ? movie.original_title : movie.original_name} />
                        </picture>
                        </Link>   
                       <h3>{movie.title ? movie.title : movie.original_name} <span>({movie.first_air_date ? movie.first_air_date.slice(0, 4) : movie.release_date ? movie.release_date.slice(0,4) : ''})</span></h3>
                      </div>
                   )
                })}
                {movies.results.map((movie) =>{
                   return(
                    <div className="col-md-3 item" key={movie.id}>
                        <Link href={`/movieinfo/movie/${movie.id}`}>
                        <picture>
                           <source srcSet={movie.poster_path !== null ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : imgmovie.src} type="image/webp" />
                           <img src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : imgmovie.src} alt={movie.original_title ? movie.original_title : movie.original_name} />
                        </picture>
                        </Link>   
                       <h3>{movie.title ? movie.title : movie.original_name} <span>({movie.first_air_date ? movie.first_air_date.slice(0, 4) : movie.release_date ? movie.release_date.slice(0,4) : ''})</span></h3>
                      </div>
                   )
                })}
            </div>
          </div>
       </section>
    )
}

export default Movie
