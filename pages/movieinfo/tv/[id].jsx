import ModalVideo from 'react-modal-video'
import { useState, useEffect } from 'react'
import imgmovie from '../../../images/movieImg.png'
import Slider from "react-slick";
import Spinner from '../../../components/Spinner';
import Link from 'next/link';

export const getServerSideProps = async (context) =>{
    const res = await fetch(`https://api.themoviedb.org/3/tv/${context.params.id}?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US`)
    const tv = await res.json()

    const resCredit = await fetch(`https://api.themoviedb.org/3/tv/${context.params.id}/credits?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US`)
    const credit = await resCredit.json()

    const resImages = await fetch(`https://api.themoviedb.org/3/tv/${context.params.id}/videos?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US`)
    const images = await resImages.json()

    const resRecomendations = await fetch(`https://api.themoviedb.org/3/tv/${context.params.id}/recommendations?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US`)
    const recomendations = await resRecomendations.json()
 
    return {
      props : {
        tv,
        credit,
        images,
        recomendations
      }
    }
}


function Id({tv, credit, images, recomendations}) {

    const [isOpen, setOpen] = useState(false)
    const [videoId, setVideoId] = useState('')
    const [loading, setLoading] = useState(true)

    const checkIsOpen = (e) =>{
        e.preventDefault()
        setOpen(true)
        setVideoId(images.results[0].key)
    }
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
        slidesToShow: 4,
        slidesToScroll: 4,
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

    useEffect(() =>{
        setTimeout(() =>{
         setLoading(false)
        }, 2000)
      }, [])
    
      if(loading){
        return(
          <Spinner />
        )
      }
    return (
       <section id="tv-info" style={{
        background : `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`
       }}>
        <div className="container">
            <div className="row">
                <div className="col-md-8 tv-item">
                    <h2>{tv.name} <span>({tv.first_air_date.slice(0, 4)})</span></h2>
                    <h4 className="tagline">{tv.tagline}</h4>
                    <p className="overview">{tv.overview}</p>
                    <div className="items">
                        <div className="item-1">
                            <div className="item-content">
                                <p className="item-title">Geners:</p>
                                {tv.genres.map((genre) =>{
                                return(
                                    <h4 key={genre.id}>{genre.name}</h4>
                                )
                                })}
                            </div>
                            <div className="item-content">
                            <p className="item-title">Seasons: </p>
                            <h4>{tv.number_of_seasons}</h4>
                            </div>
                            <div className="item-content">
                            <p className="item-title">Episodes: </p>
                            <h4>{tv.number_of_episodes}</h4>
                            </div>
                        </div>
                        <div className="item-2">
                            <div className="item-content">
                                <p className="item-title">Rating: </p>
                                <h4>{tv.vote_average}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 tv-item-2">
                <button aria-label="Play Button" className="play-btn" onClick={checkIsOpen}>
                    
                </button>
                </div>

                <div className="col-md-12 tv-item-3">
                  <div className='actors-items'>
                    <h2 className='mb-2'>Actors : </h2>
                     <Slider {...settings}>
                        {credit.cast.map((actor) =>{
                            return (    
                                <div className='actor-container' key={actor.id}>
                                    <div className="actor-content">
                                     <picture>
                                        <source srcSet={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} type="image/webp" />
                                        <img src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt='actor profile' />
                                      </picture>
                                        <h3>{actor.original_name}</h3>
                                        <h4>{actor.character}</h4>
                                    </div>
                                </div>
                            )
                        })}
                     </Slider>
               </div>
                </div>
                <div className="col-md-12 tv-item-3 tv-margin">
                    <div className="actors-items">
                    <h2 className='mb-2'>Recomended : </h2>
                     <Slider {...settings2}>
                        {recomendations.results.map((movie) =>{
                            return (    
                                <Link href={`/movieinfo/tv/${movie.id}`} key={movie.id}>
                                    <div className='recomended-container'>
                                        <div className="recomended-content d-flex justify-content-center align-items-center flex-column">
                                        <picture>
                                          <source srcSet={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : imgmovie.src} type="image/webp" />
                                          <img src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : imgmovie.src} alt={movie.original_name} />
                                        </picture>
                                            <h3>{movie.original_name}</h3>
                                            <h4>{movie.character}</h4>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                     </Slider>
                    </div>
                </div>
            </div>
        </div>
        <ModalVideo channel='youtube' isOpen={isOpen} videoId={videoId} onClose={() => setOpen(false)} />
       </section>
    )
}

export default Id
