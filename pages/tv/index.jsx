import Link from "next/link"

export const getStaticProps = async () =>{
    const resOne = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=329a0e3872ae492cffe5b6e67f30e4ab&language=en-US&page=1')
    const popular = await resOne.json()
  
    return {
      props : {
        popular,
      }
    }
  }

function index({popular}) {

    return (
       <>
       <setion id="popular-tv">
        <div className="container">
            <div className="row">
                {popular.results.map((popular) =>{
                  return(
                     <Link href={`/movieinfo/tv/${popular.id}`} key={popular.id}>
                      <div className="col-md-4 col-lg-3 item">
                      <picture>
                        <source srcSet={`https://image.tmdb.org/t/p/original${popular.poster_path}`} type="image/webp" />
                        <img src={`https://image.tmdb.org/t/p/original${popular.poster_path}`} alt={popular.original_name} />
                      </picture>
                      <h3>{popular.name} <span>({popular.first_air_date.slice(0, 4)})</span></h3>
                      </div>
                     </Link>
                  )
                })}
            </div>
        </div>
       </setion>
       </>
    )
}

export default index
