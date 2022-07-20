import { useRouter } from "next/router"

function Index() {

    const router = useRouter()

    const query = router.query.index

    return (
        <div className="ps-5">
           <h2>There is no result for {query}, try again!</h2>
        </div>
    )
}

export default Index
