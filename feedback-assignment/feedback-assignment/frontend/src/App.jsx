import React, { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:4000/api'

export default function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  async function fetchFeedbacks() {
    setLoading(true)
    try {
      const res = await fetch(API_BASE + '/feedback')
      const data = await res.json()
      setFeedbacks(data)
    } catch (e) {
      console.error(e)
      setError('Failed to load feedbacks')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!message.trim()) {
      setError('Please enter a feedback message.')
      return
    }
    try {
      const res = await fetch(API_BASE + '/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Anonymous', message: message.trim() })
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Submit failed')
        return
      }
      const newFb = await res.json()
      setFeedbacks(prev => [newFb, ...prev])
      setMessage('')
      setName('')
    } catch (e) {
      console.error(e)
      setError('Failed to submit feedback')
    }
  }

  return (
    <div className="container">
      <h1>Simple Feedback Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Name (optional)</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
         <label>Feedback</label>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write your feedback..." />
        {error && <div className="error">{error}</div>}
        <button type="submit">Submit Feedback</button>
      </form>

      <section className="list">
        <h2>Feedback List</h2>
        {loading ? <div>Loading...</div> : null}
        {feedbacks.length === 0 && !loading ? <div>No feedback yet.</div> : null}
        <ul>
          {feedbacks.map(f => (
            <li key={f.id}>
              <div className="meta">
                <strong>{f.name}</strong>
                <span>{new Date(f.createdAt).toLocaleString()}</span>
              </div>
              <p>{f.message}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
