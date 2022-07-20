import Head from "next/head"
import Navbar from "./Navbar"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function LayOut ({children}){
 return (
    <>
    <Head>
    <title>Movie App</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div style={{
      overflowX : 'clip'
    }}>
      <div className="row">
        <div className="col-md-12">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
    </>
 )
}

export default LayOut