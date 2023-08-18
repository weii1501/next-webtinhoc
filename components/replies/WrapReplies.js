import React from 'react'
import { styled } from '@mui/material/styles'
import ReplyItem from '@/components/replies/ReplyItem'
import { useRouter } from 'next/router'
import { getReplies } from '@/apis/apis'
import PostReply from '@/components/replies/PostReply'

function WrapReplies ({ openAnswer, setOpenAnswer, data }) {
  const router = useRouter()
  const { slug } = router.query
  const [replies, setReplies] = React.useState(null)
  React.useEffect(() => {
    if (slug) {
      getReplies(slug.split('.').reverse()[0]).then(res => {
        setReplies(res.data)
      })
    }
  }, [slug])
  return (
    <StyledReplies>
      {openAnswer &&
        <PostReply
          setOpenAnswer={setOpenAnswer}
          setReplies={setReplies}
          data={data}
        />}
      {replies && replies.map((reply, index) => (
        <ReplyItem
          reply={reply}
          key={index}
          index={index}
          setReplies={setReplies}
        />
      ))}
    </StyledReplies>
  )
}

export default WrapReplies

const StyledReplies = styled('div')(({ theme }) => ({
  margin: '12px 0'
}))
