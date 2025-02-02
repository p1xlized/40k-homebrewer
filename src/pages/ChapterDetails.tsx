import { useParams } from "@tanstack/react-router"

const ChapterDetails = () => {
    const params = useParams({ from: '/chapters/$id' })

    
  return (
    <div>ChapterDetails{params.id}</div>
  )
}

export default ChapterDetails