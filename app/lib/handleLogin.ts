export const handleLogin = async (password: string) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })

  if (!res.ok) return 'Incorrect'

  const data = await res.json()
  if (data?.prev) return 'prevSuk'

  if (data.author) {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem('authData', JSON.stringify({ author: data.author, expiresAt }))
    return data.author
  }

  return 'Incorrect'
}
