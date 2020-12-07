import { table, minifyRecord } from './utils/airtable'
import auth0 from './utils/auth0'
import ownsRecord from './middleware/OwnsRecord'

export default ownsRecord(async (req, res) => {
  const { id, fields } = req.body
  const { user } = await auth0.getSession(req)

  try {
    const updatedRecords = await table.update([{ id, fields }])
    res.statusCode = 200
    res.json(minifyRecord(updatedRecords[0]))
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.json({ message: 'Something went wrong' })
  }
})
