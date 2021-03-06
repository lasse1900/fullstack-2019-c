import React from 'react'
import { connect } from 'react-redux'
import { votesToAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.votesToAnecdote(id)
    const votedOne = props.visibleAnecdotes.find(a => a.id === id).content
    props.setMessage(`you voted '${votedOne}'`, 3)
  }

  return (
    <div>
      <Filter />
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mostVotes = (a, b) => b.votes - a.votes

const visibleAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes
    .sort(mostVotes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: visibleAnecdotes(state)
  }
}
const mapDispatchToProps = {
  votesToAnecdote,
  setMessage
}

const ConnectAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectAnecdoteList