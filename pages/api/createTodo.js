import { table } from './utils/airtable'
import auth0 from './utils/auth0'

export default auth0.requireAuthentication(async (req, res) => {
  const description = req.body.description.trim()
  const { user } = await auth0.getSession(req)
  if (description) {
    try {
      const createdRecords = await table.create([
        { fields: { description, userId: user.sub } },
      ])
      const createdRecord = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      }
      res.statusCode = 201
      res.json(createdRecord)
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.json({ message: 'Something went wrong' })
    }
  }
})
