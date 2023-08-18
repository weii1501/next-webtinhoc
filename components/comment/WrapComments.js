import React from 'react'
import {styled} from '@mui/material/styles'
import CommentItem from '@/components/comment/CommentItem'
import PostCommemt from '@/components/comment/PostComment'
import {getArticleComments} from '@/apis/apis'
import {useRouter} from 'next/router'

function WrapComments ({ openComment }) {
  const router = useRouter()
  const { article, slug } = router.query
  const [commnents, setComments] = React.useState(null)
  React.useEffect(() => {
    if (article || slug) {
      getArticleComments(article ? `article_id=${article.split('.').reverse()[0]}` : `thread_id=${slug.split('.').reverse()[0]}`).then(res => {
        setComments(res.data)
      })
    }
  }, [article])
  // console.log(commnents)
  return (
    <StyledComment>
      {openComment &&
        <PostCommemt
          comments={commnents}
          setComments={setComments}
        />}
      {/* <CommentItem /> */}
      {commnents && commnents.map((comment, index) => (
        comment &&
          <CommentItem
            key={index}
            comment={comment}
            setComments={setComments}
            index={index}
          />))}
    </StyledComment>
  )
}

export default WrapComments

const StyledComment = styled('div')(({ theme }) => ({
  margin: '12px 0'
}))
