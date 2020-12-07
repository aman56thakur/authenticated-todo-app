import { table } from './utils/airtable'
import auth0 from './utils/auth0'
import ownsRecord from './middleware/OwnsRecord'

export default ownsRecord(async (req, res) => {
  const { id } = req.body
  const { user } = await auth0.getSession(req)

  try {
    await table.destroy([id])
    res.statusCode = 200
    res.json({ id })
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.json({ message: 'Something went wrong' })
  }
})
