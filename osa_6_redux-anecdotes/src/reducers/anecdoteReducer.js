import anecdoteService from '../services/anecdotes'

export const votesToAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log('updatedAnecdote: votes:', updatedAnecdote)
    const response = await anecdoteService.update(id, updatedAnecdote)
    dispatch({
        type: 'VOTE',
        data: response
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data.anecdote]
    case 'INITIALIZE':
      return action.data.anecdotes
    default:
      return state
  }

}

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: {
        anecdotes: anecdotes
      }
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        anecdote: newAnecdote
      }
    })
  }
}

export default reducer